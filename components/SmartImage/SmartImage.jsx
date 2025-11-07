'use client';
import React, { useEffect, useMemo, useRef, useState } from 'react';

// Common responsive width breakpoints (similar to Next.js defaults)
const DEFAULT_WIDTHS = [
	16, 32, 48, 64, 96, 128, 256, 384, 640, 750, 828, 1080, 1200, 1920, 2048,
	3840,
];

function pickCandidateWidths(widths, sizes, intrinsicWidth) {
	const pool = (widths && widths.length ? widths : DEFAULT_WIDTHS)
		.slice()
		.sort((a, b) => a - b);
	if (!sizes) {
		if (intrinsicWidth) {
			const min = Math.min(intrinsicWidth, pool[0]);
			const max = Math.max(intrinsicWidth, pool[pool.length - 1]);
			const near = pool.filter(w => w >= min && w <= max);
			const temp = [
				...near.filter(w => w <= intrinsicWidth).slice(-2),
				intrinsicWidth,
				...near.filter(w => w > intrinsicWidth).slice(0, 2),
			];
			const fallback = temp.filter((v, i) => temp.indexOf(v) === i);
			return fallback.sort((a, b) => a - b);
		}
		return [320, 640, 960, 1200];
	}
	return pool;
}

// Default loader: appends ?w=&q= if host supports it
function defaultLoader({ src, width, quality }) {
	const base =
		typeof window !== 'undefined'
			? window.location.origin
			: 'http://local.test';
	const url = new URL(src, base);
	url.searchParams.set('w', String(width));
	if (quality) url.searchParams.set('q', String(quality));
	return url.pathname + url.search;
}

/**
 * SmartImage — Next/Image-like behavior with a plain <img>
 *
 * Props:
 *  - src, alt (required)
 *  - width, height (intrinsic layout) OR fill (absolute fill parent)
 *  - sizes (responsive)
 *  - candidateWidths (override default width list)
 *  - unoptimized (no srcset, single src only)
 *  - loader({src,width,quality}) for CDN/API transforms
 *  - quality (0–100)
 *  - placeholder="blur" + blurDataURL
 *  - priority (eager + high fetchPriority)
 */
export default function SmartImage({
	src,
	alt,
	width,
	height,
	fill,
	objectFit = 'cover',
	objectPosition = 'center',
	sizes,
	candidateWidths,
	unoptimized,
	loader = defaultLoader,
	quality,
	placeholder = 'empty',
	blurDataURL,
	priority,
	loading,
	decoding = 'async',
	fetchPriority,
	className,
	style,
	onClick,
	onLoadingComplete,
	reserveAspectRatio = true,
}) {
	const [loaded, setLoaded] = useState(false);
	const imgRef = useRef(null);

	// Determine loading & fetchPriority
	const effectiveLoading = priority ? 'eager' : loading || 'lazy';
	const effectiveFetchPriority = priority ? 'high' : fetchPriority || 'auto';

	// Build src/srcSet/sizes
	const { finalSrc, srcSet } = useMemo(() => {
		if (unoptimized) {
			return { finalSrc: src, srcSet: undefined };
		}
		const widths = pickCandidateWidths(candidateWidths, sizes, width);
		const make = w => (loader ? loader({ src, width: w, quality }) : src);
		const final = widths.map(w => `${make(w)} ${w}w`).join(', ');
		const best = make(widths[widths.length - 1] || width || 1920);
		return { finalSrc: best, srcSet: final };
	}, [src, width, candidateWidths, sizes, quality, unoptimized, loader]);

	const isFill = !!fill;
	const hasIntrinsic =
		!isFill && typeof width === 'number' && typeof height === 'number';

	const wrapperStyle = {
		position: isFill ? 'relative' : undefined,
		display: 'block',
		width: isFill ? '100%' : hasIntrinsic ? undefined : '100%',
	};

	const aspectStyle =
		hasIntrinsic && reserveAspectRatio
			? { aspectRatio: `${width} / ${height}` }
			: {};

	const imgStyle = {
		position: isFill ? 'absolute' : undefined,
		inset: isFill ? 0 : undefined,
		width: isFill ? '100%' : hasIntrinsic ? `${width}px` : '100%',
		height: isFill ? '100%' : hasIntrinsic ? `${height}px` : 'auto',
		objectFit: isFill ? objectFit : undefined,
		objectPosition: isFill ? objectPosition : undefined,
		transition: 'filter 200ms ease, transform 200ms ease',
		filter: placeholder === 'blur' && !loaded ? 'blur(20px)' : undefined,
		transform: placeholder === 'blur' && !loaded ? 'scale(1.05)' : undefined,
		...style,
	};

	useEffect(() => {
		const el = imgRef.current;
		if (!el) return;
		if (el.complete && el.naturalWidth > 0) {
			setLoaded(true);
			if (onLoadingComplete) onLoadingComplete(el);
		}
	}, [onLoadingComplete]);

	function handleLoad() {
		const el = imgRef.current;
		setLoaded(true);
		if (el && onLoadingComplete) onLoadingComplete(el);
	}

	if (!isFill && !hasIntrinsic) {
		console.warn(
			'SmartImage: either provide width/height or set fill={true} to avoid layout shift.'
		);
	}

	const imgProps = {
		ref: imgRef,
		src: finalSrc,
		alt,
		srcSet: srcSet,
		sizes: srcSet ? sizes : undefined,
		loading: effectiveLoading,
		decoding,
		fetchPriority: effectiveFetchPriority,
		onLoad: handleLoad,
		onClick,
		className,
		style: imgStyle,
	};

	if (isFill) {
		return (
			<div style={wrapperStyle}>
				<img {...imgProps} />
			</div>
		);
	}

	return (
		<div style={{ ...wrapperStyle, ...aspectStyle }}>
			<img {...imgProps} width={width} height={height} />
		</div>
	);
}

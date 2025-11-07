// Loader functions your SmartImage will use to generate responsive URLs.
// Loader hitting your own Express resizer (see backend /images/img)
export function apiResizeLoader({ src, width, quality = 70 }) {
	const base = process.env.NEXT_PUBLIC_IMAGE_API || '';
	const u = new URL('/images/img', base);
	u.searchParams.set('src', src);
	u.searchParams.set('w', String(width));
	u.searchParams.set('q', String(quality));
	// If you enable HMAC signing on the backend, you can inject `sig` here too.
	return u.toString();
}

// Optional: CDN param loader (if CloudFront Function rewrites ?w= to your resizer)
export function cdnWidthParamLoader({ src, width, quality = 70 }) {
	const base = process.env.NEXT_PUBLIC_CDN_BASE || '';
	const u = new URL(src, base);
	u.searchParams.set('w', String(width));
	u.searchParams.set('q', String(quality));
	return u.toString();
}

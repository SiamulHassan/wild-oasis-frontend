import SmartImage from '@/components/SmartImage';
import { apiResizeLoader } from '@/lib/imageLoaders';

export default function HomePage() {
	return (
		<main style={{ padding: 24 }}>
			<h1>SmartImage Demo</h1>

			{/* Intrinsic, responsive */}
			<SmartImage
				src={'https://your-bucket-originals.s3.amazonaws.com/static/hero.jpg'}
				alt='Hero'
				width={1600}
				height={900}
				sizes='(max-width: 768px) 100vw, 768px'
				loader={apiResizeLoader}
				quality={70}
				priority
			/>

			{/* Fill layout */}
			<div style={{ position: 'relative', height: '50vh', marginTop: 24 }}>
				<SmartImage
					src={
						'https://your-bucket-originals.s3.amazonaws.com/banners/summer.jpg'
					}
					alt='Summer'
					fill
					loader={apiResizeLoader}
					priority
				/>
			</div>
		</main>
	);
}

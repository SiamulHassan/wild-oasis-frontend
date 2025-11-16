import Navbar from './_components/Navbar';
import Banner from './_components/Banner';
import Footer from './_components/Footer';

export default function Page() {
	return (
		<main className='relative min-h-screen flex flex-col justify-center bg-slate-50 overflow-hidden font-inter'>
			<div className='w-full max-w-6xl mx-auto px-4 md:px-6 py-24'>
				<Navbar />
			</div>
			<Footer />
			<Banner />
		</main>
	);
}

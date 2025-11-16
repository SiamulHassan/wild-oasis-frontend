import TextExpander from '@/components/reusables/TextExpander';
import { getCabin, getCabins } from '@/lib/datas';
import { EyeSlashIcon, MapPinIcon, UsersIcon } from '@heroicons/react/24/solid';
import Image from 'next/image';
import { notFound } from 'next/navigation';

export const generateMetadata = async ({ params }) => {
	const paramsVal = await params;
	const { name } = await getCabin(paramsVal.cabinId);
	return { title: `Cabin ${name}` };
};
// thats it for ssg
// export async function generateStaticParams() {
// 	const cabins = await getCabins();
// 	// note: cabinid ke object hisabe retrun kora hocce and object key holo 'cabinId' ja params er key [cabinId]
// 	const cabinIds = cabins.map(cabin => ({
// 		cabinId: String(cabin.id),
// 	}));
// 	return cabinIds;
// }

export default async function Page({ params }) {
	const paramsVal = await params;
	const cabin = await getCabin(paramsVal.cabinId);
	// Option 1
	// manually trigarring the not found page
	if (!cabin) {
		notFound();
	}
	// Option 2
	// or we can also declare a not-found page for this page route for more specific not found error
	// In this case we also need to call the notFound function as it will trigger the nearest not-found page which is our this id page route level

	const { id, name, maxCapacity, regularPrice, discount, image, description } =
		cabin;

	return (
		<div className='max-w-6xl mx-auto mt-8'>
			<div className='grid grid-cols-[3fr_4fr] gap-20 border border-primary-800 py-3 px-10 mb-24'>
				<div className='relative scale-[1.15] -translate-x-3'>
					<Image
						fill
						className='object-cover'
						src={image}
						alt={`Cabin ${name}`}
					/>
				</div>

				<div>
					<h3 className='text-accent-100 font-black text-7xl mb-5 translate-x-[-254px] bg-primary-950 p-6 pb-1 w-[150%]'>
						Cabin {name}
					</h3>

					<p className='text-lg text-primary-300 mb-10'>
						<TextExpander>{description}</TextExpander>
					</p>

					<ul className='flex flex-col gap-4 mb-7'>
						<li className='flex gap-3 items-center'>
							<UsersIcon className='h-5 w-5 text-primary-600' />
							<span className='text-lg'>
								For up to <span className='font-bold'>{maxCapacity}</span>{' '}
								guests
							</span>
						</li>
						<li className='flex gap-3 items-center'>
							<MapPinIcon className='h-5 w-5 text-primary-600' />
							<span className='text-lg'>
								Located in the heart of the{' '}
								<span className='font-bold'>Dolomites</span> (Italy)
							</span>
						</li>
						<li className='flex gap-3 items-center'>
							<EyeSlashIcon className='h-5 w-5 text-primary-600' />
							<span className='text-lg'>
								Privacy <span className='font-bold'>100%</span> guaranteed
							</span>
						</li>
					</ul>
				</div>
			</div>

			<div>
				<h2 className='text-5xl font-semibold text-center'>
					Reserve today. Pay on arrival.
				</h2>
			</div>
		</div>
	);
}

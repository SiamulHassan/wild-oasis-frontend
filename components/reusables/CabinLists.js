import { getCabins } from '@/lib/datas';
import { CabinCard } from './index';

const CabinLists = async () => {
	const cabins = await getCabins();
	return (
		<>
			{cabins.length > 0 && (
				<div className='grid sm:grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 xl:gap-14'>
					{cabins.map(cabin => (
						<CabinCard cabin={cabin} key={cabin.id} />
					))}
				</div>
			)}
		</>
	);
};

export default CabinLists;

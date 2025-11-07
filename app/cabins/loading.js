import { Spinner } from '@/components';

const Loading = () => {
	return (
		<div className='grid justify-center items-center'>
			<Spinner />
			<p>Loading Cabins ...</p>
		</div>
	);
};

export default Loading;

import supabase from "../supabase";

export async function getCabins() {
	let { data, error } = await supabase.from('cabins').select('*');
	if (error) {
		console.log('error getting cabins:', error);
	}
	return data;
}

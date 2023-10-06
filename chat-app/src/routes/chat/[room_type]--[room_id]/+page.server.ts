import { error } from '@sveltejs/kit';

export function load({ params }:any) {
	//const post = posts.find((post) => post.slug === params.slug);

	//if (!post) throw error(404);
  console.log("wow");
	return {
		room_type: params.room_type,
		room_id: params.room_id
	};
}

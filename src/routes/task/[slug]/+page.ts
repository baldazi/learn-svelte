import { PUBLIC_API_BASE_URL } from '$env/static/public';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch, params }) => {
	let reponse = await fetch(`${PUBLIC_API_BASE_URL}/todos/${params.slug}`)
    const result = await reponse.json();
    return {...result};
};
import { PUBLIC_API_BASE_URL } from '$env/static/public';
import type { PageLoad } from './$types';

export const prerender = true;

export const load: PageLoad = async ({ fetch, params }) => {
	const response = await fetch(`${PUBLIC_API_BASE_URL}/todos/${params.id}`)
    const result = await response.json();
    return {...result};
};
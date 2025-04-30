import { PUBLIC_API_BASE_URL } from '$env/static/public';
import type { PageLoad } from "./$types";

export const prerender = true;

export const load: PageLoad = async ({fetch}) => {
    const reponse = await fetch(`${PUBLIC_API_BASE_URL}/todos/?limit=10`)
    const result = await reponse.json();
    return {list: result};
}
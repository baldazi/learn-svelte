import { json } from "@sveltejs/kit";

import type { RequestHandler } from "./$types";

export const GET:RequestHandler =  ({ request, url }) => {
    return json ({
        'userAgent': request.headers.get('user-agent'),
        'url': url
    },{
        headers: {
            "x-custom-data": "baldazi"
        }
    });
}
// @ts-ignore
import { serve } from "https://deno.land/std/http/mod.ts";

const port = 8080;

function handler(request: Request): Response {
    const body = 'Hello World';
    return new Response(body, {status: 200});
}

await serve(handler, {port});

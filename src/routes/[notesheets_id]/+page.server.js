import db from '$lib/server/db.js';

export async function load({ params }) {
    return {
        notesheet: await db.getNotesheet(params.notesheets_id),
    };
}
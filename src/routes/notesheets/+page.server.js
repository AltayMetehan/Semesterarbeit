import db from "$lib/server/db";

export async function load() {
    return {
        notesheets: await db.getNotesheets()
    }
}
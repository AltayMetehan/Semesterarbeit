import db from '$lib/server/db.js';

export const actions = {
    register: async ({ request }) => {
        const data = await request.formData();
        const user = {
            vorname: data.get('firstname'),
            nachname: data.get('lastname'),
            email: data.get('email'),
            passwort: data.get('password')
        }
        await db.createUser(user);
    }
};
import { fail } from '@sveltejs/kit';
import db from '$lib/server/db.js';

export const actions = {
    default: async ({ request }) => {
        const data = await request.formData();
        const user = {
            vorname: data.get('firstname'),
            nachname: data.get('lastname'),
            email: data.get('email'),
            passwort: data.get('password')
        };

        if (!user.vorname || !user.nachname || !user.email || !user.passwort) {
            return fail(400, { message: 'Alle Felder sind erforderlich.' });
        }

        try {
            await db.createUser(user);
            return { success: true };
        } catch (error) {
            return fail(500, { message: 'Registrierung fehlgeschlagen.' });
        }
    }
};
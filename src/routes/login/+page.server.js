/* Backend für Login wurde deaktiviert.
   Der MongoDB-Zugang funktioniert derzeit nicht, daher ist dieses Projekt jetzt frontend-only.
*/
import { fail } from "@sveltejs/kit";
import { redirect } from '@sveltejs/kit';
import db from "$lib/server/db";

export const actions = {
   default: async ({ request, cookies }) => {
      const data = await request.formData();
      const email = data.get("email");
      const password = data.get("password");

      if (!email || !password) {
         return fail(400, { message: "Email und Passwort sind erforderlich." });
      }

      try {
         const user = await db.loginUser(email, password);

         // Set a simple session cookie (server-only)
         const sessionValue = user._id ? String(user._id) : user.email;
         cookies.set("session", sessionValue, {
            path: "/",
            httpOnly: true,
            sameSite: "lax",
            maxAge: 60 * 60 * 24 * 7 // 1 week
         });

         return { success: true };
         throw redirect(303, '/notesheets');
      } catch (error) {
         return fail(401, { message: "Ungültige Anmeldedaten." });
      }
   }
};

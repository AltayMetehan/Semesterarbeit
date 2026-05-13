/* Backend für Login wurde deaktiviert.
   Der MongoDB-Zugang funktioniert derzeit nicht, daher ist dieses Projekt jetzt frontend-only.
*/

// import { MongoClient } from "mongodb";
// import { DB_URI } from "$env/static/private";
// import bcrypt from "bcrypt";
//
// const client = new MongoClient(DB_URI);
//
// await client.connect();
// const db = client.db("notesheet");
//
// async function loginUser(email, password) {
//     const users = db.collection("users");
//     const user = await users.findOne({ email });
//     if (!user) {
//         throw new Error("Ungültige Anmeldedaten");
//     }
//     const valid = await bcrypt.compare(password, user.password);
//     if (!valid) {
//         throw new Error("Ungültige Anmeldedaten");
//     }
//     return user;
// }
//
// export const actions = {
//     login: async ({ request }) => {
//         const data = await request.formData();
//         const email = data.get("email");
//         const password = data.get("password");
//
//         if (!email || !password) {
//             return { status: 400, body: { message: "Email und Passwort sind erforderlich" } };
//         }
//
//         try {
//             await loginUser(email, password);
//             return { success: true };
//         } catch (error) {
//             return { status: 401, body: { message: error.message } };
//         }
//     }
// };

export const actions = {};

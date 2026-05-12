/* Backend für die Registrierung wurde deaktiviert.
   Der MongoDB-Zugang funktioniert derzeit nicht, daher ist dieses Projekt jetzt frontend-only.
*/

// import { MongoClient, ObjectId } from "mongodb";
// import { DB_URI } from "$env/static/private";
// import bcrypt from "bcrypt";
//
// const client = new MongoClient(DB_URI);
//
// await client.connect();
// const db = client.db("notesheet");
//
// async function createUser(user) {
//     const users = db.collection("users");
//
//     const hashedPassword = await bcrypt.hash(user.password, 10);
//
//     const newUser = {
//         firstname: user.firstname,
//         lastname: user.lastname,
//         email: user.email,
//         password: hashedPassword,
//         createdAt: new Date()
//     };
//
//     const result = await users.insertOne(newUser);
//     return result;
// }
//
// export { createUser };

export const backendDisabled = true;

/* Backend für Upload wurde deaktiviert.
   Der MongoDB-Zugang funktioniert derzeit nicht, daher ist dieses Projekt jetzt frontend-only.
*/

// import { MongoClient } from "mongodb";
// import { DB_URI } from "$env/static/private";
// import fs from "fs";
// import path from "path";
//
// const client = new MongoClient(DB_URI);
//
// await client.connect();
// const db = client.db("notesheet");
//
// async function saveUpload(file, writer) {
//     const uploads = db.collection("uploads");
//     const result = await uploads.insertOne({
//         filename: file.name,
//         writer,
//         mimeType: file.type,
//         uploadedAt: new Date()
//     });
//     return result;
// }
//
// export const actions = {
//     upload: async ({ request }) => {
//         const data = await request.formData();
//         const file = data.get("file");
//         const writer = data.get("writer");
//
//         if (!file || !writer) {
//             return {
//                 status: 400,
//                 body: { message: "Datei und Songtext Schreiber sind erforderlich" }
//             };
//         }
//
//         try {
//             await saveUpload(file, writer);
//             return { success: true };
//         } catch (error) {
//             return {
//                 status: 500,
//                 body: { message: "Upload fehlgeschlagen" }
//             };
//         }
//     }
// };

export const actions = {};

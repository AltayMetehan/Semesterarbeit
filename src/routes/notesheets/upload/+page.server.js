import { fail } from "@sveltejs/kit";
import fs from "fs/promises";
import path from "path";
import db, { createNotesheet } from "$lib/server/db";

export const actions = {
   default: async ({ request }) => {
      const data = await request.formData();
      const file = data.get("file");
      const writer = data.get("writer");
      const songName = data.get("songName");

      if (!file || !writer || !songName) {
         return fail(400, { message: "Datei, Liedname und Songtext-Schreiber sind erforderlich." });
      }

      try {
         const uploadsDir = path.join(process.cwd(), "static", "uploads");
         await fs.mkdir(uploadsDir, { recursive: true });

         const filename = `${Date.now()}-${file.name}`;
         const filePath = path.join(uploadsDir, filename);

         const arrayBuffer = await file.arrayBuffer();
         await fs.writeFile(filePath, Buffer.from(arrayBuffer));

         const body = {
            filename: filename,
            originalName: file.name,
            songName: songName,
            writer: writer,
            mimeType: file.type,
            path: `/notesheets/${filename}`
         };

         const result = await createNotesheet(body);

         return { success: true, id: result.insertedId, body };
      } catch (error) {
         console.log(error.message);
         return fail(500, { message: "Upload fehlgeschlagen." });
      }
   }
};

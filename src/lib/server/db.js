import { MongoClient, ObjectId } from "mongodb";
import { DB_URI } from "$env/static/private";
import bcrypt from "bcrypt";
import dns from "node:dns/promises";

// wurde hinzugefügt, da es sonst zu Problemen mit der DNS-Auflösung kommt
// Lokaler Fehler: Error: querySrv ECONNREFUSED _mongodb._tcp.topic2.idvbvcd.mongodb.net 
//                    at QueryReqWrap.onresolve [as oncomplete] (node:internal/dns/promises:294:17)
dns.setServers(["1.1.1.1"]);
console.log(dns.getServers());

const client = new MongoClient(DB_URI);

await client.connect();
const db = client.db("notesheet");

async function createUser(user) {
    try {
        const users = db.collection("users");

        const hashedPassword = await bcrypt.hash(user.passwort, 10);

        const newUser = {
            vorname: user.vorname,
            nachname: user.nachname,
            email: user.email,
            passwort: hashedPassword,
            createdAt: new Date()
        };

        const result = await users.insertOne(newUser);
        return result;
    } catch (error) {
        console.log(error.message);
        throw new Error("Registrierung fehlgeschlagen");
    }

    return null;
}

async function loginUser(email, password) {
    try {
        const users = db.collection("users");

        const user = await users.findOne({ email });
        if (!user) {
            throw new Error("Ungültige Anmeldedaten");
        }

        const valid = await bcrypt.compare(password, user.passwort);
        if (!valid) {
            throw new Error("Ungültige Anmeldedaten");
        }

        const { passwort, ...rest } = user;
        return rest;
    } catch (error) {
        console.log(error.message);
        throw new Error("Anmeldung fehlgeschlagen");
    }

    return null;
}

async function createNotesheet(body) {
    try {
        const notesheets = db.collection("notesheets");

        const doc = {
            filename: body.filename,
            originalName: body.originalName,
            songName: body.songName,
            writer: body.writer,
            mimeType: body.mimeType,
            path: body.path,
            createdAt: new Date()
        };

        const result = await notesheets.insertOne(doc);
        return result;
    } catch (error) {
        console.log(error.message);
        throw new Error("Erstellen des Notesheets fehlgeschlagen");
    }
}

async function getNotesheets() {
    let notesheets = [];
    try {
        const collection = db.collection("notesheets");

        const query = {};

        notesheets = await collection.find(query).toArray();
        notesheets.forEach((notesheet) => {
            notesheet._id = notesheet._id.toString();
        });
    } catch (error) {
        console.log(error.message);
        throw new Error("Abrufen der Notesheets fehlgeschlagen");
    }
    return notesheets;
}
export default { createUser, loginUser, createNotesheet, getNotesheets };
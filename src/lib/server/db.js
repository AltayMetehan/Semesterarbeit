import { MongoClient, ObjectId } from "mongodb";
import { DB_URI } from "$env/static/private";
import bcrypt from "bcrypt";

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
export default { createUser, loginUser };
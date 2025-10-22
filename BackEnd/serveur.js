import express from "express";
import { db } from "./db.js";

const app = express();
app.use(express.json());



// Route POST : ajouter un nouvel étudiant
app.post("/students", async (req, res) => {
try {
const { name, email } = req.body;

// Validation de base
if (!name || !email) {
return res.status(400).json({
status: 400,
message: "Le nom et l'email sont requis.",
});
}

// Requête SQL sécurisée
const [result] = await db.query(
"INSERT INTO students (name, email) VALUES (?, ?)",
[name, email]
);

// Réponse en cas de succès
res.status(201).json({
status: 201,
message: "Étudiant ajouté avec succès ",
data: { id: result.insertId, name, email },
});
} catch (error) {
res.status(500).json({
status: 500,
message: "Erreur lors de l'ajout de l'étudiant ",
error: error.message,
});
}
});

// Lancer le serveur
app.listen(3000, () => {
console.log("Serveur en marche sur http://localhost:3000");
});
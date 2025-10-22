import express from "express";
import { db } from "./db.js";

const app = express();
app.use(express.json());

// Route POST : créer une réservation
app.post("/Reservations", async (req, res) => {
  try {
    const {
      client_name,
      phone_number,
      reservation_date,
      number_of_people,
      status,
    } = req.body;
    if (
      !client_name ||
      !phone_number ||
      !reservation_date ||
      !number_of_people ||
      !status
    ) {
      return res
        .status(400)
        .json({ status: 400, message: "Tous les champs sont requis." });
    }

    const [result] = await db.query(
      "INSERT INTO Reservations (client_name, phone_number, reservation_date, number_of_people, status) VALUES (?, ?, ?, ?, ?)",
      [client_name, phone_number, reservation_date, number_of_people, status]
    );
    res.status(201).json({
      status: 201,
      message: "Réservation ajoutée avec succès.",
      data: {
        id: result.insertId,
        client_name,
        phone_number,
        reservation_date,
        number_of_people,
        status,
      },
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: "Erreur lors de l'ajout.",
      error: error.message,
    });
  }
});

//  Route GET : liste de toutes les réservations
app.get("/Reservations", async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM Reservations");
    res.status(200).json({
      status: 200,
      message: "Liste récupérée avec succès.",
      data: rows,
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: "Erreur lors de la récupération.",
      error: error.message,
    });
  }
});

// Route GET : détail d'une réservation
app.get("/reservations/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const [rows] = await db.query("SELECT * FROM Reservations WHERE id = ?", [
      id,
    ]);
    if (rows.length === 0) {
      return res
        .status(404)
        .json({ status: 404, message: "Réservation non trouvée." });
    }
    res.status(200).json({
      status: 200,
      message: "Détail récupéré avec succès.",
      data: rows[0],
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: "Erreur lors de la récupération.",
      error: error.message,
    });
  }
});

// Route DELETE : supprimer une réservation
app.delete("/reservations/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const [existing] = await db.query(
      "SELECT * FROM Reservations WHERE id = ?",
      [id]
    );
    if (existing.length === 0) {
      return res
        .status(404)
        .json({ status: 404, message: "Réservation non trouvée." });
    }

    await db.query("DELETE FROM Reservations WHERE id = ?", [id]);
    res.status(200).json({
      error: false,
      message: `Réservation ${id} supprimée avec succès.`,
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: "Erreur lors de la suppression.",
      error: error.message,
    });
  }
});

// Lancement du serveur
app.listen(3000, () => {
  console.log("Serveur en marche sur http://localhost:3000");
});

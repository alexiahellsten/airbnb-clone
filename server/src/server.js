import express from "express";
import db from "../db/db.js";

const port = 8000;
const app = express();

app.get("/api/listings", (req, res) => {
  const listings = db.prepare("SELECT * FROM listings").all(); 

  if (!listings) {
    return res.status(500).json({ message: "Misslyckades med att hämta annonserna från databasen" });
  }

  res.json(listings);
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
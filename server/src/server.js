import express from "express";
import db from "../db/db.js";
import categoryRoutes from "./routes/categories.js";

const port = 8000;
const app = express();

app.use(express.json());

app.use("/api", categoryRoutes);

app.get("/api/listings", (req, res) => {
  const listings = db.prepare("SELECT * FROM listings").all(); 

  if (!listings) {
    return res.status(500).json({ message: "Misslyckades med att hämta annonserna från databasen" });
  }

  res.json(listings);
});


app.get("/api/users", (req, res) => {
  const users = db.prepare("SELECT * FROM users").all(); 

  if (!users) {
    return res.status(500).json({ message: "Misslyckades med att hämta användare från databasen" });
  }

  res.json(users);
});


app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
import express from "express";
import db from "../db/db.js";
import categoryRoutes from "./routes/categories.js";
import listingRoutes from "./routes/listings.js";

const port = 8000;
const app = express();

app.use(express.json());

app.use("/api", categoryRoutes);
app.use("/api", listingRoutes);

app.get("/api/users", (req, res) => {
  const users = db.prepare("SELECT * FROM users").all(); 

  if (!users) {
    return res.status(500).json({ message: "Misslyckades med att hämta användare från databasen" });
  }

  res.json(users);
});

app.get("/api/amenities", (req, res) => {
  const amenities = db.prepare("SELECT * FROM amenities").all();

  if (!amenities) {
    return res.status(500).json({ message: "Misslyckades med att hämta bekvämligheter från databasen" });
  }

  res.json(amenities);
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
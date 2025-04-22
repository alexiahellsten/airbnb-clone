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


app.get("/api/listing-images", (req, res) => {
  try {
    console.log("Fetching listing images");
    const listingImages = db.prepare("SELECT * FROM listing_images").all();
    console.log("Found images:", listingImages);
    res.json(listingImages);
  } catch (error) {
    console.error("Database error:", error);
    res.status(500).json({ message: "Database error", error: error.message });
  }
});

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
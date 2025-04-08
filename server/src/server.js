import express from "express";

const port = 8000;

const app = express();

app.get("/api/listings", (req, res) => {

    const listings = [
        { id: 1, name: "Sjöstuga i Leksand" },
        { id: 2, name: "Strandhus i Visby" },
    ];

    res.json(listings);
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
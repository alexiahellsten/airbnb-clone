import { Router } from 'express';
import db from '../../db/db.js';

const router = Router();

// Hämta alla listningar med en bild (den första bilden för varje listing)
router.get('/listings', (req, res) => {
  try {
    const query = `
      SELECT 
        listings.id, 
        listings.title, 
        listings.address, 
        listings.city, 
        listings.country, 
        listings.price_per_night, 
        listings.max_guests, 
        listings.bedrooms, 
        listings.bathrooms, 
        listings.created_at, 
        listings.updated_at,
        (
          SELECT image_url 
          FROM listing_images 
          WHERE listing_id = listings.id 
          LIMIT 1
        ) as image_url
      FROM listings;
    `;

    const listings = db.prepare(query).all();
    res.json(listings);
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: 'Misslyckades med att hämta listningar och bilder' });
  }
});

// Hämta bilder för en viss listing via listing_id
router.get('/listing-images', (req, res) => {
  const { listing_id } = req.query;

  if (!listing_id) {
    return res.status(400).json({ message: 'listing_id är obligatoriskt.' });
  }

  try {
    const query = `
      SELECT image_url
      FROM listing_images
      WHERE listing_id = ?
    `;
    const images = db.prepare(query).all(listing_id);

    // Om inga bilder hittas, returnera en tom array
    res.json(images);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Misslyckades med att hämta bilder' });
  }
});

// Hämta en enskild listing via id
router.get('/listings/:id', (req, res) => {
  const { id } = req.params;
  try {
    const query = `
      SELECT 
        id, 
        title, 
        description, 
        address, 
        city, 
        country, 
        price_per_night, 
        max_guests, 
        bedrooms, 
        bathrooms, 
        host_id, 
        created_at, 
        updated_at
      FROM listings
      WHERE id = ?
    `;
    const listing = db.prepare(query).get(id);

    if (!listing) {
      return res.status(404).json({ message: 'Listing not found' });
    }

    res.json(listing);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Misslyckades med att hämta listing' });
  }
});

router.get('/search', (req, res) => {
  const { q } = req.query;

  if (!q) {
    return res.status(400).json({ message: 'Sökterm saknas' });
  }

  try {
    const searchQuery = `%${q}%`;
    const query = `
      SELECT 
        listings.id, 
        listings.title, 
        listings.description,
        listings.address, 
        listings.city, 
        listings.country, 
        listings.price_per_night, 
        listings.max_guests, 
        listings.bedrooms, 
        listings.bathrooms, 
        listings.created_at, 
        listings.updated_at
      FROM listings
      WHERE 
        listings.city LIKE ? OR
        listings.country LIKE ? OR
        listings.title LIKE ? OR
        listings.description LIKE ?
    `;

    //Söker efter annonser baserat på sökfrasen ur 4 parametrar - city, country, title, description
    const listings = db.prepare(query).all(searchQuery, searchQuery, searchQuery, searchQuery);
    
    // Hämtar bilder för varje annons
    const listingsWithImages = listings.map(listing => {
      const imagesQuery = `
        SELECT image_url
        FROM listing_images
        WHERE listing_id = ?
      `;
      const images = db.prepare(imagesQuery).all(listing.id);
      return {
        ...listing,
        images: images.map(img => img.image_url)
      };
    });

    res.json(listingsWithImages);
  } catch (err) {
    console.error('Sökfel:', err);
    res.status(500).json({ message: 'Misslyckades med att söka efter annonser' });
  }
});

export default router;

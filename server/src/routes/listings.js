import { Router } from 'express';
import db from '../../db/db.js';

const router = Router();

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

export default router;

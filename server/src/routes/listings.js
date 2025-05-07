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
    const listings = db
      .prepare(query)
      .all(searchQuery, searchQuery, searchQuery, searchQuery);

    // Hämtar bilder för varje annons
    const listingsWithImages = listings.map((listing) => {
      const imagesQuery = `
        SELECT image_url
        FROM listing_images
        WHERE listing_id = ?
      `;
      const images = db.prepare(imagesQuery).all(listing.id);
      return {
        ...listing,
        images: images.map((img) => img.image_url),
      };
    });

    res.json(listingsWithImages);
  } catch (err) {
    console.error('Sökfel:', err);
    res
      .status(500)
      .json({ message: 'Misslyckades med att söka efter annonser' });
  }
});

// Rutt för att bort en listing
router.delete('/listings/:id', (req, res) => {
  const listingId = req.params.id;

  try {
    // Stäng av främmande nycklar (referensintegritet) tillfälligt
    db.prepare('PRAGMA foreign_keys = OFF').run();

    // Steg 1: Ta bort relaterade poster från alla tabeller
    const deleteCategoriesQuery = db.prepare(
      'DELETE FROM listing_categories WHERE listing_id = ?'
    );
    deleteCategoriesQuery.run(listingId);

    const deleteBookingsQuery = db.prepare(
      'DELETE FROM bookings WHERE listing_id = ?'
    );
    deleteBookingsQuery.run(listingId);

    const deleteBedroomsQuery = db.prepare(
      'DELETE FROM listing_bedrooms WHERE listing_id = ?'
    );
    deleteBedroomsQuery.run(listingId);

    const deleteImagesQuery = db.prepare(
      'DELETE FROM listing_images WHERE listing_id = ?'
    );
    deleteImagesQuery.run(listingId);

    const deleteReviewsQuery = db.prepare(
      'DELETE FROM reviews WHERE listing_id = ?'
    );
    deleteReviewsQuery.run(listingId);

    const deleteAmenitiesQuery = db.prepare(
      'DELETE FROM listing_amenities WHERE listing_id = ?'
    );
    deleteAmenitiesQuery.run(listingId);

    // Steg 2: Ta bort själva listing-posten
    const deleteListingQuery = db.prepare('DELETE FROM listings WHERE id = ?');
    deleteListingQuery.run(listingId);

    // Aktivera främmande nycklar igen
    db.prepare('PRAGMA foreign_keys = ON').run();

    res.status(200).send({ message: 'Listing deleted successfully' });
  } catch (error) {
    console.error('Error deleting listing:', error);
    // Aktivera främmande nycklar igen vid fel
    db.prepare('PRAGMA foreign_keys = ON').run();
    res.status(500).send({ error: 'Failed to delete listing' });
  }
});
// Hämta alla bekvämligheter (amenities)
router.get('/amenities', (req, res) => {
  try {
    const query = `SELECT name, icon, category FROM amenities`;
    const amenities = db.prepare(query).all();
    res.json(amenities);
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: 'Misslyckades med att hämta bekvämligheter' });
  }
});

// Skapa en ny listing
// Skapa en ny listing
router.post('/listings', (req, res) => {
  try {
    const {
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
      images, // Mottar bilder som en array med URL:er
      bedroom_details,
      amenities,
    } = req.body;

    // Starta en transaktion
    db.prepare('BEGIN TRANSACTION').run();

    try {
      // Infoga huvudlistingen
      const insertListingQuery = `
        INSERT INTO listings (
          title, description, address, city, country,
          price_per_night, max_guests, bedrooms, bathrooms, host_id
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `;

      const result = db
        .prepare(insertListingQuery)
        .run(
          title,
          description,
          address,
          city,
          country,
          price_per_night,
          max_guests,
          bedrooms,
          bathrooms,
          host_id
        );

      const listingId = result.lastInsertRowid;

      // Infoga bilder om de finns
      if (images && images.length > 0) {
        const insertImageQuery = `
          INSERT INTO listing_images (listing_id, image_url)
          VALUES (?, ?)
        `;
        const insertImage = db.prepare(insertImageQuery);
        images.forEach((imageUrl) => {
          insertImage.run(listingId, imageUrl);
        });
      }

      // Infoga sovrumsdetaljer om de finns
      if (bedroom_details && bedroom_details.length > 0) {
        const insertBedroomQuery = `
          INSERT INTO listing_bedrooms (listing_id, name, single_beds, double_beds)
          VALUES (?, ?, ?, ?)
        `;
        const insertBedroom = db.prepare(insertBedroomQuery);
        bedroom_details.forEach((bedroom) => {
          insertBedroom.run(
            listingId,
            bedroom.name,
            bedroom.single_beds || 0,
            bedroom.double_beds || 0
          );
        });
      }

      // Infoga bekvämligheter om de finns
      if (amenities && amenities.length > 0) {
        const insertAmenityQuery = `
          INSERT INTO listing_amenities (listing_id, amenity_name)
          VALUES (?, ?)
        `;
        const insertAmenity = db.prepare(insertAmenityQuery);
        amenities.forEach((amenityName) => {
          insertAmenity.run(listingId, amenityName);
        });
      }

      // Bekräfta transaktionen
      db.prepare('COMMIT').run();

      res.status(201).json({
        message: 'Listing created successfully',
        listingId: listingId,
      });
    } catch (error) {
      // Återställ transaktionen vid fel
      db.prepare('ROLLBACK').run();
      throw error;
    }
  } catch (err) {
    console.error('Error creating listing:', err);
    res.status(500).json({ message: 'Failed to create listing' });
  }
});

// Lägg till sovrum till en listing
router.post('/bedrooms', (req, res) => {
  console.log('Full request body:', req.body);
  const { listing_id, name, single_beds, double_beds } = req.body;
  console.log('Parsed bedroom data:', {
    listing_id,
    name,
    single_beds,
    double_beds,
  });

  if (!listing_id || !name) {
    console.log('Missing required fields:', { listing_id, name });
    return res.status(400).json({
      message: 'listing_id och name krävs',
      received: { listing_id, name, single_beds, double_beds },
    });
  }

  try {
    // Kontrollera först om listingen finns
    const listingExists = db
      .prepare('SELECT id FROM listings WHERE id = ?')
      .get(listing_id);
    if (!listingExists) {
      console.log('Listing not found:', listing_id);
      return res.status(404).json({ message: 'Listingen hittades inte' });
    }

    // Infoga i sovrumstabellen med rätt kolumner
    const insertBedroomQuery = `
      INSERT INTO listing_bedrooms (listing_id, name, single_beds, double_beds)
      VALUES (?, ?, ?, ?)
    `;

    console.log('Executing query:', insertBedroomQuery);
    console.log('With values:', {
      listing_id,
      name,
      single_beds: single_beds || 0,
      double_beds: double_beds || 0,
    });

    const result = db
      .prepare(insertBedroomQuery)
      .run(listing_id, name, single_beds || 0, double_beds || 0);

    console.log('Insert result:', result);
    res.status(201).json({
      message: 'Sovrum tillagt',
      id: result.lastInsertRowid,
    });
  } catch (err) {
    console.error('Error adding bedroom:', err);
    console.error('Error details:', err.stack);
    console.error('Error message:', err.message);
    console.error('Error code:', err.code);
    res.status(500).json({
      message: 'Kunde inte lägga till sovrum',
      error: err.message,
      code: err.code,
    });
  }
});

// Lägg till bekvämlighet till en listing
router.post('/listing-amenities', (req, res) => {
  console.log('Full request body:', req.body);
  const { listing_id, amenity_name } = req.body;
  console.log('Parsed amenity data:', { listing_id, amenity_name });

  if (!listing_id || !amenity_name) {
    console.log('Missing required fields:', { listing_id, amenity_name });
    return res.status(400).json({
      message: 'listing_id och amenity_name krävs',
      received: { listing_id, amenity_name },
    });
  }

  try {
    // Hämta först amenity_id från amenities-tabellen
    const getAmenityIdQuery = `
      SELECT id FROM amenities WHERE name = ?
    `;
    console.log('Looking up amenity:', amenity_name);
    const amenity = db.prepare(getAmenityIdQuery).get(amenity_name);

    if (!amenity) {
      console.log('Amenity not found:', amenity_name);
      return res.status(400).json({
        message: 'Bekvämligheten hittades inte',
        received: { listing_id, amenity_name },
      });
    }

    console.log('Found amenity:', amenity);

    // Infoga sedan i listing_amenities
    const query = `
      INSERT INTO listing_amenities (listing_id, amenity_id)
      VALUES (?, ?)
    `;
    const result = db.prepare(query).run(listing_id, amenity.id);
    console.log('Inserted amenity:', { listing_id, amenity_id: amenity.id });
    res.status(201).json({ id: result.lastInsertRowid });
  } catch (err) {
    console.error('Error adding amenity:', err);
    res.status(500).json({
      message: 'Kunde inte lägga till bekvämlighet till listingen',
      error: err.message,
      details: { listing_id, amenity_name },
    });
  }
});
// Lägg till en bild till listing_images
router.post('/listing-images', (req, res) => {
  const { listing_id, image_url } = req.body;

  if (!listing_id || !image_url) {
    return res.status(400).json({ message: 'listing_id och image_url krävs.' });
  }

  try {
    // Infoga i tabellen listing_images
    const insertImageQuery = `
      INSERT INTO listing_images (listing_id, image_url)
      VALUES (?, ?)
    `;
    const result = db.prepare(insertImageQuery).run(listing_id, image_url);

    // Svara med den infogade bilden (kan inkludera ID och de infogade värdena)
    res.status(201).json({
      message: 'Bild tillagd framgångsrikt.',
      image: {
        id: result.lastInsertRowid,
        listing_id,
        image_url,
      },
    });
  } catch (err) {
    console.error('Error inserting image into database:', err);
    res.status(500).json({ error: 'Något gick fel vid bildinläggningen' });
  }
});

// Lägg till en bild till listing_images
router.post('/listing-images', (req, res) => {
  const { listing_id, image_url } = req.body;

  if (!listing_id || !image_url) {
    return res.status(400).json({ message: 'listing_id och image_url krävs.' });
  }

  try {
    // Infoga i tabellen listing_images
    const insertImageQuery = `
      INSERT INTO listing_images (listing_id, image_url)
      VALUES (?, ?)
    `;
    const result = db.prepare(insertImageQuery).run(listing_id, image_url);

    // Svara med den infogade bilden (kan inkludera ID och de infogade värdena)
    res.status(201).json({
      message: 'Bild tillagd framgångsrikt.',
      image: {
        id: result.lastInsertRowid,
        listing_id,
        image_url,
      },
    });
  } catch (err) {
    console.error('Error inserting image into database:', err);
    res.status(500).json({ error: 'Något gick fel vid bildinläggningen' });
  }
});

export default router;

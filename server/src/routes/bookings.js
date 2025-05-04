import express from 'express';
import db from '../../db/db.js';

const router = express.Router();

// Hämta bokning efter ID
router.get('/:id', (req, res) => {
  const bookingId = req.params.id;
  
  const query = `
    SELECT booking.*, listing.title as listing_title, listing.address as listing_address
    FROM bookings booking
    JOIN listings listing ON booking.listing_id = listing.id
    WHERE booking.id = ?
  `;

  const booking = db.prepare(query).get(bookingId);

  if (!booking) {
    return res.status(404).json({ error: 'Bokning hittades inte' });
  }

  res.json(booking);
});

// Skapa ny bokning
router.post('/', (req, res) => {
  const { user_id, listing_id, start_date, end_date, total_price, guests, status } = req.body;

  const query = `
    INSERT INTO bookings (user_id, listing_id, start_date, end_date, total_price, guests, status)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `;

  try {
    const result = db.prepare(query).run(
      user_id, 
      listing_id, 
      start_date, 
      end_date, 
      total_price, 
      guests, 
      status || 'Väntar på bekräftelse'
    );

    // Hämta den skapade bokningen
    const booking = db.prepare('SELECT * FROM bookings WHERE id = ?').get(result.lastInsertRowid);
    res.status(201).json(booking);
  } catch (err) {
    console.error('Fel vid skapande av bokning:', err);
    res.status(500).json({ error: 'Intern serverfel' });
  }
});

export default router; 
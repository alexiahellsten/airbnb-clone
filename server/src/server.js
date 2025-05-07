import express from 'express';
import db from '../db/db.js';
import categoryRoutes from './routes/categories.js';
import listingRoutes from './routes/listings.js';
import bookingRoutes from './routes/bookings.js';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const port = 8000;
const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(
  cors({
    origin: 'http://localhost:4200',
    methods: ['GET', 'POST', 'DELETE', 'PUT'], // Tillåt DELETE-metoden
    credentials: true,
  })
);

app.use(express.json());

app.use('/api', categoryRoutes);
app.use('/api', listingRoutes);
app.use('/api/bookings', bookingRoutes);

// Servera statiska bilder
app.use(
  '/api/images',
  express.static(path.join(__dirname, 'public/images/uploads'))
);

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

// import express from 'express';
// import db from '../db/db.js';
// import categoryRoutes from './routes/categories.js';
// import listingRoutes from './routes/listings.js';
// import bookingRoutes from './routes/bookings.js';
// import uploadRoute from './routes/uploadRoute.js'; // Importera uploadRoute
// import cors from 'cors'; // eller: const cors = require('cors');
// import path from 'path'; // Glömde att importera path
// import { fileURLToPath } from 'url'; // För att hämta filvägen
// import { dirname } from 'path'; // För att hämta mappvägen

// const port = 8000;
// const app = express();

// // Hämta den aktuella filens väg
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename); // Hämta katalogen där server.js finns

// // Aktivera CORS för att tillåta frontend-kommunikation
// app.use(
//   cors({
//     origin: 'http://localhost:4200', // tillåt frontend
//     methods: ['GET', 'POST'],
//     credentials: true, // bara om du skickar cookies eller auth-headers
//   })
// );

// app.use(express.json());

// // Använd rutter för API:et
// app.use('/api', categoryRoutes);
// app.use('/api', listingRoutes);
// app.use('/api/bookings', bookingRoutes);

// // Lägg till uploadRoute här
// app.use('/api/images/uploads', uploadRoute); // Skicka uppladdningsförfrågningar till uploadRoute

// // Servera statiska bilder från public/images
// app.use(
//   '/api/images',
//   express.static(path.join(__dirname, 'public/images/uploads'))
// ); // Ändra här till rätt mapp

// // API endpoint för användare
// app.get('/api/users', (req, res) => {
//   const users = db.prepare('SELECT * FROM users').all();

//   if (!users) {
//     return res.status(500).json({
//       message: 'Misslyckades med att hämta användare från databasen',
//     });
//   }

//   res.json(users);
// });

// // API endpoint för kategorier
// app.get('/api/categories', (req, res) => {
//   const categories = db.prepare('SELECT * FROM categories').all();
//   if (!categories) {
//     return res.status(500).json({
//       message: 'Misslyckades med att hämta kategorier från databasen',
//     });
//   }
//   res.json(categories);
// });

// // API endpoint för bekvämligheter
// app.get('/api/amenities', (req, res) => {
//   const amenities = db.prepare('SELECT * FROM amenities').all();

//   if (!amenities) {
//     return res.status(500).json({
//       message: 'Misslyckades med att hämta bekvämligheter från databasen',
//     });
//   }

//   res.json(amenities);
// });

// // Starta servern
// app.listen(port, () => {
//   console.log(`Listening on port ${port}`);
// });

import express from 'express';
import db from '../db/db.js';
import categoryRoutes from './routes/categories.js';
import listingRoutes from './routes/listings.js';
import bookingRoutes from './routes/bookings.js';
import uploadRoute from './routes/uploadRoute.js';
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
    methods: ['GET', 'POST'],
    credentials: true,
  })
);

app.use(express.json());

app.use('/api', categoryRoutes);
app.use('/api', listingRoutes);
app.use('/api/bookings', bookingRoutes);

app.use('/api/images/uploads', uploadRoute);

// Servera statiska bilder
app.use(
  '/api/images',
  express.static(path.join(__dirname, 'public/images/uploads'))
);

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

// // import express from 'express';
// // import multer from 'multer';
// // import path from 'path';

// // // Skapa en lagringsinställning för multer
// // const storage = multer.diskStorage({
// //   destination: function (req, file, cb) {
// //     cb(null, 'public/images/uploads'); // Ange mappen för uppladdade filer
// //   },
// //   filename: function (req, file, cb) {
// //     cb(null, Date.now() + path.extname(file.originalname)); // Generera unikt namn för varje fil
// //   },
// // });

// // // Skapa multer middleware för att hantera bilduppladdningar
// // const upload = multer({ storage: storage });

// // const uploadRoute = express.Router();

// // // Hantera uppladdning av flera bilder
// // uploadRoute.post('/', upload.array('images', 5), (req, res) => {
// //   if (!req.files) {
// //     return res.status(400).send({ message: 'Inga filer uppladdades' });
// //   }
// //   // Här kan du hantera filerna och koppla dem till en post eller annan logik
// //   res.status(200).send({ message: 'Bilder uppladdade!', files: req.files });
// // });

// // uploadRoute.post('/', upload.array('images', 5), (req, res) => {
// //   if (!req.files) {
// //     return res.status(400).send({ message: 'Inga filer uppladdades' });
// //   }

// //   const listingId = req.body.listingId; // Ta emot listingId från klienten

// //   req.files.forEach((file) => {
// //     // Lägg till varje bild i `listing_images`-tabellen
// //     db.prepare(
// //       'INSERT INTO listing_images (listing_id, image_url) VALUES (?, ?)'
// //     ).run(listingId, '/images/uploads/' + file.filename); // Använd den väg du har definierat för att nå bilderna
// //   });

// //   res.status(200).send({ message: 'Bilder uppladdade!', files: req.files });
// // });
// // export default uploadRoute;

// import express from 'express';
// import multer from 'multer';
// import path from 'path';
// import db from '../../db/db.js'; // Importera db.js

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, 'public/images/uploads'); // Spara filer i denna mapp
//   },
//   filename: function (req, file, cb) {
//     cb(null, Date.now() + path.extname(file.originalname)); // Använd timestamp + filtyp för unikt filnamn
//   },
// });

// const upload = multer({ storage: storage });
// const uploadRoute = express.Router();

// uploadRoute.post('/', upload.array('images', 5), (req, res) => {
//   console.log('Files received:', req.files); // Logga inkommande filer

//   if (!req.files) {
//     return res.status(400).send({ message: 'Inga filer uppladdades' });
//   }

//   const listingId = req.body.listingId;

//   if (!listingId) {
//     console.log('No listingId provided');
//     return res.status(200).send({
//       message: 'Bilder uppladdade, men inget listingId angavs',
//       files: req.files,
//     });
//   }

//   try {
//     req.files.forEach((file) => {
//       console.log('Saving file:', file); // Logga varje fil som sparas
//       db.prepare(
//         'INSERT INTO listing_images (listing_id, image_url) VALUES (?, ?)'
//       ).run(listingId, '/images/uploads/' + file.filename);
//     });

//     res.status(200).send({ message: 'Bilder uppladdade!', files: req.files });
//   } catch (err) {
//     console.error('Fel vid databas-insert:', err);
//     res.status(500).send({ message: 'Fel vid databas-insert.' });
//   }
// });

// export default uploadRoute;

// import express from 'express';
// import multer from 'multer';
// import path from 'path';
// import db from '../../db/db.js'; // Importera db.js

// // Skapa en lagringsinställning för multer
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, 'public/images/uploads'); // Ange mappen för uppladdade filer
//   },
//   filename: function (req, file, cb) {
//     cb(null, Date.now() + path.extname(file.originalname)); // Generera unikt namn för varje fil
//   },
// });

// // Skapa multer middleware för att hantera bilduppladdningar
// const upload = multer({ storage: storage });

// const uploadRoute = express.Router();

// // Hantera uppladdning av flera bilder
// uploadRoute.post('/', upload.array('images', 5), (req, res) => {
//   if (!req.files) {
//     return res.status(400).send({ message: 'Inga filer uppladdades' });
//   }

//   const imageUrls = req.files.map((file) => {
//     const imageUrl = `/api/images/${file.filename}`; // URL för den uppladdade bilden
//     // Lägg till logik för att spara bilden i databasen här
//     db.prepare('INSERT INTO listing_images (image_url) VALUES (?)').run(
//       imageUrl
//     );
//     return imageUrl;
//   });

//   res.status(200).send({ message: 'Bilder uppladdade!', imageUrls });
// });

// export default uploadRoute;
import express from 'express';
import multer from 'multer';
import path from 'path';
import db from '../../db/db.js'; // Importera db.js

// Skapa en lagringsinställning för multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/images/uploads'); // Ange mappen för uppladdade filer
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // Generera unikt namn för varje fil
  },
});

// Skapa multer middleware för att hantera bilduppladdningar
const upload = multer({ storage: storage });

const uploadRoute = express.Router();

// Hantera uppladdning av flera bilder
uploadRoute.post('/', upload.array('images', 5), (req, res) => {
  if (!req.files) {
    return res.status(400).send({ message: 'Inga filer uppladdades' });
  }

  const imageUrls = req.files.map((file) => {
    const imageUrl = `/api/images/${file.filename}`; // URL för den uppladdade bilden
    // Vi sparar inte bilder i databasen än, vi returnerar bara URL:erna
    return imageUrl;
  });

  // Skicka tillbaka en lista med URL:er för de uppladdade bilderna
  res.status(200).send({ message: 'Bilder uppladdade!', imageUrls });
});

export default uploadRoute;

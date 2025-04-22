import { Router } from 'express';
import db from '../../db/db.js';

const router = Router();

router.get('/categories', (req, res) => {
  try {
    const categories = db.prepare("SELECT * FROM categories").all();
    res.json(categories);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Misslyckades med att hämta kategorier" });
  }
});

export default router;

import { db } from '../db/connection.js';

export const getSearchResults = (req, res) => {
    const query = req.query.q;
  
    if (!query) {
      return res.status(400).json({ error: "Ingen sökfråga angiven" });
    }
  
    const searchQuery = `%${query}%`; // Wildcard sökning
    const queryStmt = db.prepare("SELECT * FROM products WHERE name LIKE ?");
    const results = queryStmt.all(searchQuery);
    console.log(results)
    res.json(results);
  };
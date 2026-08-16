import supabase from "../config/supabase.js";
 
export const getSearchResults = async (req, res) => {
  const query = req.query.q;
 
  if (!query) {
    return res.status(400).json({ error: "Ingen sökfråga angiven" });
  }
 
  try {
    const { data: results, error } = await supabase
      .from("products")
      .select("*")
      .ilike("name", `%${query}%`);
 
    if (error) throw error;
 
    res.json(results);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Sökningen misslyckades" });
  }
};
 
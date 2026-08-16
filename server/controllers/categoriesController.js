import supabase from "../config/supabase.js";

export const getAllCategories = async (req, res) => {
  try {
    const { data: categories, error } = await supabase
      .from("categories")
      .select("*");

    if (error) throw error;

    res.json(categories);
  } catch (error) {
    res.status(500).json({ error: "Serverfel", details: error.message });
  }
};

export const getCategoryWithProducts = async (req, res) => {
  const { slug } = req.params;

  try {
    const { data: category, error: categoryError } = await supabase
      .from("categories")
      .select("*")
      .eq("slug", slug)
      .maybeSingle();

    if (categoryError) throw categoryError;

    if (!category) {
      return res.status(404).json({ error: "Kategori hittades inte" });
    }

    const { data: products, error: productsError } = await supabase
      .from("products")
      .select("*")
      .eq("categoryId", category.id);

    if (productsError) throw productsError;

    res.json({ category, products });
  } catch (error) {
    res.status(500).json({ error: "Serverfel", details: error.message });
  }
};

export const addCategory = async (req, res) => {
  try {
    const { name } = req.body;
    if (!req.file) return res.status(400).json({ error: "Ingen bild skickad" });

    const slug = formatSlug(name);
    const imageUrl = "/images/categories/" + req.file.filename;

    const { data: category, error } = await supabase
      .from("categories")
      .insert({ name, slug, imageUrl })
      .select()
      .single();

    if (error) throw error;

    res.status(201).json(category);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Något gick fel vid tillägg av kategori" });
  }
};

export const removeCategory = async (req, res) => {
  const { id } = req.params;

  try {
    const { data: category, error: findError } = await supabase
      .from("categories")
      .select("*")
      .eq("id", id)
      .maybeSingle();

    if (findError) throw findError;

    if (!category) {
      return res.status(404).json({ error: "Produkt inte hittad" });
    }

    const { error: deleteError } = await supabase
      .from("categories")
      .delete()
      .eq("id", id);

    if (deleteError) throw deleteError;

    const { data: updatedCategories, error: fetchError } = await supabase
      .from("categories")
      .select("*");

    if (fetchError) throw fetchError;

    res.json(updatedCategories);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Något gick fel vid borttagning av kategori" });
  }
};

function formatSlug(text) {
  return text
    .toLowerCase() // Gör om till små bokstäver
    .replace(/\s+/g, "-") // Ersätt mellanslag med bindestreck
    .replace(/å/g, "a") // Ersätt åäö med aao
    .replace(/ä/g, "a")
    .replace(/ö/g, "o")
    .replace(/[^a-z0-9-]/g, ""); // Ta bort allt utom bokstäver, siffror och bindestreck
}

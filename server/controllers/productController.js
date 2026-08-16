import { db } from "../db/connection.js";
import supabase from "../config/supabase.js";

export async function getAllProducts(req, res) {
  const today = new Date();

  try {
    const { data: products, error } = await supabase
      .from("products")
      .select("*")
      .order("publishedDate", { ascending: false });

    if (error) {
      throw error;
    }

    const productsWithIsNew = products.map((product) => {
      const publishedDate = new Date(product.publishedDate);

      const diffInDays = Math.floor(
        (today.getTime() - publishedDate.getTime()) / (1000 * 60 * 60 * 24),
      );
      return {
        ...product,
        isNew: diffInDays <= 7,
      };
    });

    res.json(productsWithIsNew);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch products" });
  }
}

export const getProductBySlug = async (req, res) => {
  const { slug } = req.params;

  try {
    const { data: product, error } = await supabase
      .from("products")
      .select("*")
      .eq("slug", slug)
      .single();

    if (error) {
      if (error.code === "PGRST116") {
        return res.status(404).json({
          message: "Produkt hittades inte",
        });
      }

      throw error;
    }

    res.json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Serverfel", details: error.message });
  }
};

export const removeProduct = async (req, res) => {
  const { id } = req.params;

  try {
    const { data: product, error: findError } = await supabase
      .from("products")
      .select("*")
      .eq("id", id)
      .single();

    if (findError) {
      if (findError.code === "PGRST116") {
        return res.status(404).json({
          error: "Produkt inte hittad",
        });
      }

      throw findError;
    }

    const { error: deleteError } = await supabase
      .from("products")
      .delete()
      .eq("id", id);

    if (deleteError) {
      throw deleteError;
    }

    const { data: updatedProducts, error: fetchError } = await supabase
      .from("products")
      .select("*");

    if (fetchError) {
      throw fetchError;
    }

    res.json(updatedProducts);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Serverfel",
      details: error.message,
    });
  }
};

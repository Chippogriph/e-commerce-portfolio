import supabase from "../config/supabase.js";

// Migrera gästcart till användarcart vid login
export const migrateGuestCart = async (userId, sessionCart) => {
  if (!sessionCart || sessionCart.length === 0) return;

  for (const item of sessionCart) {
    const { data: existingProduct, error: findError } = await supabase
      .from("cart")
      .select("*")
      .eq("slug", item.slug)
      .eq("userId", userId)
      .maybeSingle();

    if (findError) throw findError;

    if (existingProduct) {
      const { error: updateError } = await supabase
        .from("cart")
        .update({ quantity: existingProduct.quantity + item.quantity })
        .eq("slug", item.slug)
        .eq("userId", userId);

      if (updateError) throw updateError;
    } else {
      const { error: insertError } = await supabase.from("cart").insert({
        userId,
        slug: item.slug,
        name: item.name,
        url: item.url,
        brand: item.brand,
        price: item.price,
        quantity: item.quantity,
      });

      if (insertError) throw insertError;
    }
  }
};
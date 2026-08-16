import supabase from "../config/supabase.js";

export async function migrateGuestFavoritesToUser(session) {
  if (session.favorites?.length) {
    const rows = session.favorites.map((productId) => ({
      userId: session.userId,
      productId,
    }));

    const { error } = await supabase
      .from("userFavorites")
      .upsert(rows, { onConflict: "userId,productId", ignoreDuplicates: true });

    if (error) throw error;

    session.favorites = [];
  }
}
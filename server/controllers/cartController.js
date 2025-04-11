import { dbCart } from '../db/connection.js';

export const getCart = (req, res) => {
    const cartItems = dbCart.prepare("SELECT * FROM cart").all();
    res.json(cartItems);
};

export const addToCart = (req, res) => {
    const { slug, name, url, brand, price } = req.body;

    if (!slug || !name || !price) {
        return res.status(400).json({ error: "Alla fält krävs" });
    }

    const existingProduct = dbCart.prepare("SELECT * FROM cart WHERE slug = ?").get(slug);

    if (existingProduct) {
        dbCart.prepare("UPDATE cart SET quantity = quantity + 1 WHERE slug = ?").run(slug);
    } else{
        dbCart.prepare("INSERT INTO cart (slug, name, url, brand, price, quantity) VALUES (?, ?, ?, ?, ?, ?)").run(slug, name, url, brand, price, 1);
    }

    const updatedCart = dbCart.prepare("SELECT * FROM cart").all();
    console.log("Uppdaterad varukorg från servern:", updatedCart);
    res.json(updatedCart);
};

export const updateCart = (req, res) => {
    const { id } = req.params;
    const { quantity } = req.body;

    if (!quantity || quantity < 1) {
        return res.status(400).json({ error: "Antal måste vara minst 1" });
    }

    dbCart.prepare("UPDATE cart SET quantity = ? WHERE id = ?").run(quantity, id);
    res.json({ message: "Antal uppdaterat" });
};

export const removeFromCart = (req, res) => {
    const { id } = req.params;

    const product = dbCart.prepare("SELECT * FROM cart WHERE id = ?").get(id);
    if (!product) {
        return res.status(404).json({ error: "Produkt inte hittad" });
    }

    dbCart.prepare("DELETE FROM cart WHERE id = ?").run(id);
    res.json({ message: "Produkt borttagen från varukorgen" });
};

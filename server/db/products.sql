create TABLE IF NOT EXISTS products (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    slug TEXT,
    name TEXT,
    description TEXT,
    url TEXT,
    brand TEXT,
    sku TEXT,
    price INTEGER,
    quantity INTEGER,
    publishedDate TEXT,
    categoryId INTEGER,
    FOREIGN KEY(categoryId) REFERENCES categories(id)
);

CREATE TABLE IF NOT EXISTS categories (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  imageUrl text NOT NULL,
  slug TEXT UNIQUE NOT NULL
);

CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  username TEXT NOT NULL UNIQUE,
  email TEXT NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  isAdmin INTEGER NOT NULL DEFAULT 0,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE IF NOT EXISTS userFavorites (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  userId INTEGER NOT NULL,
  productId INTEGER NOT NULL,
  UNIQUE(userId, productId),
  FOREIGN KEY(userId) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY(productId) REFERENCES products(id) ON DELETE CASCADE
);



INSERT INTO categories (name, imageUrl, slug) VALUES
("Kläder", "/images/200.svg", "klader"),
("Accessoarer", "/images/200.svg", "accessoarer"),
("Skor", "/images/200.svg", "skor");

INSERT INTO products (slug, name, description, url, brand, sku, price, quantity, publishedDate, categoryId) VALUES
("gra-doskalle", "Grå döskalle", "En snygg grå t-shirt med tryck av en döskalle.", "/images/gra-doskalle.jpg", "Döskalle", "GGG111", 199, 20, "2025-02-22", 1),
("gra-tryck", "Grå tryck", "En snygg grå t-shirt med tryck.", "/images/gra-tryck.jpg", "Tryck", "GGG222", 199, 20, "2025-01-01", 1),
("gravit-tshirt", "Gråvit t-shirt", "En snygg gråvit t-shirt.", "/images/gravit-tshirt.jpg", "Gråvit", "GGG333", 199, 20, "2025-01-01", 1),
("oktan", "Oktan", "En snygg oktanfärgad t-shirt med tryck.", "/images/oktan.jpg", "Oktan", "OOO111", 199, 20, "2025-01-01", 1),
("svart-blad", "Svart blad", "En snygg svart t-shirt med blad tryck.", "/images/svart-blad.jpg", "Blad", "SSS111", 199, 20, "2025-01-01", 1),
("svart-brun", "Svart brun", "En snygg svart t-shirt med tryck.", "/images/svart-brun.jpg", "Svartbrun", "SSS222", 199, 20, "2025-01-01", 1),
("svart-washed", "Svart washed", "En snygg svart washed t-shirt.", "/images/svart-washed.jpg", "Washed", "SSS333", 199, 20, "2025-01-01", 1),
("vit-rod", "Vit röd", "En snygg vit t-shirt med rött tryck.", "/images/vit-rod.jpg", "Vit Röd", "VVV111", 199, 20, "2025-01-01", 1),
("vit-rosa", "Vit rosa", "En snygg vit t-shirt med tryck.", "/images/vit-rosa.jpg", "Vit Rosa", "VVV222", 199, 20, "2025-01-01", 1),
("vit-sal", "Vit Säl", "En snygg vit t-shirt med säl tryck.", "/images/vit-sal.jpg", "Säl", "VVV333", 199, 20, "2025-01-01", 1),
("vit-skylt", "Vit Skylt", "En snygg vit t-shirt med skylt tryck.", "/images/vit-skylt.jpg", "Skylt", "VVV444", 199, 20, "2025-01-01", 1),
("vit-tecken", "Vit Tecken", "En snygg vit t-shirt med tecken tryck.", "/images/vit-tecken.jpg", "Tecken", "VVV555", 199, 20, "2025-01-01", 1),
("vit-tryck", "Vit Tryck", "En snygg vit t-shirt med tryck.", "/images/vit-tryck.jpg", "Vit", "VVV666", 199, 20, "2025-01-01", 1),
("vit-tshirt", "Vit T-shirt", "En snygg vit t-shirt.", "/images/vit-tshirt.jpg", "Tshirt", "VVV777", 199, 20, "2025-01-01", 1)


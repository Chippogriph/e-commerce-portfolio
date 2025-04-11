create TABLE products (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    slug TEXT,
    name TEXT,
    description TEXT,
    url TEXT,
    brand TEXT,
    sku TEXT,
    price INTEGER,
    quantity INTEGER,
    publishedDate TEXT
);

INSERT INTO products (slug, name, description, url, brand, sku, price, quantity, publishedDate) VALUES
("gra-doskalle", "Grå döskalle", "En snygg grå t-shirt med tryck av en döskalle.", "/images/gra-doskalle.jpg", "Döskalle", "GGG111", 199, 20, "2025-02-22"),
("gra-tryck", "Grå tryck", "En snygg grå t-shirt med tryck.", "/images/gra-tryck.jpg", "Tryck", "GGG222", 199, 20, "2025-01-01"),
("gravit-tshirt", "Gråvit t-shirt", "En snygg gråvit t-shirt.", "/images/gravit-tshirt.jpg", "Gråvit", "GGG333", 199, 20, "2025-01-01"),
("oktan", "Oktan", "En snygg oktanfärgad t-shirt med tryck.", "/images/oktan.jpg", "Oktan", "OOO111", 199, 20, "2025-01-01"),
("svart-blad", "Svart blad", "En snygg svart t-shirt med blad tryck.", "/images/svart-blad.jpg", "Blad", "SSS111", 199, 20, "2025-01-01"),
("svart-brun", "Svart brun", "En snygg svart t-shirt med tryck.", "/images/svart-brun.jpg", "Svartbrun", "SSS222", 199, 20, "2025-01-01"),
("svart-washed", "Svart washed", "En snygg svart washed t-shirt.", "/images/svart-washed.jpg", "Washed", "SSS333", 199, 20, "2025-01-01"),
("vit-rod", "Vit röd", "En snygg vit t-shirt med rött tryck.", "/images/vit-rod.jpg", "Vit Röd", "VVV111", 199, 20, "2025-01-01"),
("vit-rosa", "Vit rosa", "En snygg vit t-shirt med tryck.", "/images/vit-rosa.jpg", "Vit Rosa", "VVV222", 199, 20, "2025-01-01"),
("vit-sal", "Vit Säl", "En snygg vit t-shirt med säl tryck.", "/images/vit-sal.jpg", "Säl", "VVV333", 199, 20, "2025-01-01"),
("vit-skylt", "Vit Skylt", "En snygg vit t-shirt med skylt tryck.", "/images/vit-skylt.jpg", "Skylt", "VVV444", 199, 20, "2025-01-01"),
("vit-tecken", "Vit Tecken", "En snygg vit t-shirt med tecken tryck.", "/images/vit-tecken.jpg", "Tecken", "VVV555", 199, 20, "2025-01-01"),
("vit-tryck", "Vit Tryck", "En snygg vit t-shirt med tryck.", "/images/vit-tryck.jpg", "Vit", "VVV666", 199, 20, "2025-01-01"),
("vit-tshirt", "Vit T-shirt", "En snygg vit t-shirt.", "/images/vit-tshirt.jpg", "Tshirt", "VVV777", 199, 20, "2025-01-01")

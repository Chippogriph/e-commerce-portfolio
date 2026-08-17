import express from "express";
import session from "express-session";
import cors from "cors";
import path from "path";
import connectSqlite3 from "connect-sqlite3";
import corsConfig from "./config/corsConfig.js";
import productRoutes from "./routes/products.js";
import cartRoutes from "./routes/cart.js";
import searchRoutes from "./routes/search.js";
import adminRoutes from "./routes/admin.js";
import categoriesRoutes from "./routes/categories.js";
import authRoutes from "./routes/auth.js"
import favoritesRoutes from './routes/favorites.js';

const app = express();
const PORT = process.env.PORT || 8000;

const SQLiteStore = connectSqlite3(session);

app.use(express.json());
app.use("/images", express.static(path.join(process.cwd(), "public/images")));
app.use(cors(corsConfig));
app.set("trust proxy", 1);
app.use(
  session({
    store: new SQLiteStore({
      db: "sessions.sqlite",
      dir: "./db",
    }),
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: true,
      httpOnly: true,
      sameSite: "none",
      maxAge: 1000 * 60 * 60, // 1 timme
    },
  })
);
app.use((req, res, next) => {
  console.log("SESSION ID:", req.sessionID);
  console.log("SESSION:", req.session);
  next();
});
app.use("/api/products/search", searchRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/products", adminRoutes);
app.use("/api/categories", categoriesRoutes);
app.use("/api/auth", authRoutes);
app.use('/api/favorites', favoritesRoutes);


app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on ${PORT}`);
});

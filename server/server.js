import express from "express";
import session from "express-session";
import cors from "cors";
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
const port = 8000;

const SQLiteStore = connectSqlite3(session);

app.use(express.json());
app.use(cors(corsConfig));
app.use(
  session({
    store: new SQLiteStore({
      db: "sessions.sqlite",
      dir: "./db",
    }),
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false, // true i produktion med HTTPS
      httpOnly: true,
      maxAge: 1000 * 60 * 60, // 1 timme
    },
  })
);

app.use("/api/products/search", searchRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/products", adminRoutes);
app.use("/api/categories", categoriesRoutes);
app.use("/api/auth", authRoutes);
app.use('/api/favorites', favoritesRoutes);


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

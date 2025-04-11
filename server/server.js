import express from "express";
import cors from "cors";
import productRoutes from "./routes/products.js";
import cartRoutes from "./routes/cart.js";
import searchRoutes from "./routes/search.js";
import corsConfig from "./config/corsConfig.js";
import adminRoutes from "./routes/admin.js";

const app = express();
const port = 8000;

app.use(express.json());
app.use(cors(corsConfig));

app.use("/api/products/search", searchRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/admin/products", adminRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

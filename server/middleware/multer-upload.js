import multer from "multer";
import path from "path";

const productsStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/images/products"); // katalogen där bilder sparas
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname); // filändelse (.jpg, .png)
    const uniqueName = Date.now() + "-" + file.originalname; 
    cb(null, uniqueName);
  }
});

export const uploadProductImage = multer({ storage: productsStorage });

// Multer storage
const categoryStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images/categories"); // Spara i denna mapp
  },
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + path.extname(file.originalname);
    cb(null, uniqueName);
  },
});

export const uploadCategoryImage = multer({ storage: categoryStorage });
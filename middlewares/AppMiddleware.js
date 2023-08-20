const multer = require("multer");
const path = require("path");

// Konfigurasi penyimpanan dengan nama-file random
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(
      null,
      file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname)
    );
  },
});

// Konfigurasi penyimpanan dengan nama-file original
const storage2 = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.originalname);
  },
});

// Fungsi filter untuk mengizinkan hanya file gambar
const imageFilter = function (req, file, cb) {
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
    return cb(new Error("Hanya file gambar yang diizinkan"));
  }
  cb(null, true);
};

exports.upload = multer({
  storage: storage2,
  limits: {
    fileSize: 1024 * 1024 * 2, //Max file 2mb
  },
  fileFilter: imageFilter,
});

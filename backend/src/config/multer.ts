import multer from "multer";

// Configuração de Multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/users/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const uploadUsers = multer({ storage });

export default uploadUsers;
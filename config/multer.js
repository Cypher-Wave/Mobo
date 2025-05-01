import multer from "multer";
import path from "path";
import crypto from "crypto";

// Configuração do armazenamento
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/uploads/img/users"); // Pasta onde as imagens vão ser salvas
  },
  filename: (req, file, cb) => {
    // Renomear o arquivo
    const ext = path.extname(file.originalname);
    const randomName = crypto.randomBytes(8).toString("hex");
    const fileName = `${Date.now()}-${randomName}${ext}`;
    cb(null, fileName);
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png/;
    const ext = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mime = allowedTypes.test(file.mimetype);

    if (ext && mime) {
      cb(null, true);
    } else {
      cb(new Error("Somente imagens JPEG, JPG e PNG são permitidas!"));
    }
  }
});

const upload = multer({ storage });

export default upload;

import axios from "axios";
import FormData from "form-data";
import multer from "multer";

const MAX_FILE_SIZE = 1024 * 1024 * 2;

const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: { fileSize: MAX_FILE_SIZE },
  fileFilter: (req, file, cb) => {
    if (file.mimetype === "image/png") {
      cb(null, true);
    } else {
      cb(new Error("Only PNG files are allowed!"), false);
    }
  },
});

const imgBbUpload = async (fileBuffer) => {
  const form = new FormData();
  form.append("image", fileBuffer.toString("base64"));

  try {
    const res = await axios.post(
      `https://api.imgbb.com/1/upload?key=${process.env.IMGBB_API}`,
      form,
      {
        headers: {
          ...form.getHeaders(),
        },
      }
    );
    return res.data.data.url;
  } catch (error) {
    throw new Error("Failed to upload image to ImgBB");
  }
};

export const fileMiddleware = [
  upload.single("file"),
  async (req, res, next) => {
    try {
      const file = req.file;

      if (!file) {
        return next();
      }

      const imageUrl = await imgBbUpload(file.buffer);

      req.body.imageurl = imageUrl;
      next();
    } catch (error) {
      console.error("Image upload error:", error.message);
      res.status(500).json({ error: error.message });
    }
  },
];

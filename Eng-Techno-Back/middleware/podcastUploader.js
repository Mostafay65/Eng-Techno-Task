import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import AppError from "../utilities/appError.js";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => {
    let folder = "uploads";
    let allowed_formats = [];

    if (file.mimetype.startsWith("image/")) {
      allowed_formats = ["jpg", "jpeg", "png", "heic", "webp", "avif"];
    } else if (file.mimetype.startsWith("audio/")) {
      allowed_formats = ["mp3", "wav", "aac", "ogg", "flac", "m4a"];
    } else {
      throw new AppError("Unsupported file type", 400);
    }

    return {
      folder,
      allowed_formats,
      resource_type: file.mimetype.startsWith("audio/") ? "video" : "image",
    };
  },
});

const podcastUploader = multer({
  storage,
  limits: { fileSize: 50 * 1024 * 1024 }, // max 50MB
  fileFilter: (req, file, cb) => {
    const isImage = file.mimetype.startsWith("image/");
    const isAudio = file.mimetype.startsWith("audio/");
    if (!isImage && !isAudio) {
      return cb(new AppError("Only image and audio files are allowed!", 400), false);
    }
    cb(null, true);
  },
});

export default podcastUploader;
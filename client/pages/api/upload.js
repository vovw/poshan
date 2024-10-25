// pages/api/upload.js
import cloudinary from "cloudinary";

cloudinary.config({
  cloud_name: "davjxk2zv",
  api_key: 933742996629357,
  api_secret: "o6O9rboD3P9qM4VQNXk0cVkXAA0",
});

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const { imageData } = req.body;

      const response = await cloudinary.v2.uploader.upload(imageData, {
        upload_preset: "q6pn4t5y", // Use your actual unsigned upload preset
      });

      res.status(200).json({ imageUrl: response.secure_url });
    } catch (error) {
      res.status(500).json({ error: "Error uploading image" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}

import express from "express";
import podcastUploader from "../middleware/podcastUploader.js";
import { createPodcast, getAllPodcasts, getPodcast, deletePodcast } from "../controllers/podcast.controller.js";

const router = express.Router();

// POST: create podcast (with image and audio upload)
router.post(
    "/",
    podcastUploader.fields([{ name: "image", maxCount: 1 }, { name: "audio", maxCount: 1 }]),
    createPodcast
);

// GET: all podcasts
router.get("/", getAllPodcasts);

// GET: one podcast by id
router.get("/:id", getPodcast);

// DELETE: podcast by id
router.delete("/:id", deletePodcast);

export default router;

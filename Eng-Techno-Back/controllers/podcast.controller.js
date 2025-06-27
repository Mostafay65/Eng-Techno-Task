import Podcast from "../models/podcast.model.js";
import filterBody from "../utilities/filterBody.js";
import AppError from "../utilities/appError.js";
import catchAsync from "../utilities/catchAsync.js";

// POST /podcasts
export const createPodcast = catchAsync(async (req, res, next) => {
    if (!req.body || !req.body.title || !req.body.author || !req.body.description) {
        return next(new AppError("Title, author, and description are required.", 400));
    }
    const filteredBody = filterBody(req.body, "title", "author", "description");

    if (!req.files || !req.files.image || !req.files.audio) {
        return next(new AppError("Image and audio files are required.", 400));
    }
    const imageUrl = req.files.image[0].path;
    const audioUrl = req.files.audio[0].path;

    const podcast = await Podcast.create({
        ...filteredBody,
        image: imageUrl,
        audio: audioUrl,
    });
    res.status(201).json({ status: "success", data: podcast });
});

// GET /podcasts
export const getAllPodcasts = catchAsync(async (req, res, next) => {
    const podcasts = await Podcast.find();
        res.status(200).json({
            status: "success",
            results: podcasts.length,
            data: podcasts,
    });
});

// GET /podcasts/:id
export const getPodcast = catchAsync(async (req, res, next) => {
    const podcast = await Podcast.findById(req.params.id);
    if (!podcast) return next(new AppError("Podcast not found", 404));
    res.status(200).json({ status: "success", data: podcast });
});

// DELETE /podcasts/:id
export const deletePodcast = catchAsync(async (req, res, next) => {
    const podcast = await Podcast.findByIdAndDelete(req.params.id);
    if (!podcast) return next(new AppError("Podcast not found", 404));
    res.status(204).json({ status: "success", data: null });
});

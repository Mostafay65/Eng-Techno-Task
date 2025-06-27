import mongoose from "mongoose";

const podcastSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, "Podcast must have a title."],
        },
        author: {
            type: String,
            required: [true, "Podcast must have an author."],
        },
        audio: {
            type: String,
            required: [true, "Podcast must have an audio."],
        },
        image: {
            type: String,
            required: [true, "Podcast must have an image."],
        },
        description: {
            type: String,
            required: [true, "Podcast must have a description."],
        },
    },
    {
        timestamps: true,
    }
);

export default mongoose.model("Podcast", podcastSchema);

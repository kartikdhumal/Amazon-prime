import mongoose from "mongoose";

const showSchema = new mongoose.Schema({
    poster: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    genre: {
        type: String,
        required: true,
    },
    limit: {
        type: Number,
        required: true,
    },
    isSeries: {
        type: Boolean,
        required: true,
    },
    seasons: [{
        episodes: [{
            video: {
                type: String,
                required: true,
            },
            description: {
                type: String,
                required: true,
            },
            duration: {
                type: Number,
                required: true,
            },
        }],
        trailer: {
            type: String,
            required: true,
        },
        year: {
            type: Number,
            required: true,
        },
    }],
    castMembers: [{
        image: {
            type: String,
            required: false,
        },
        reelName: {
            type: String,
            required: false,
        },
        realName: {
            type: String,
            required: false,
        },
    }],
}, { timestamps: true });

const Show = mongoose.model("Show", showSchema);
export default Show;

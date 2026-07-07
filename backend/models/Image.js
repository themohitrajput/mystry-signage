const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema(
    {
        filename: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            index: true,
        },
        contentType: {
            type: String,
            required: true,
        },
        data: {
            type: Buffer,
            required: true,
        },
        size: {
            type: Number,
            default: 0,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('Image', imageSchema);

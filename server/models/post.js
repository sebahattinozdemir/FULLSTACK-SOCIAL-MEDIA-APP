const mongoose = require('mongoose')
const {ObjectId} = require("mongodb");

const PostSchema = new mongoose.Schema({
        userId: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            max:50
        },
        img : {
            type: String,
        },
        likes : {
            type: Array,
            default: []
        }
    },
    {timestamps: true}
)

module.exports = mongoose.model('Post', PostSchema)
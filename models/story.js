const mongoose = require('mongoose')
const Schema = mongoose.Schema

const storySchema = new Schema({
    title: String,
    storyBlock: String,
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },

    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Review'
        }
    ],
    avgRating: Number
})

module.exports = mongoose.model('Story', storySchema)
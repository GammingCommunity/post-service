const mongoose = require('mongoose');
const { paginate } = require('mongoose-paginate-v2');

const opts = { toJSON: { virtuals: true } };

const post = mongoose.Schema({
    user_id: String,
    title: String,
    content: String,
    media: {
        default: "",
        type: String
    },
    tag: [
        String
    ],
    created_time: {
        default: Date.now,
        type: Date
    },
    reactions: [
        {
            user_id: String,
            reaction_type: String
        }
    ],

    permission: {
        type: String,
        default: "open"
    }

}, opts)
const commentSchema = mongoose.Schema({
    user_id: String,
    content: String,
    media: {
        type: String,
        default:""
    },
    reactions: [
        {
            user_id: String,
            reaction_type: String
        }
    ],
    created_time: {
        default: Date.now,
        type: Date
    },
}, opts)
commentSchema.add({
    comments: [
        {
            commentSchema
        }
    ],
})
post.add({
    comments: [
        commentSchema
    ]
})
commentSchema.virtual('comment_id').get(function () {
    return this._id;
});
post.virtual('post_id').get(function () {
    return this._id;
})

module.exports = mongoose.model('post', post);
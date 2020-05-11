const mongoose = require('mongoose');
const mongooseLeanVirtuals = require('mongoose-lean-virtuals');
const { paginate } = require('mongoose-paginate-v2');

//const opts = { toJSON: { virtuals: true } };

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

})
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
})
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
commentSchema.plugin(mongooseLeanVirtuals);

post.virtual('post_id').get(function () {
    return this._id;
});
post.plugin(mongooseLeanVirtuals);

module.exports = mongoose.model('post', post);
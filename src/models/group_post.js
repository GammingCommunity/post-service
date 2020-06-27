const mongoose = require('mongoose');
const mongooseLeanVirtuals = require('mongoose-lean-virtuals');
const mongoosePaginate = require('mongoose-paginate-v2');
var aggregatePaginate = require('mongoose-aggregate-paginate-v2');

const opts = { toJSON: { virtuals: true } };

const postGroup = mongoose.Schema({
    groupID: String,
    approvedFirst: {
        type: Boolean,
        default: false
    },
    exceptMember: [
        String
    ]
}, opts)

const postSchema = mongoose.Schema({
    user_id: String,
    title: String,
    content: String,
    postType: String,
    
    media: {
        default: [],
        type: [String]
    },
    tag: [
        String
    ],
    isPinned: {
        default: false,
        type: Boolean
    },
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
        default: "public"
    },

    status: {
        type: String,
        default: "approved"
    }
})

const pollSchema = mongoose.Schema({
    user_id:String,
    pollQuestion: {
        type: String,
        default:""
    },
    tags: [String],
    isPinned: {
        type: Boolean,
        default:false
    },
    permission: {
        type: String,
        default: "public"
    },
    pollChoices: [
        {
            pollTitle: {
                type: String,
                default:""
            },
            votedMember: [
                String
            ]
        }
    ],
    pollLength: {
        type: Number,
        default:1
    },
    created_time: {
        default: Date.now,
        type: Date
    },
    status: {
        type: String,
        default:"approved"
    }
})

const commentSchema = mongoose.Schema({
    user_id: String,
    content: String,
    tags:[String],
    media: {
        type: String,
        default: ""
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
    status: {
        type: String,
        default:"normal"
    }
}, opts)


postGroup.add({
    posts: [postSchema],
    polls:[pollSchema]
})

postSchema.add({
    comments: [
        {
            commentSchema
        }
    ],
})

commentSchema.add({
    comments: [
        {
            commentSchema
        }
    ],
})
commentSchema.virtual('comment_id').get(function () {
    return this._id;
});
commentSchema.virtual('count_reaction').get(function () {
    return this.reactions.length
})
commentSchema.plugin(mongooseLeanVirtuals);
postGroup.plugin(mongoosePaginate);
postGroup.plugin(aggregatePaginate);

//post.plugin(mongooseLeanVirtuals);

module.exports = mongoose.model('postGroup', postGroup);
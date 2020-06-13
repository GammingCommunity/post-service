const postInput = require('./post_Input');
const postSchema = require('./post_Schema');
const postType = require('./post_type');
module.exports = function () {
    return [
        postSchema, postInput, postType
    ]
}
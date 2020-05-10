const postInput = require('./post_Input');
const postSchema = require('./post_Schema');
const postType = require('./post_type');
const postEnum = require('./post_enum');
module.exports = function () {
    return [
        postSchema, postInput, postType, postEnum
    ]
}
const groupPostInput = require('./groupPost.input');
const groupPostSchema = require('./groupPost.schema');
const groupPostType = require('./groupPost.type');
const groupPostEnum = require('./groupPost.enum');
module.exports = function () {
    return [
        groupPostSchema, groupPostInput, groupPostType, groupPostEnum
    ]
}
const groupPostInput = require('./groupPost.input');
const groupPostSchema = require('./groupPost.schema');
const groupPostType = require('./groupPost.type');
module.exports = function () {
    return [
        groupPostSchema, groupPostInput, groupPostType
    ]
}
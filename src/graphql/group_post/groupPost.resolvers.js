const groupPostController = require('./groupPost.controller');
const { onError, onSuccess } = require('../../utils/error_handle');
var groupPostCtrl = new groupPostController();

module.exports = groupPostResolvers = {
    Query: {
        fetchGroupPost: async (root,{groupID},ctx) => {
            
        }
    },
    Mutation: {
        createGroupPost: async (root, { info }, ctx) => {
            
        }
    }   
}
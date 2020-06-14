const PostController = require('./post_controller');
const { onError, onSuccess } = require('../../utils/error_handle');
const getUserID = require('../../utils/getUserID');
const _ = require('lodash');
var postController = new PostController();
module.exports = postResolvers = {
    Query: {
        fetchPost: async (_, { users }) => {
            return await postController.fetchPost(users)
        },
        fetchComment: async (_, { postID }) => {
            return await postController.fetchComment(postID);
        }
    },
    Mutation: {
        createPost: async (root, { postInfo },ctx) => {
            var accountID = getUserID(ctx);
            var info = _.assign({}, postInfo, { user_id: accountID });
            var result = await postController.createPost(info);
            return result ? onSuccess("Post add success!") : onError("fail", "Post add failed!");
            
        },
        removePost: async (_, { postID }) => {
            var result = await postController.removePost(postID);
            return result ? onSuccess("Remove post success!") : onError("fail", "Remove post failed!");

        },
        addComment: async (_, { postID,commentInfo }) => {
            var result = await postController.addComment(postID, commentInfo);
            return result ? onSuccess("Add comment success!") : onError("fail", "Add comment failed!");   
        },
        reaction: async (_, {to,type,userID,postID,commentID }) => {
            
            var result = await postController.reaction(to, userID,postID, commentID, type);
            return result ? onSuccess("Reaction success!") : onError("fail", "Reaction failed!");

        }
    }
}
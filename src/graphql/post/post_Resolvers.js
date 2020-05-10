const PostController = require('./post_controller');
const {onError,onSuccess } = require('../../utils/error_handle');
var postController = new PostController();
module.exports = postResolvers = {
    Query: {
        fetchPost: async (_, { userID }) => {
            return await postController.fetchPost(userID)
        }
    },
    Mutation: {
        addPost: async (_, { postInfo }) => {

            var result = await postController.addPost(postInfo);
            return result ? onSuccess("Post add success!") : onError("fail", "Post add failed!");
            
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
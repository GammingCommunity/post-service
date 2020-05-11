const Post = require('../../models/post');
class PostController {

    // query

    async fetchPost(users) {
        var result = await Post.find({ "user_id": users });
        return JSON.parse(JSON.stringify(result))

    }

    // mutation

    async createPost(info) {
        console.log(info);
        var result = await Post.create(info);
        if (result == null) {
            return false;
        }
        return true;
    }
    async addComment(postID, commentInfo) {
        var result = await Post.findOneAndUpdate({ "_id": postID }, { $push: { "comments": commentInfo } });
        if (result == null) {
            return false;
        }
        else {
            return true;
        }
    }
    async reaction(to, userID, postID, commentID, type) {
        var react = {
            user_id: userID,
            reaction_type: type
        }
        switch (to) {
            case "post":
                
                var result = await Post.findOneAndUpdate({ "_id": postID }, { $push: { "reactions": react } });

                if (result == null) {
                    return false;
                }
                else {
                    return true;
                }

            case "comment":
                var result = await Post.findOneAndUpdate({ "comments._id": commentID }, {
                    $push: { "comments.$.reactions": react }
                })
                console.log(result);
                
                if (result == null) {
                    return false;
                }
                else {
                    return true;
                }
            default: return false;
        }

    }
}

module.exports = PostController;
const Post = require('../../models/post');
const _ = require('lodash');

class PostController {

    // query

    async fetchPost(users) {
        try {
            var result = await Post.find({ "user_id": users })
            var newResult = JSON.parse(JSON.stringify(result))
           var mapped =
               _.map(newResult, (val) => {
                    var countCmt = _.get(val, "comments").length;
                    var countReact = _.get(val, "reactions").length;
                    return _.assign({}, val, { "countReaction": countReact, "countComment": countCmt });
                })

            return mapped
        } catch (error) {
            console.log(error);

        }

    }
    async fetchComment(postID) {
        var result = await Post.findById(postID).select('comments reactions');
        var newResult = JSON.parse(JSON.stringify(result))
        var comments = _.get(newResult, "comments");
        
     /*  var mapped =
            _.map(newResult, (val) => {
                
                var countCmt = _.get(val, "comments").length;
                var comments = _.get(val, "comments");

                console.log(countCmt, countReact);
                return _.assign({}, val, { "countReaction": 0, "countComment": countCmt });
            })
        */
        console.log(newResult);
        
        return newResult;
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
    async removePost(postID) {
        var result = await Post.findOneAndRemove({ "_id": postID });        
        return result != null ? true : false; 
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
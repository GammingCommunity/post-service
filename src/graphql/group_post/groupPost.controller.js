const groupPost = require('../../models/group_post');
const mongoose = require('mongoose').Types;
const _ = require('lodash');
const { onError, onSuccess } = require('../../utils/error_handle');

class GroupPostController {

    async isNeedApproved(groupID, userID) {
        var result = await groupPost.find({ "groupID": groupID, "exceptMember": { $in: [userID] } });
        return result.length > 0 ? false : true;
    }

    async fetchGroupPost(groupID, page, limit) {

        var postPaginate = groupPost.aggregate([
            {
                $match: { "groupID": groupID },
            }
            , {
                $limit: limit
            },
            { $skip: page <= 1 ? 0 : (page * 10 - 10) },
            {
                $project: {
                    posts: {
                        $filter: {
                            input: '$posts',
                            as: 'item',
                            cond: { $eq: ["$$item.status", "approved"] }
                        },
                    },
                }
            },
        ]);
        return (await groupPost.aggregatePaginate(postPaginate, { limit: limit, page: page })).docs;
    }
    async fetchGroupPoll(groupID, page, limit) {

        var postPaginate = groupPost.aggregate([
            {
                $match: { "groupID": groupID },
            }
            , {
                $limit: limit
            },
            { $skip: page <= 1 ? 0 : (page * 10 - 10) },
            {
                $project: {
                    posts: {
                        $filter: {
                            input: '$polls',
                            as: 'item',
                            cond: { $eq: ["$$item.status", "approved"] }
                        },
                    },
                }
            },
        ]);
        return (await groupPost.aggregatePaginate(postPaginate, { limit: limit, page: page })).docs;
    }
    async fetchPendingPosts(groupID, page, limit) {
        return groupPost.aggregate([
            {
                $match: { "groupID": groupID }
            },
            { $skip: page <= 1 ? 0 : (page * 10 - 10) },
            { $limit: limit },
            {
                $project: {
                    posts: {
                        $filter: {
                            input: '$posts',
                            as: 'item',
                            cond: { $eq: ["$$item.status", "not_approved"] }
                        },
                    },
                }
            },

            /*{
                $addFields: {
                    combinePost: { $concatArrays: ["$posts", "$polls"] }
                }
            },
            {
                $group: {
                    _id: new mongoose.ObjectId(groupID),
                    groupPost: { $push: "$combinePost" },
                }
            },*/
            /*  {
                  $group: {
                      _id: new mongoose.ObjectId(groupID),
                      groupPost: { $push: { posts: "$posts", polls: "$polls" } },
                  }
              },*/
            /*{
                $group: {
                    _id: new mongoose.ObjectId(groupID),
                    posts: { $setUnion: ["$posts", "$polls"] }
                    //polls: {  }
                }
            },*/

        ])
    }
    async fetchPendingPolls(groupID, page, limit) {
        return groupPost.aggregate([
            {
                $match: { "groupID": groupID }
            },

            { $skip: page <= 1 ? 0 : (page * 10 - 10) },
            { $limit: limit },
            {
                $project: {

                    polls: {
                        $filter: {
                            input: '$polls',
                            as: 'item',
                            cond: { $eq: ["$$item.status", "not_approved"] }
                        },
                    }
                }

            },

            /*{
                $addFields: {
                    combinePost: { $concatArrays: ["$posts", "$polls"] }
                }
            },
            {
                $group: {
                    _id: new mongoose.ObjectId(groupID),
                    groupPost: { $push: "$combinePost" },
                }
            },*/
            /*  {
                  $group: {
                      _id: new mongoose.ObjectId(groupID),
                      groupPost: { $push: { posts: "$posts", polls: "$polls" } },
                  }
              },*/
            /*{
                $group: {
                    _id: new mongoose.ObjectId(groupID),
                    posts: { $setUnion: ["$posts", "$polls"] }
                    //polls: {  }
                }
            },*/

        ])
    }
    async initGroupPost(groupID, approvedFirst, userID) {
        return groupPost.create({ "groupID": groupID, "approvedFirst": approvedFirst, "exceptMember": [userID] });
    }

    async createGroupPoll(groupID, pollInfo, userID) {
        console.log("poll info", pollInfo);
        var needApproved = await this.isNeedApproved(groupID, userID);
        if (needApproved) {
            var newpollInfo = _.assign({}, pollInfo, { status: "not_approved" });
            return groupPost.findOneAndUpdate({ "groupID": groupID }, { $push: { "polls": newpollInfo } }).then((v) => {
                return onSuccess("Create poll success! Wait for approved.")
            }).catch((err) => {
                return onError('fail', "Create poll fail");
            });
        } else {
            return groupPost.findOneAndUpdate({ "groupID": groupID }, { $push: { "polls": pollInfo } }).then((v) => {
                return onSuccess("Create poll success!")
            }).catch((err) => {
                return onError('fail', "Create poll fail");
            });
        }


    }

    async createGroupPost(groupID, info, userID) {
        console.log("post info", info);
        var needApproved = await this.isNeedApproved(groupID, userID);
        if (needApproved) {
            var newInfo = _.assign({}, info, { status: "not_approved" });
            return groupPost.findOneAndUpdate({ "groupID": groupID }, { $push: { "posts": newInfo } }).then((v) => {
                return onSuccess("Create post success! Wait for approved.")
            }).catch((err) => {
                return onError('fail', "Create post fail");
            });
        }
        return groupPost.findOneAndUpdate({ "groupID": groupID }, { $push: { "posts": info } }).then((v) => {
            return onSuccess("Create post success!")
        }).catch((err) => {
            return onError('fail', "Create post fail");
        });

    }

    async reactPost(groupID, postID, reactionInfo) {
        return groupPost.findOneAndUpdate(
            {
                $and: [{ "posts._id": new mongoose.ObjectId(postID) }, { "groupID": groupID }]
            },
            {
                $push: { "posts.$.reactions": reactionInfo }
            }
        )
    }
    async commentPost(groupID, postID, commentInfo) {
        var result = await groupPost.findOneAndUpdate(
            {
                $and: [{ "posts._id": new mongoose.ObjectId(postID) },
                { "groupID": groupID }]
            },
            {
                $push: { "posts.$.comments": commentInfo }
            }
        )
        if (result.ok) {
            return onSuccess("Reaction success!")
        }
        return onError('fail', "Has a error. Reaction fail")
    }
    async votePoll(groupID, pollID, choiceID, userID) {
        
        /*var result = await groupPost.aggregate([
            { $match: { "groupID": groupID } },
            {$unwind:"$polls"},
            { $match: { "polls._id": new mongoose.ObjectId(pollID) } },
            { $unwind: "$polls.pollChoices" },
            { $push: {"polls.pollChoices._id":new mongoose.ObjectId(choiceID)}}
            
            
        ])*/
        var result = await groupPost.findOneAndUpdate(
            {
                "groupID": groupID,
                "polls._id": new mongoose.ObjectId(pollID),
                "polls.pollChoices._id": new mongoose.ObjectId(choiceID)
            },
            {
                $push: { "polls.$.pollChoices.$[].votedMember": userID },
            }
            
        )
        console.log(result.ok);
        
         if (result.ok) {
             return onSuccess("Vote success!")
         }
         return onError('fail', "Has a error. Vote fail")

    }
    async unVotePoll(groupID, pollID, choiceID, userID) {
        var result = await groupPost.findOneAndUpdate(
            {
                "groupID": groupID,
                "polls._id": new mongoose.ObjectId(pollID),
                "polls.pollChoices._id": new mongoose.ObjectId(choiceID)
            },
            {
                $push: { "polls.$.pollChoices.$[].votedMember": userID },
            }
        )
        if (result.ok) {
            return onSuccess("Unvote success!")
        }
        return onError('fail', "Has a error. Unvote fail")
    }
}
module.exports = GroupPostController;
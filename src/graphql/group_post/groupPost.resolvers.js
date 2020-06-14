const _ = require('lodash');
const groupPostController = require('./groupPost.controller');
const { onError, onSuccess } = require('../../utils/error_handle');
const getAccountID = require('../../utils/getUserID');
var groupPostCtrl = new groupPostController();

module.exports = groupPostResolvers = {
    Query: {
        fetchGroupPost: async (root, { groupID,page,limit},ctx) => {
            var result = await groupPostCtrl.fetchGroupPost(groupID, page, limit);
            return result[0];
            
        },
        fetchGroupPoll: async (root, { groupID, page, limit }, ctx) => {
            var result = await groupPostCtrl.fetchGroupPoll(groupID, page, limit);
            return result[0];
        },
        // for host
        fetchPendingPosts: async (root, { groupID,page,limit }, ctx) => {
            var result = await groupPostCtrl.fetchPendingPosts(groupID, page, limit);
            
            return result[0];
        },
        fetchPendingPolls: async (root, { groupID, page, limit }, ctx) => {
            var result = await groupPostCtrl.fetchPendingPolls(groupID, page, limit);

            return result[0];
        }
    },
    Mutation: {
        initGroupPost: async (root, { groupID, approveFirst }, ctx) => {
            var accountID = getAccountID(ctx);
            try {
                await groupPostCtrl.initGroupPost(groupID, approveFirst, accountID);
                return onSuccess("Init success!")
            } catch (error) {
                console.log(error);
                return onError('fail', "Init fail!")
            }
        },

        createGroupPoll: async (root, { groupID, pollInfo }, ctx) => {
            var accountID = getAccountID(ctx);
            var newPollInfo = _.assign({}, pollInfo, { "user_id": accountID });

            return await groupPostCtrl.createGroupPoll(groupID, newPollInfo, accountID);

        },
        createGroupPost: async (root, { groupID,userOptions,info }, ctx) => {
            var accountID = getAccountID(ctx);
            var userPostInfo = _.assign({}, info, { user_id: accountID });
            
            return await groupPostCtrl.createGroupPost(groupID, userPostInfo, accountID);
            
        },
        approvedPost: async (root, { groupID, postID }, ctx) => {
            
        },

        reactionGroupPost: async (root, { groupID, postID, reactType }, ctx) => {
            var accountID = getAccountID(ctx);
            var reactionInfo = {
                "user_id": accountID,
                "reaction_type": reactType
            }

            return await groupPostCtrl.reactPost(groupID,postID,reactionInfo)
            
        },
        votePoll: async (root, { groupID, pollID, choiceID }, ctx) => {
            var accountID = getAccountID(ctx);
            console.log(groupID, pollID, choiceID, accountID);
            
            return await groupPostCtrl.votePoll(groupID, pollID, choiceID, accountID);
        },
        unVotePoll: async (root, { groupID, pollID, choiceID }, ctx) => {
            var accountID = getAccountID(ctx);
            console.log(groupID, pollID, choiceID, accountID);

            return await groupPostCtrl.votePoll(groupID, pollID, choiceID, accountID);
        }
    }   
}
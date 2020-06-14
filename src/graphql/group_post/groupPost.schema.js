const { gql } = require('apollo-server');
module.exports = typeDef = gql`
    type GroupPostDetail{
        group_id:ID
        posts:[UserPostType]
        polls:[PollPostType]
    }
    type GroupPost{
        posts:[UserPostType]
    }

    type GroupPoll{
        polls:[PollPostType]
    }

    extend type Query{
        fetchGroupPost(groupID:String!,page:Int!,limit:Int!):GroupPost
        fetchGroupPoll(groupID:String!,page:Int!,limit:Int!):GroupPoll
        fetchPendingPosts(groupID:String!,page:Int!,limit:Int!):GroupPost
        fetchPendingPolls(groupID:String!,page:Int!,limit:Int!):GroupPoll
    }
    extend type Mutation{
        initGroupPost(groupID:String!,approveFirst:Boolean!):CRUDResult
        createGroupPost(
            groupID:String!,
            userOptions:PostOptionInput,
            info:GroupPostInput!
            ):CRUDResult
        reactionGroupPost(groupID:String!,postID:String!,reactType:ReactTypeEnum):CRUDResult
        createGroupPoll(groupID:String!,pollInfo:PollInput!):CRUDResult
        votePoll(groupID:String!, pollID:String!, choiceID:String!):CRUDResult
        unVotePoll(groupID:String!, pollID:String!, choiceID:String!):CRUDResult
        approvedPost(groupID:String!, postID:String!):CRUDResult
    }

`
const { gql } = require('apollo-server');
module.exports = typeDefs = gql`
    input GroupPostInput{
        title:String!,
        content:String!,
        media:String,
        isPinned:Boolean
        tag:[String]
        permission:PermissionEnum!
    }
    input PollInput{
        pollQuestion:String!
        tags:[String]
        isPinned:Boolean
        permission:PermissionEnum!
        pollChoices:[PollOptionInput]!
        pollLength:Int!
    }
    input PollOptionInput{
        pollTitle:String!
        pollVoted:Int
    }
    input PostOptionInput{
        disabledComment:Boolean
    }
`
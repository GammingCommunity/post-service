const { gql } = require('apollo-server');
module.exports = typeDefs = gql`
    type UserPostType{
        _id:ID
        user_id:String
        title:String
        content:String
        media:String,
        tag:[String],
        reactions:[
            Reaction
        ],
        permission:PermissionEnum,
        created_time:Date
        comments:[
            Comment
        ]
        countComment:Int
        countReaction:Int
    }
    type PollPostType{
        _id:ID
        pollQuestion: String,
        tags: [String],
        isPinned: Boolean,
        permission: PermissionEnum,
        pollLength: Int,
        status: statusEnum,
        pollChoices: [pollChoiceType],
        user_id: String,
        created_time: Date
    }
    type pollChoiceType{
        pollTitle:String!
        pollVoted:Int
    }

    
`
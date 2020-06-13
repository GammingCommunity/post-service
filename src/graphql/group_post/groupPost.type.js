const { gql } = require('apollo-server');
module.exports = typeDefs = gql`
    type UserPostType{
        user_id:String
        title:String
        content:String
        media:String,
        tag:[String],
        reactions:[
            Reaction
        ],
        permission:permissionEnum,
        created_time:Date
        comments:[
            Comment
        ]
        countComment:Int
        countReaction:Int
    }
`
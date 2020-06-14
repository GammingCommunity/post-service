const { gql } = require('apollo-server');
module.exports= typeDefs = gql`
    input PostInput {
        user_id:String
        title:String!,
        content:String!,
        media:String,
        tag:[String]
        permission:PermissionEnum!
        
    },
    input CommentInput{
        user_id:String!
        content:String!
        media:String
    }
`
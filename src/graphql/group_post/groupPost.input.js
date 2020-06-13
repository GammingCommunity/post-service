const { gql } = require('apollo-server');
module.exports = typeDefs = gql`
    input GroupPostInput{
        user_id:String!
        title:String!,
        content:String!,
        media:String,
        tag:[String]
        permission:PermissionEnum!
    }
`
const { gql } = require('apollo-server');
module.exports = typeDef = gql`
    type GroupPost{
        group_id:ID!
        posts:[UserPostType]
    }
    extend type Query{
        fetchGroupPost(groupID:String!):[GroupPost]

    }
    extend type Mutation{
        createGroupPost(groupID:String!,info:GroupPostInput):CRUDResult
    }

`
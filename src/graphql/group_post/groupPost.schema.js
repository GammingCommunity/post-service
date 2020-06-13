const { gql } = require('apollo-server');
module.exports = typeDef = gql`
    type GroupPost{
        group_id:ID!
        posts:[UserPostType]
    }
    type Query{
        fetchGroupPost(groupID:String!):[GroupPost]

    }
    type Mutation{
        createGroupPost(groupID:String!,info:GroupPostInput):ResultCRUD
    }

`
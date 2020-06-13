const { gql } = require('apollo-server');
module.exports = typeDef = gql`
    type GroupPost{
        group_id:ID!
        posts:[UserPostType]
    }

`
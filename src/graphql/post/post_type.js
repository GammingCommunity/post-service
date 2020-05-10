const { gql } = require('apollo-server');
module.exports= typeDefs = gql`
    type reactionType{
        user_id:String
        reaction_type:String
    }
    type commentType{
        comment_id:String
        user_id: String
        content: String
        media: String
        reactions: [
            reactionType
        ],
        created_time: Date
    }

`
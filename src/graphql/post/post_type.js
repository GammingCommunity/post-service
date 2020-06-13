const { gql } = require('apollo-server');
module.exports= typeDefs = gql`
    type Reaction{
        user_id:String
        reaction_type:ReactTypeEnum
    }
    type Comment{
        comment_id:String
        user_id: String
        content: String
        media: String
        reactions: [
            Reaction
        ],
        count_reaction:Int
        created_time: Date
    }

`
const { gql } = require('apollo-server');
module.exports = typeDef = gql`
    type Post{
        _id:ID!
        title:String
        content:String
        media:String,
        tag:[String],
        reactions:[
            reactionType
        ],
        permission:permissionEnum,
        created_time:Date
        comments:[
            commentType
        ]
        countComment:Int
        countReaction:Int

    }
    
    type Query{
        fetchPost(users:[String]):[Post]
    }
    type Mutation{
        createPost(postInfo:PostInput):CRUDResult
        addComment(postID:String,commentInfo:CommentInput):CRUDResult
        reaction(to:reactToEnum,type:react_type,userID:String!,postID:String,commentID:String):CRUDResult
    }
`

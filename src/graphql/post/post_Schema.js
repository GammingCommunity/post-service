const { gql } = require('apollo-server');
module.exports = typeDef = gql`
    type Post{
        post_id:ID!
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
    }
    
    type Query{
        fetchPost(userID:[String]):[Post]
    }
    type Mutation{
        createPost(postInfo:PostInput):CRUDResult
        addComment(postID:String,commentInfo:CommentInput):CRUDResult
        reaction(to:reactToEnum,type:react_type,userID:String!,postID:String,commentID:String):CRUDResult
    }
`

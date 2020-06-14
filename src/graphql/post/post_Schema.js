const { gql } = require('apollo-server');
module.exports = typeDef = gql`
    type Post{
        post_id:ID!
        title:String
        content:String
        media:String,
        tag:[String],
        reactions:[
            Reaction
        ],
        permission:PermissionEnum,
        created_time:Date
        comments:[
            Comment
        ]
        countComment:Int
        countReaction:Int
    }
    
    type Query{
        fetchPost(users:[String]):[Post]
        fetchComment(postID:ID):Post
    }
    type Mutation{
        createPost(postInfo:PostInput):CRUDResult
        removePost(postID:String!):CRUDResult
        addComment(postID:String!,commentInfo:CommentInput):CRUDResult
        reaction(to:ReactToEnum,type:ReactTypeEnum,reactID:String!,postID:String,commentID:String):CRUDResult
    }
`

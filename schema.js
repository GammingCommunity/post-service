const PostModule = require('./src/graphql/post/post_module');
const PostResolvers = require('./src/graphql/post/post_Resolvers');
const GroupPostModule = require('./src/graphql/group_post/groupPost.module');
const GroupPostResolvers = require('./src/graphql/group_post/groupPost.resolvers')
const CRUDResult = require('./src/graphql/mutation/crud_result')
const CustomScalar = require('./src/graphql/custom_scalar');
const Enum = require('./src/graphql/enum');
const {makeExecutableSchema } = require('apollo-server');
const schema = makeExecutableSchema({
    
    typeDefs: [
        Enum,
        CRUDResult,
        CustomScalar,
        PostModule,
        GroupPostModule
    ],

    resolvers:
        [PostResolvers, GroupPostResolvers],

});
module.exports = schema;
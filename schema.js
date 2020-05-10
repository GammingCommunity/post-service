const PostModule = require('./src/graphql/post/post_module');
const PostResolvers = require('./src/graphql/post/post_Resolvers');

const CRUDResult = require('./src/graphql/mutation/crud_result')
const CustomScalar = require('./src/graphql/custom_scalar');
const {makeExecutableSchema } = require('apollo-server');
const schema = makeExecutableSchema({
    
    typeDefs: [
        CRUDResult,
        CustomScalar,
        PostModule
    ],

    resolvers:
        [PostResolvers],

});
module.exports = schema;
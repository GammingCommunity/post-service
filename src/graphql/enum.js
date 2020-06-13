const { gql } = require('apollo-server');
module.exports = typeDefs = gql`
    enum PermissionEnum{
        open
        closed
        public
        private
    }
    enum ReactToEnum{
        post
        comment
    }
    enum ReactTypeEnum{
        like
        heart
    }
`
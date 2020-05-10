const { gql } = require('apollo-server');
module.exports = typeDefs = gql`
    enum permissionEnum{
        open
        closed
        public
        private
    }
    enum reactToEnum{
        post
        comment
    }
    enum react_type{
        like
        heart
    }
`
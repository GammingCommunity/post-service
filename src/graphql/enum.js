const { gql } = require('apollo-server');
module.exports = typeDefs = gql`
    enum statusEnum{
        lock
        approved
        not_approved
        normal
    }
    enum PermissionEnum{
        open
        closed
        public
        private
    }
    enum postTypeEnum{
        normal
        poll
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
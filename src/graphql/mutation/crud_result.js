const { gql } = require('apollo-server');
module.exports = typeDef = gql`
  type CRUDResult{
        status:Int
        payload:String
        success:Boolean!
        message:String!
        
    }
  
`;
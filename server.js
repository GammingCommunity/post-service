const { ApolloServer } = require('apollo-server-express');
const { MemcachedCache } = require('apollo-server-cache-memcached')
const mongoose = require('mongoose');
const cors = require('cors');
const { createServer } = require('http');
const express = require('express');
const checkSession = require('./middleware/checkSession');
require('dotenv').config();
const Schema = require('./schema');
const server = new ApolloServer({
    cors: true,
    schema: Schema,
    playground: true,
    introspection: true,
    persistedQueries: {
        cache: new MemcachedCache(
            ['memcached-server-1', 'memcached-server-2', 'memcached-server-3'],
            { retries: 10, retry: 10000 })
    },

    context: ({ res, req  }) => {
        const errorInfo = {
            "message": "Wrong token!",
            "status": "400"
        }

        var info = JSON.parse(res.info);
        if (info.status != "SUCCESSFUL") {
            return res.json(errorInfo)
        }
        return {
            authInfo: info.data,
        }
    }

});

const port = process.env.PORT || 3000;
const app = express();
const httpServer = createServer(app);
app.use(cors());
app.use(checkSession);
server.applyMiddleware({ app, path: "/graphql" })
server.installSubscriptionHandlers(httpServer);
httpServer.listen(port, () => {
    console.log(`?? Server ready at http://localhost:${port}${server.graphqlPath}`);
    console.log(`?? Subscriptions ready at ws://localhost:${port}${server.subscriptionsPath}`);
    mongoose.Promise = global.Promise;
    mongoose.set('useFindAndModify', false);
    mongoose.set('debug', true);
    mongoose.connect(process.env.db_connection, { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true }, (res, err) => {
        console.log('Connected to MongoDB');
    })

});
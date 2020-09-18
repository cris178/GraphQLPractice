const express = require('express');

//Object for qrahphql that can use express.js
const {graphqlHTTP} = require('express-graphql');

const schema = require('./schema/schema');

//Make app on object of the express class. Instintiation
const app = express();

app.use('/graphql',graphqlHTTP({
    graphiql:true,
    schema: schema
}));

app.listen(4000, ()=>{
    console.log('Listening for requests on my awesome port');
});
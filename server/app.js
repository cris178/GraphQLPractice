const express = require('express');

//Object for qrahphql that can use express.js
const {graphqlHTTP} = require('express-graphql');

//Get mongoose
const mongoose = require('mongoose');

let mongoClient = 'mongodb+srv://cristian:M1passwordhere@cluster0.0nqvx.mongodb.net/Cluster0?retryWrites=true&w=majority';

mongoose.connect(client,{useNewUrlParser : true});
mongoose.connection.once('open',()=>{
    console.log('Yes we are connected to mongoose!');
})
const schema = require('./schema/schema');
const testSchema = require('./schema/types_schema');

/* 
mongodb+srv://cristian:<password>@cluster0.0nqvx.mongodb.net/<dbname>?retryWrites=true&w=majority
*/

//Make app on object of the express class. Instintiation
const app = express();

app.use('/graphql',graphqlHTTP({
    graphiql:true,
    schema: testSchema
}));

app.listen(4000, ()=>{
    console.log('Listening for requests on my awesome port');
});
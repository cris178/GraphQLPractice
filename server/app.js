const express = require('express');

//Object for qrahphql that can use express.js
const {graphqlHTTP} = require('express-graphql');

//Get mongoose
const mongoose = require('mongoose');




const schema = require('./schema/schema');
const testSchema = require('./schema/types_schema');

/* 
mongodb+srv://cristian:<password>@cluster0.0nqvx.mongodb.net/<dbname>?retryWrites=true&w=majority
*/

//Make app on object of the express class. Instintiation
const app = express();


mongoose.connect('',
{
    useNewUrlParser : true,
    useUnifiedTopology: true
});
mongoose.connection.once('open',()=>{
    console.log('Yes we are connected to mongoose!');
})

app.use('/graphql',graphqlHTTP({
    graphiql:true,
    schema: schema
}));

app.listen(4000, ()=>{
    console.log('Listening for requests on my awesome port');
});
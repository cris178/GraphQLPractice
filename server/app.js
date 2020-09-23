const express = require('express');

//Object for qrahphql that can use express.js
const {graphqlHTTP} = require('express-graphql');

//Get mongoose
const mongoose = require('mongoose');

//Either use a local 4000 port or whatever heroku and node js determins should be used in app.listen
const port = process.env.PORT || 4000;




const schema = require('./schema/schema');
const testSchema = require('./schema/types_schema');
const cors = require('cors');

/* 
mongodb+srv://cristian:<password>@cluster0.0nqvx.mongodb.net/<dbname>?retryWrites=true&w=majority
*/

//Make app on object of the express class. Instintiation
const app = express();


mongoose.connect('mongodb+srv://cristian:MATRIXTHUNDER%231@cluster0.0nqvx.mongodb.net/Cluster0?retryWrites=true&w=majority',
{
    useNewUrlParser : true,
    useUnifiedTopology: true
});
mongoose.connection.once('open',()=>{
    console.log('Yes we are connected to mongoose!');
})

app.use(cors());

app.use('/graphql',graphqlHTTP({
    graphiql:true,
    schema: schema
}));

app.listen(port, ()=>{
    console.log('Listening for requests on my awesome port');
});
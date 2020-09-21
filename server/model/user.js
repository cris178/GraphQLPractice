const mongoose = require('mongoose');

const MSchema = mongoose.Schema;

/*
    From our GraphQL UserTyoe
         id: {type:GraphQLID},
        name: {type:GraphQLString},
        age: {type:GraphQLInt},
        job:{type:graphql.GraphQLString},

*/
const userSchema = new MSchema({
    name: String,
    age: Number,
    job: String
});

//Create this model named User from userSchema object we created.
//We didn't have to put id because mongo automatically gives it an id.
module.exports = mongoose.model('User', userSchema);
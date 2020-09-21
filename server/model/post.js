const mongoose = require('mongoose');
const MSchema = mongoose.Schema;

/*
    GraphQL fields for PostType
       id:{type: GraphQLID},
        comments:{type:GraphQLString},
        user:{
*/
const PostSchema = new MSchema({
    comments: String,
    userId: String
});

module.exports = mongoose.model('Post', PostSchema);
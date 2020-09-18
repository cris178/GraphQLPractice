const graphql = require('graphql');
var _ = require('lodash');



const{
    GraphQLObjectType,
    GraphQLID,
    GraphQLString,
    GraphQLInt,
    GraphQLSchema
} = graphql;
//Regularly you can just use them as graphql.GraphQLID but it's easier to make them their own variables to use below.


var usersData = [
    {id: '1', name:"bob", age: 36, job:"Hillbilly"},
    {id: "2", name:"Cristian", age:27, job:"Unemployed"},
    {id:"10", name: "Irelia", age:32, job:"ninja"},
    {id:"15", name:"Yasau", age:29, job:"Samurai"}

];

var hobbiesData = [
    {id: "3", title:"Programming", description:"Uses a computer too much"},
    {id: "4", title:"Writing", description:"Writes stuff"},
    {id: "11", title:"Skate Boarding", description:"Tony Hawking bro"},
    {id: "12", title:"Fashion", description:"Stylish bro"}
];

var PostData = [
    {id: "1", comments:"Hello World!"},
    {id: "6", comments:"Hello NewS!"},
    {id: "4", comments:"Hello phillydelly"},
    {id: "3", comments:"Hello JoJo!"},
]


//create types
const UserType = new GraphQLObjectType({
    name: 'User',
    description:    'Documentation for user...',
    fields: () => ({
        id: {type:GraphQLID},
        name: {type:GraphQLString},
        age: {type:GraphQLInt},
        job:{type:graphql.GraphQLString}
    }) //Data inside user
});

const HobbyType = new GraphQLObjectType({
    name: 'Hobby',
    description: 'Hobby of users',
    fields: () => ({
        id:{type: GraphQLID},
        title: {type: GraphQLString},
        description: {type: GraphQLString}
    })
});


const PostType = new GraphQLObjectType({
    name:'Post',
    description: "Posting data",
    fields: () => ({
        id:{type: GraphQLID},
        comments:{type:GraphQLString}
    })
});

//Root Query
const RootQuery = new GraphQLObjectType({
    name: "RootQueryType",
    description: "Description",
    fields : {
        user: {
            type: UserType,
            args: {id:{type: GraphQLID}}, //What we may want to retrieve from user. How we are going to retrieve. Args what we have to pass in
            resolve(parents,args){//What the query returns
                return _.find(usersData,{id:args.id})
                
            }
        },
        hobby: {
            type: HobbyType,
            args: {id:{type: GraphQLID}},
            resolve(parent,args){ //return data for hobby
                return _.find(hobbiesData, {id:args.id})
            }
        },

        Post:{
            type: PostType,
            args: {id:{type: GraphQLID}},
            resolve(parent,args){
                return _.find(PostData,{id:args.id})
            }
        }
    }
});


//export to the front end
module.exports = new GraphQLSchema({
    query: RootQuery
});
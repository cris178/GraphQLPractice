const graphql = require('graphql');
var _ = require('lodash');



const{
    GraphQLObjectType,
    GraphQLID,
    GraphQLString,
    GraphQLInt,
    GraphQLSchema,
    GraphQLList
} = graphql;
//Regularly you can just use them as graphql.GraphQLID but it's easier to make them their own variables to use below.


var usersData = [
    {id: '1', name:"bob", age: 36, job:"Hillbilly"},
    {id: "2", name:"Cristian", age:27, job:"Unemployed"},
    {id:"10", name: "Irelia", age:32, job:"ninja"},
    {id:"15", name:"Yasau", age:29, job:"Samurai"}

];

var hobbiesData = [
    {id: "3", title:"Programming", description:"Uses a computer too much", userId:'2'},
    {id: "5", title:"Journalism", description:"Enjoys sharing the news", userId:'2'},
    {id: "4", title:"Writing", description:"Writes stuff", userId:'15'},
    {id: "11", title:"Skate Boarding", description:"Tony Hawking bro", userId:'10'},
    {id: "12", title:"Fashion", description:"Stylish bro", userId:'15'}
];

var PostData = [
    {id: "1", comments:"Hello World!", userId: '1'},
    {id: "6", comments:"Hello NewS!", userId: '10'},
    {id: "4", comments:"Hello phillydelly", userId: '15'},
    {id: "3", comments:"Hello JoJo!", userId: '1'},
    {id: "5", comments: "It's a me Cristian!", userId: '2'},
    {id: "7", comments: "Am typing online!", userId: '2'}
]


//create types
const UserType = new GraphQLObjectType({
    name: 'User',
    description:    'Documentation for user...',
    fields: () => ({
        id: {type:GraphQLID},
        name: {type:GraphQLString},
        age: {type:GraphQLInt},
        job:{type:graphql.GraphQLString},
        //What if we want to keep track of all the posts the belong to a user
        //and potentially return them
        posts:{
            type: new GraphQLList(PostType),
            resolve(parent,args){
                return _.filter(PostData,{userId: parent.id}) //filter used for lists
            }
        },
        //Lets keep track of the users hobbies and return them if we want to
        hobbies:{
            type: new GraphQLList(HobbyType),
            resolve(parent,args){
                return _.filter(hobbiesData,{userId: parent.id})
            }
        }
    }) //Data inside user
});

const HobbyType = new GraphQLObjectType({
    name: 'Hobby',
    description: 'Hobby of users',
    fields: () => ({
        id:{type: GraphQLID},
        title: {type: GraphQLString},
        description: {type: GraphQLString},
        user:{
            type: UserType,
            resolve(parent,args){
                return _.find(usersData,{id:parent.userId});
            }
        }
    })
});


const PostType = new GraphQLObjectType({
    name:'Post',
    description: "Posting data",
    fields: () => ({
        id:{type: GraphQLID},
        comments:{type:GraphQLString},
        user:{
            type: UserType,
            resolve(parent,args){
                return _.find(usersData,{id:parent.userId})
            }
        }
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
        users:{
            type: new GraphQLList(UserType),
            resolve(parent,args){
                return usersData
            }
        },
        hobby: {
            type: HobbyType,
            args: {id:{type: GraphQLID}},
            resolve(parent,args){ //return data for hobby
                return _.find(hobbiesData, {id:args.id})
            }
        },
        hobbies:{
            type: new GraphQLList(HobbyType),
            resolve(parent,args){
                return hobbiesData;
            }
        },

        Post:{
            type: PostType,
            args: {id:{type: GraphQLID}},
            resolve(parent,args){
                return _.find(PostData,{id:args.id})
            }
        },
        //Return all posts query
        posts:{
            type: new GraphQLList(PostType),
            resolve(parent,args){
                return PostData;
            }
        }
    }
});

//Mutations
const Mutation = new GraphQLObjectType({
    name: 'mutation',
    fields: {
        //Lets create new users
        createUser:{
            type: UserType,
            args:{
                //id: {type: GraphQLID},
                name: {type: GraphQLString},
                age: {type: GraphQLInt},
                job: {type: GraphQLString}
            },
            resolve(parent,args){
                let user = {
                    name : args.name,
                    age: args.age,
                    job: args.job
                }
                return user;
            }
        },
        createPost:{
            type: PostType,
            args:{
                //id: {type:GraphQLId},
                comments: {type:GraphQLString},
                userId: {type:GraphQLID}
            },
            resolve(parent, args){
                let post = {
                    comments: args.comments,
                    userId: args.userId
                }
                return post;
            }
        },
        createHobby:{
            type:HobbyType,
            args:{
                title:{type:GraphQLString},
                description:{type:GraphQLString},
                userId:{type:GraphQLID}
            },
            resolve(parent,args){
                let hobby = {
                    title: args.title,
                    description: args.description,
                    userId: args.userId
                }
                return hobby;
            }
        }
        

    }
});


//export to the front end
module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
});
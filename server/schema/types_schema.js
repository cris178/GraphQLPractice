const graphql = require('graphql');

const{
    GraphQLObjectType,
    GraphQLSchema,
    GraphQLID,
    GraphQLString,
    GraphQLInt,
    GraphQLBoolean,
    GraphQLFloat,
    GraphQLNonNull
} = graphql;


//Scalar Type
/*
string
int
bool
float
ID
*/

//Basically we are creating objects with 
//Memeber variables being the fields.
//Each object is a node in the Graph 
const Person = new GraphQLObjectType({
    name: 'Person',
    description: 'Represents a person type',
    fields: () =>({ //Fields are 
        id:{type:GraphQLID},
        name:{type:GraphQLNonNull(GraphQLString)},
        age:{type:GraphQLNonNull(GraphQLInt)},
        isMarried:{type:GraphQLBoolean},
        gpa:{type:GraphQLFloat},
        justAType:{
            type: Person,
            resolve(parent,args){
                return parent;
            }
        }
    })
});

//Rootquery
const RootQuery = new GraphQLObjectType({
    name:'RootQueryType',
    description:'Description',
    fields:{
        person:{
            type: Person,
            resolve(parent,args){
                let personObj = {
                    name: "Antonio",
                    age: 35,
                    married: true,
                    gpa: 4.0,
                }
                return personObj;
            }
        }

    }
})


module.exports = new GraphQLSchema({
    query: RootQuery,
});
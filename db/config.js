const mongoose = require('mongoose');
const Joi = require('joi');
// const { unique } = require('underscore');

// const connection_String = "mongodb://127.0.0.1:27017/HNG";
const connection_String = "mongodb+srv://backend:pEL9zYIuV9VeAsWF@oaucv.diq8cit.mongodb.net/HNG?retryWrites=true&w=majority"

// for the mongodb connection
mongoose.connect(connection_String)
    .then(() => console.log("connected to mongodb"))
    .catch(err => console.log("couldn't connect to db", err));

// create Schema

const personSchema = mongoose.Schema({
    "name":{
        type:String,
        required:true,
        unique:true

    },
    "description":{
        type:String,
        default: "Testing out stuff"
    },
    "age":{
        type:String,
        default: "4"
    }
});

const Person = mongoose.model("Person", personSchema);

exports.Person = Person;





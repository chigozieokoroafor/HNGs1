const express = require('express');
const {Person} =  require('../db/config');
const { SOURCE_ID } = require('sqlite3');
const validatePerson =  require('../functions').validatPerson;

const route = express.Router()
route.use(express.json())

route.get("/:user_id", async (req, res) =>{
    var user_id = req.params.user_id;
    const user = await Person.findOne({_id:user_id});
    var data = {}
    if(user===null){
        data.message = "user not found"
        data.success = false,
        data.data = {}
        return res.send(data).status(200);
    }else{
        data.message = ""
        data.success = true,
        data.data = user
        return res.send(data).status(200);
    }
});

route.post("/", async (req, res)=>{
    const {name, description,age} =  req.body;
    const {error} = await validatePerson(req.body);
    var data = {};
    if (error){
        data.message = error.details[0].message,
        data.success = false
        data.data = {}
        
        return res.send(data).status(400);
    } else{
        const personCheck = await Person.findOne({name:name});
        
        if (personCheck===null){
            let user = new Person(
                {
                    name,
                    description,
                    age
                }
            )
            user = await user.save();
            data.message =  "user uploaded";
            data.success = true;
            data.data =  user

            return res.send(data).status(200);
        }else{
            data.message = "user with name exists, kindly add another name",
            data.success = false
            return res.send(data).status(400);
        }
    }

    
    
});

route.put("/:user_id", async(req, res)=>{
    // const {error} = await validatePerson(req.body);
    var data = {};
    const user_id = req.params.user_id;
    check =  await Person.findOne({_id:user_id})

    if (check === null){
        // console.log(error)
        data.message = "user with id not found",
        data.success = false
        data.data = {}
        return res.send(data).status(400);

    } else{
        const user = await Person.findOneAndUpdate({_id:user_id}, {"$set":req.body});
        user = await user.save();
        // console.log(user)
        data.message = "";
        data.success = true;
        data.data = user;
        
        return res.send(data).status(200);
    }
});

route.delete("/:user_id", async(req, res)=>{
    var user_id = req.params.user_id;
    await Person.findOneAndDelete({_id:user_id});
    var data = {
        message:"person deleted",
        success:true,
        data:{}
    }
    
    return res.send(data).status(200);


});

module.exports = route;


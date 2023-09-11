const Joi =  require('joi');

function validatePerson(data){
    const schema = Joi.object({
        name:Joi.string().required(),
        description:Joi.string(),
        age:Joi.string()
        
    })

    const validated = schema.validate(data);
    return validated;
};

module.exports.validatPerson = validatePerson;
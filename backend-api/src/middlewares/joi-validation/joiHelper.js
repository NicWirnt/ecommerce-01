import Joi from "joi";

export const newAdminValidation = (req, res, next) => {
    const schema = Joi.object({
        fName: Joi.string().max(20).required().alphanum(),
        lName: Joi.string().required().max(20),
        password: Joi.string().required().min(6),
        dob: Joi.date().allow(null),
        address: Joi.string().allow(null),
        email: Joi.string().required().email({ minDomainSegments: 2 }),
        phone: Joi.string().required().min(10).max(15),
    })

    const { value, error } = schema.validate(req.body);
    if (error) {
        return res.json({
            status: "Error validation-joi",
            message: error.message,
        })
    }

    next();

}


export const emailVerificationValidation = (req, res, next) => {
    const schema = Joi.object({
        email: Joi.string().email({ minDomainSegments: 2 }).required(),
        emailValidationCode: Joi.string().required(),
    })

    const { error } = schema.validate(req.body);
    if (error) {
        return res.json({
            status: "error email validaiton",
            message: error.message,
        })

    }
    next();
}


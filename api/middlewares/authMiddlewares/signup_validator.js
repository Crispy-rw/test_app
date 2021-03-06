import responseMsg from "../../helpers/responseMsg";

import joi from "joi";
export default (req, res, next) => {
    const {
        firstName,
        lastName,
        email,
        password,
        phoneNumber,
        confirmPassword,
    } = req.body;
    const user = {
        first_name: firstName,
        last_name: lastName,
        email,
        phone_number: phoneNumber,
        password,
        confirm_password: confirmPassword,
    };
    const schema = joi.object().keys({
        first_name: joi
            .string()
            .regex(/^[a-zA-Z0-9\s]{3,25}$/)
            .trim()
            .required(),
        last_name: joi
            .string()
            .trim()
            .regex(/^[a-zA-Z0-9\s]{3,25}$/)
            .required(),
        email: joi
            .string()
            .email()
            .trim()
            .required(),
        password: joi
            .string()
            .regex(new RegExp("^[a-zA-Z0-9]{8,32}$"))
            .required(),
        phone_number: joi
            .string()
            .trim()
            .regex(new RegExp("^[0-9]{10}$"))
            .required(),
        confirm_password: joi
            .string()
            .required()
            .valid(joi.ref("password")),
    });
    const { error, value } = joi.validate(user, schema);
    if (error) {
        responseMsg.errorMsg(res, 400, error.details[0].message);
    } else {
        delete value.confirm_password;
        req.value = value;
        next();
    }
};
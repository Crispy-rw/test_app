import jwt from "jsonwebtoken";
import hashPassword from "../helpers/hash";
import comparePassword from "../helpers/compare_hash";
import models from '../models';
const { User } = models;


export default class AuthanticationController {
    /**
     * @description This helps a new User to create credentials
     * @param  {object} req - The request object
     * @param  {object} res - The response object
     */
    static async register(req, res) {
        try {
            const value = await req.value;
            value.password = await hashPassword(value.password);
            const user = await User.create(
                {
                    first_name: value.first_name,
                    last_name: value.first_name,
                    password: value.password,
                    email: value.email,
                    phone_number: value.phone_number
                },
                {
                    fields: [
                        'first_name',
                        'last_name',
                        'password',
                        'phone_number',
                        'email'
                    ]
                }
            );
            const newValue = {
                id: user.id,
                email: user.email
            };
            const token = jwt.sign(newValue, process.env.KEY);
            res.status(201).send({
                status: 201,
                message: "User created successfully",
                data: { token: token }
            });
        } catch (error) {
            if (error && error.routine === "_bt_check_unique")
                return res.status(409).json({
                    status: 409,
                    error: "Email provided already exist"
                });
        }
    }
    /**
     * @description This checks if it is a registered User and returns a token as a response
     * @param  {object} req - The request object
     * @param  {object} res - The response object
     */
    static async login(req, res) {
        try {
            const value = req.value;
            const user = await User.findOne({
                where: {
                    email: value.email
                }
            });
            if (!user) {
                return res.status(404).json({ status: 404, message: 'Email or password does not exists' });
            }
            const isUser = await comparePassword({ value, user });
            if (isUser) {
                const newValue = {
                    id: user.id,
                    email: user.email
                };
                const token = jwt.sign(newValue, process.env.KEY);
                res.status(200).json({
                    status: 200,
                    message: "User is successfully logged in",
                    data: { token: token }
                });
            } else {
                res.status(403).json({ status: 403, error: "invalid email or password" });
            }
        } catch (error) {
            console.log(error);
        }
    }
}
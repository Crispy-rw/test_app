import models from '../models'

const { User } = models;

export default class UserController {

    static async viewUsers(req, res) {
        try {
            const data = await User.findAll({ raw: true, attributes: { exclude: ['updatedAt', 'password'] }, order: [['createdAt', 'DESC']] });

            return res.status(200).send({
                msg: "User Data",
                data
            })
        }
        catch (error) {
            console.log(error);
            return res.status(500).send({
                status: 500,
                error: "Server Error"
            })
        }
    }

    static async editUser(req, res) {
        try {

            const { id } = req.params;

            const findUser = await User.findOne({ where: { id }, attributes: { exclude: ['updatedAt', 'password', 'createdAt'] } });

            if (!findUser) {
                return res.status(404).send({
                    status: 404,
                    error: "No User Found"
                })
            }

            const update = await findUser.update(req.value);

            return res.status(200).send({
                msg: "User Data",
                data: update.get({ plain: true })
            })
        }
        catch (error) {
            console.log(error);
            return res.status(500).send({
                status: 500,
                error: "Server Error"
            })
        }
    }

}
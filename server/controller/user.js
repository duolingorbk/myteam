const db = require("../database/index")



const signup = async (req, res) => {
    try {
        const {
            email,
            password,
            name
        } = req.body
        console.log(req.body);

        const getuser = await db.User.findOne({
            where: {
                email: email
            }
        })
        if (getuser) {
            res.send(getuser)
        } else {
            const user = await db.User.create({
                email: email,
                password: password,
                name: name
            })
            res.send(user)
        }
    } catch (error) {

        res.send(error)
    }
}


const findAllUsers = async (req, res) => {
    try {
        const users = await db.User.findAll();
        res.send(users);
    } catch (error) {
        res.send(error);
    }
}


const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        await db.User.destroy({
            where: { id: id }
        });

        res.send("Deleted");
    } catch (error) {
        res.send(error);
    }
}

const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { email, password, name } = req.body;

        const user = await db.User.update(
            { email, password, name },
            { where: { id } }
        );

        res.send(user);
    } catch (error) {
        res.send(error);
    }
}





module.exports = {signup,findAllUsers , deleteUser , updateUser }
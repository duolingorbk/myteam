const db = require("../database/index")



const signup = async (req, res) => {
    try {
        const { email, password, name} = req.body
        const getuser = await db.User.findOne({
            where: {email: email  }
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


module.exports = signup
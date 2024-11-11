const {getAllUsers ,deleteUser , updateUser} = require("../models/adminModel/adminmodelUser")

const getUsers =(req , res) =>{
    getAllUsers((err , result)=>{
        if (err) {
            res.status(500).send(err)
        }
        res.status(200).send(result)
    })
}

const deleteOneUser =(req , res) =>{
    deleteUser(req.params.id ,(err , result)=>{
        if (err) {
            res.status(500).send(err)
        }
        res.status(200).send("Deleted")
    })
}

const updateOneUser =(req , res) =>{
    updateUser(req.body , req.params.id ,(err , result)=>{
        if (err) {
            res.status(500).send(err)
        }
        res.status(200).send("Updated")
    })
}

module.exports={
    getUsers , deleteOneUser , updateOneUser
}

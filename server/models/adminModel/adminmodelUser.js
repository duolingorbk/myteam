const connection = require("../../database/index")


const getAllUsers=(callback)=>{
 connection.query('select * from users' , callback)
}

const deleteUser = (id , callback )=>{
    connection.query('delete from users where idusers = ? ' , [id] , callback)
}


const updateUser = (value , id , callback)=>{
    connection.query('update users set ? where idusers = ? ' , [value , id ], callback)
}


module.exports = {
    getAllUsers , deleteUser , updateUser
}
const connection=require ("../../database/index")
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


module.exports = {
  
    add: async function (username, email, password, callback) {
        try {
        const hashedPassword=await bcrypt.hash(password,10)

connection.query("INSERT INTO users SET ?", [username, email, hashedPassword], (err,result)=>{
        callback(err, result)

        })
        }
        catch(error){
           console.error('Error hashing password:', error);
        }
      
      
    },
    get: function(id) {
        connection.query('SELECT * FROM users WHERE id = ?', id, (err, results) => {
          if (err) {
            console.error('error finding user:', err)
            return;
          }
          console.log('User found:', results);
        });
      },
       delete:function (id){
        const query = 'DELETE FROM users WHERE id = ?'
        connection.query(query, [id], (err, results) => {
          if (err) {
            console.error('Error deleting user:', err)
            return;
          }
          console.log('User deleted:', results)
        });
      }
}
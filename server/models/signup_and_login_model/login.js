const connection=require ("../../database/index")


module.exports = {
  
    add: function (value , callback) {
      connection.query("", value, (err,result)=>{
        callback(err, result)
        console.log("logged in")})
      
    }
}
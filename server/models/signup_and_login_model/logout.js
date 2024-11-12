const connection=require ("../../database/index")


module.exports = {
  
    remove: function (value , callback) {
      connection.query("", value, (err,result)=>{
        callback(err, result)
        console.log("logged out")})
      
    }
}
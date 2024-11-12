var signup=require("../../models/signup_and_login_model/signup.js")

module.exports = {
    makeAccount: function(req, res) {
        let{name,password,email}=req.body
       signup.add(req.body,function(err, results) {
        if(err) res.status(500).send(err);
        else res.json(results)
    })},
    getUser:function(req,res){
        let{password,email}=req.body
        signup.get(req.body,function(err, results) {
         if(err) res.status(500).send(err);
         else res.json(results)
     })
    },

deleteUser:function(){

    let{password,email}=req.body
       signup.delete(req.body,function(err, results) {
        if(err) res.status(500).send(err);
        else res.json(results)
    })
}
}
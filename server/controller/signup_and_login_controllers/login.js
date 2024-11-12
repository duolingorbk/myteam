var login=require("../../models/signup_and_login_model/login.js")

module.exports = {
    
    loginToAccount: function(req, res) {
        let{name,password}=req.body
       login.add(req.body,function(err, results) {
        if(err) res.status(500).send(err);
        else res.json(results)
    })}}
var logout=require("../../models/signup_and_login_model/logout.js")

module.exports = {

    logoutFromAccount: function(req, res) {
        let{name,password}=req.body
       logout.remove(req.body,function(err, results) {
        if(err) res.status(500).send(err);
        else res.json(results)
    })}}
const {v4: uuidv4} = require('uuid')
const User = require("../models/user");
const { setUser } = require('../server/auth')
async function handleUsersignup(req,res){
    const {name,email,password} = req.body;
    await User.create({
        name,
        email,
        password,
    })
   return res.redirect("/")
}
async function handleUserLogin(req, res) {
    const { email, password } = req.body;
    const user = await User.findOne({ email, password });
    if (!user) {
        return res.render('login', { msg: "Invalid credentials" });
    }


    const token = setUser(user)
     res.cookie('uid',token)

    return res.redirect('/')
}
module.exports ={
    handleUsersignup,
    handleUserLogin,
}
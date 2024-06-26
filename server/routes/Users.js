const express = require("express");
const router = express.Router();
const { Users } = require('../models');
const bcrypt = require("bcrypt");
const {sign} = require("jsonwebtoken");
const {validateToken} = require('../middleware/AuthMiddleware')

router.post("/", async (req, res)=> {
    const {username, password} = req.body;
    bcrypt.hash(password, 10).then((hash)=>{
        Users.create({
            username: username,
            password: hash
        });
        res.json("Account Created!");
    })
})

router.post("/login", async (req, res)=> {
    const {username, password} = req.body;
    const user = await Users.findOne({where: {username: username}});

    if(!user)
    {
        res.json({error:"User not exist!"});
    }
    else
    {
        bcrypt.compare(password, user.password).then((match)=>{
            if(!match) {
                res.json({error:"Wrong Credentials!"});
            }else{
                const accessToken = sign({username:user.username, id:user.id}, "sec");
                res.json(accessToken);
            }
        });
    }
});

router.get('/validate', validateToken, (req, res)=>{
    res.json(req.user);
})

module.exports = router;
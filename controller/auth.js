const express = require("express")
const router = express.Router()
const bodyParser = require("body-parser")
const bcrypt = require("bcryptjs")
const User = require("../model/user")
const Cart = require("../model/shoppingcartModel")
const Purchase = require('../model/purchaseModel')
const jwt = require("jsonwebtoken")
const config = require("../config")
const LocalStorage = require("node-localstorage").LocalStorage
localStorage = new LocalStorage("../scratch")



exports.postRegister=(req,res)=>{
    const { name,  password, email, role } = req.body;
    let userFound;
    User.findOne({
        email
    })
    .then(user=>{
        userFound= user;

        if(user){
            userFound= user;
            if(user.email!=email){
                const role = 'user';
                const hashedPassword = bcrypt.hashSync(req.body.password, 8)
                console.log(hashedPassword)
                User.create({
                    name: req.body.name,
                    email: req.body.email,
                    password: hashedPassword,
                    role:role
                }).then((registeredUser) => {
                    console.log("registeredUser", registeredUser)
                    var token = jwt.sign({ id: registeredUser._id }, config.secret, {
                        expiresIn: 86400
                    })
                    console.log(token)
                })
                res.redirect("/")
            }
           return  res.status(500).json("email found")
                
        }


        if(!user){
            userFound= user;
                const role = 'user';
                const hashedPassword = bcrypt.hashSync(req.body.password, 8)
                console.log(hashedPassword)
                User.create({
                    name: req.body.name,
                    email: req.body.email,
                    password: hashedPassword,
                    role:role
                }).then((registeredUser) => {
                    console.log("registeredUser", registeredUser)
                    var token = jwt.sign({ id: registeredUser._id }, config.secret, {
                        expiresIn: 86400
                    })
                    console.log(token)
                })
                res.redirect("/")
              
        }

    })

  
}


exports.addUser = (req, res) => {
    const { name,  password, email, role } = req.body;
    
    let userFound;
    User.findOne({
        email
    })
    .then(user=>{

         userFound= user;

        if(user){
            userFound= user;
            if(user.email!=email){
                
                console.log(email)
                bcrypt.hash(password,10)
                .then(hash=>{
                  const userObj = new User ({
                      name,
                      email,
                      password:hash,
                      role
                  });
           
                  userObj.save()
                  .then(response => {
                    res.redirect("/profile")
                })
                .catch( err => {
                    res.status(500).json({ error: err })
                })
                
              })    

            }
           return  res.status(500).json("email found")
                
        }

        if(!user){
            bcrypt.hash(password,10)
                .then(hash=>{
                  const userObj = new User ({
                    name,
                    email,
                    password:hash,
                    role
                  });
           
                  userObj.save()
                  .then(response => {
                    res.redirect("/profile")
                })
                .catch( err => {
                    res.status(500).json({ error: err })
                })
                
              })      
        }


       
       
       
    })

           
   
    
}



exports.postLogin=(req,res)=>{
    const { email, password } = req.body;
    let emailFound;
       
    User.findOne({
        email
    })

    .then(user => {
        if(!user){
            return res.send({ auth: false, token: null, msg: "Invalid credentials" })
        }
        emailFound= user;

        bcrypt.compare(req.body.password,user.password)

        .then(result=>{

            if(!result){
                return res.send({ auth: false, token: null, msg: "Invalid credentials" })
            }
    
            const token = jwt.sign({ id: user._id }, config.secret, {
                expiresIn: 86400
            })
            localStorage.setItem("authToken", token)
            res.redirect("/profile")
              // Changed to absolute path
        })

    })

}


exports.postProfile=(req,res)=>{
    var token = localStorage.getItem("authToken")
    if (!token) {
        res.redirect("/")
    }
    jwt.verify(token, config.secret, (err, verifiedToken) => {
        if (err) {
            res.redirect("/")
        }
        User.findById(verifiedToken.id, { password: 0 } )

        .then(user=>{
            if (!user) {
                res.redirect("/")
            }

            Cart.find()
            .then(response => {
                User.find()
                .then(userList=>{
                    Purchase.find()
                    .then(purchaseList=>{
                        res.render("admin.ejs", { user, response, userList,purchaseList })
                    })
                })
              
                
            })
            .catch(err => {
                return res.send({ msg: "Error occured" })
            })
            // res.render("dashboard.ejs", { user, response })

        })

        .catch(err => {
            res.redirect("/") 
        })
    })
}



exports.logOut=(req,res)=>{
    localStorage.removeItem("authToken")
    res.redirect("/")
}

exports.select=(req,res)=>{
    res.render("select.ejs")
}


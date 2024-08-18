const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
const app = express();
const path = require('path');
const route = require("./route/index");
require("dotenv").config();
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(__dirname+"/public"));
app.use('/', route);
app.set("views", "./views") //pages
app.set("view engine", "ejs") //choosing ejs template
const PORT =5500;
const HOSTNAME = "localhost";
const passport = require("passport");

app.get("/", (req, res) => {
    res.render("index")
})

app.get("/signup", (req, res) => {
    res.render("signup")
})

mongoose.set('strictQuery',false);

const MongoAtlas = process.env.MONGO_URL;

mongoose.connect(MongoAtlas, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})   .then(res => {
        app.listen(PORT, HOSTNAME, () => {
            console.log(`Server is running at ${HOSTNAME}: ${PORT}`)
        });
    })
    .catch(err => console.log(err));

mongoose.set('strictQuery',false);
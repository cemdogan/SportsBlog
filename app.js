const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const session = require("express-session");
const expressValidator = require("express-validator");
const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/sportsblog");
const db = mongoose.connection;

const port = 3000;

const app = express();

const index = require("./routes/index");
const articles = require("./routes/articles");
const categories = require("./routes/categories");
const manage = require("./routes/manage");

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.locals.moment = require("moment");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(expressValidator({
    errorFormatter : ( param, msg, value ) => {
        return {
            param: param,
            msg: msg,
            value, value
        };
    }
}));

app.use(express.static(path.join(__dirname, "public")));
app.use(session({
    secret:'secret',
    resave:false,
    saveUninitialized:true
}));

app.use(require('connect-flash')());
app.use(function (req, res, next) {
  res.locals.messages = require('express-messages')(req, res);
  next();
});

app.use("/", index);
app.use("/articles", articles);
app.use("/categories", categories);
app.use("/manage", manage);

app.get("/", (req, res)=> {
    res.send("Hello");
})

app.listen(port, () => {
    console.log("Server started on port "+ port);
});

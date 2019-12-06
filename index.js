
const express = require("express");
const bodyParser = require('body-parser');
const path = require('path');
const session = require('express-session');

const usersRouter = require('./users.js');

const PORT = 8000;

const app = express();

app.use(express.static(path.join(__dirname, "public")));

app.use(bodyParser.urlencoded( { extended: false } ));
app.use(bodyParser.json());

app.use(session({ secret: 'keyboard cat', cookie: { maxAge: 60000 }}));

app.use("/api/users", usersRouter);

app.engine('pug', require('pug').__express);
app.set("views", path.join(__dirname, "public"));

let users = [
    
    {
        "id" : "0",
        "name" : "Oleg",
        "age": "23"
    },
    {
        "id" : "1",
        "name" : "Irina",
        "age": "48"
    },
    {
        "id" : "2",
        "name" : "Alex",
        "age": "89"
    }
];

let logger = function(req, resp, next)
{
    if (req.session.visits == undefined)
    {
        req.session.visits = 0;
        req.session.users = users;
    }

    req.session.visits += 1;
    console.log("visit: " + req.session.visits
        + " processing: " + req.path);
        // + ", session: " + JSON.stringify(req.session));
    next();
};

app.use(logger);

app.get("/", (req, resp) =>
{
    resp.render("index.pug");
});

app.get("/users", (req, resp) =>
{
    console.log(req.session);
    resp.render("users.pug", { users: req.session.users});
});

app.all("*", (req, resp) =>
{
    resp.send("Path Not Found: " + req.path);
});

app.use((err, req, resp) =>
{
    resp.status(500);
    resp.send(err.toString());
});

app.listen(PORT);

console.log("listening on " + PORT);


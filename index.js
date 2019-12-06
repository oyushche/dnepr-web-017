
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

app.use(session({ secret: 'keyboard cat', cookie: { maxAge: 60000 }}))

app.use("/api/users", usersRouter);

let logger = function(req, resp, next)
{
    console.log("processing: " + req.path + ", session: " + req.session);
    next();
};

app.use(logger);

app.get("/", (req, resp) =>
{
    resp.send("ROOT PATH get...")
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


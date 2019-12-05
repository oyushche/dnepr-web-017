
const express = require("express");
const bodyParser = require('body-parser');
const path = require('path');

const usersRouter = require('./users.js');

const PORT = 8000;

const app = express();

app.use(express.static(path.join(__dirname, "public")));

app.use("/api/users", usersRouter);

app.use(bodyParser.urlencoded( { extended: false } ));
app.use(bodyParser.json());


let logger = function(req, resp, next)
{
    console.log("processing: " + req.path);
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


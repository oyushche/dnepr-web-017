const express = require('express');

const router = express.Router();

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

router.get("/", (req, resp) =>
{
    if (req.session.users == undefined)
    {
        req.session.users = users;
    }
    
    resp.json(req.session.users);
});

router.get("/:id", (req, resp, next) =>
{
    let id = req.params.id;
    // console.dir(req.params);
    
    if (id > 100)
    {
        next(new Error("user not found id: " + id));
        return;
    }
    
    resp.json(req.session.users[id]);
});

router.delete("/:id", (req, resp) =>
{
    console.log("DELETE ...");
    req.session.users.splice(req.params.id, 1);
    resp.status(200).send("OK");
});


module.exports = router;


// router.post("/", (req, resp) =>
// {
//     let user = req.body;
//
//     user.id = users.length;
//     users.push(user);
//
//     // console.log("/users POST" + user);
//     resp.send("OK");
// });
//

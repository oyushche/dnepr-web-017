const express = require('express');
const fs = require('fs');

const router = express.Router();

let saved = false;
let loaded = false;

router.get("/file", (req, resp) =>
{
    resp.render("storage/file.pug", { saved: saved, loaded: loaded});
    saved = false;
    loaded = false;
});

router.get("/api/storage/save", (req, resp) =>
{
    fs.writeFile("./users.json", JSON.stringify(req.session.users), () =>
    {
        saved = true;
        resp.redirect("/file");
    });
});

router.get("/api/storage/load", (req, resp) =>
{
    fs.readFile("./users.json", (err, data) =>
    {
        let users = JSON.parse(data);
        console.log(users);
        req.session.users = users;
        
        loaded = true;
        resp.redirect("/file");
    });
});

module.exports = router;

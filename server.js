const express = require("express")
const cors = require("cors")
const server = express()

server.use(cors())
server.use(express.json({}))

conStr = "/thread"

server.use(cors())
server.use(express.static("static"))


//app.get

server.use((req,res,next) =>{
    console.log("time: ",
    Date.now(),
    " - Method: ",
    req.method,
    " - Path: ",
    req.originUrl,
    " - Body: ",
    req.body);
    next();
})

server.get(conStr,(req, res) => {
    res.setHeader("Content-Type", "application/json");

    res.json({"get all":"the things"},);
})

server.get(conStr+"/:id", (req, res, next) => {
    res.setHeader("Content-Type", "application/json");

    res.json({2:`get id ${req.params.id}`}, );
})

server.post(conStr,(req, res, next) => {
    res.setHeader("Content-Type", "application/json");

    res.json({3: `get post`});
})

server.delete(conStr+"/:id",(req, res, next) => {
    res.setHeader("Content-Type", "application/json");

    res.json({4: `get delete`});
})

server.post(conStr+"/:id",(req, res, next) => {
    res.setHeader("Content-Type", "application/json");

    res.json({5: `get post 2`});
})

server.delete(conStr+"/:id/:oid",(req, res, next) => {
    res.setHeader("Content-Type", "application/json");

    res.json({6: `get delete 2`});
})

// GET /thread

// GET /thread/:id

// POST /thread

// DELETE /thread/:id

// POST /post

// DELETE /post/:thread_id/:post_id

module.exports = server;

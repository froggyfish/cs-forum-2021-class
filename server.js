const express = require("express")
const cors = require("cors")
const server = express()

const {Thread} = require("./model")

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

    console.log("getting all threads");
    Thread.find({}, (err, threads) => {
        if(err != null){
            res.status(500).json({
                error: err,
                message: "could not list threads",
            })
            return;
        }
        res.status(200).json(threads);
    })
})

server.get(conStr+"/:id", (req, res, next) => {
    res.setHeader("Content-Type", "application/json");
    console.log(`getting thread with body ${req.params.id}`)

    Thread.findById(req.params.id, (err, threads) => {
        if(err != null){
            res.status(500).json({
                error: err,
                message: "could not list threads",
            })
            return;
        }
        res.status(200).json(threads);
    })
})

server.post(conStr,(req, res, next) => {
    res.setHeader("Content-Type", "application/json");
    console.log(`creating post with body`, req.body)

    let newPost = {
        author: req.body.author || "",
        body: req.body.body || "",
        thread_id: req.body.thread_id || "",
    }
    Thread.create(newPost, (err, thread) => {
        if(err){
            res.status(500).json({
                error: err,
                message: "could not delete thread",
            })
            return;
        }
        res.status(201).json(thread);
    })

})

server.delete(conStr+"/:id",(req, res, next) => {
    res.setHeader("Content-Type", "application/json");
    console.log(`deleting thread with id ${req.params.id}`)

    Thread.findByIdAndDelete(req.params.id, (err, thread) => {
        if(err != null){
            res.status(500).json({
                error: err,
                message: "could not post",
            })
            return;
        }
        res.status(202).json(thread)
    })

})

server.post(conStr+"/:id",(req, res, next) => {
    res.setHeader("Content-Type", "application/json");

    console.log(`creating post with body`, req.body)

    let newPost = {
        author: req.body.author || "",
        body: req.body.body || "",
        thread_id: req.params.id || "",
    }

    Thread.findByIdAndUpdate(
        req.params.id, 
        {
            $push:{posts: newPost}
        },
        {
            new: true,
        }, 
        (err, thread) => {
        
        if(err != null){
            res.status(500).json({
                error: err,
                message: "could not post",
            })
            return;
        }else if(thread === null){
            res.status(404).json({
                error: err,
                message: "could not find"
            })
            return;
        }
        res.status(200).json(thread);
    })
})

server.delete(conStr+"/:tid/:pid",(req, res, next) => {
    res.setHeader("Content-Type", "application/json");

    console.log(`deleting post with id ${req.params.pid} on thread with id ${req.params.tid}`)

    Thread.findByIdAndUpdate(
        req.params.tid,
        {
            $pull: 
            {
                posts: 
                {
                    _id: req.params.pid
                }
            }
        },{
            new: true,
        },
        (err, thread) => {
            if(err != null){
                res.status(500).json({
                    error: err,
                    message: "could not delete post",
                })
                return;            
            }else if (thread === null){
                res.status(404).json({
                    error: err,
                    message: "could not find thread",
                })
                return;
            }
            res.status(201).json(thread)
            req.local = {
                error: "this was my error"
            }
            
        })

})

server.use((req, res) =>{
    console.log(req.local);
})

// GET /thread

// GET /thread/:id

// POST /thread

// DELETE /thread/:id

// POST /post

// DELETE /post/:thread_id/:post_id

module.exports = server;

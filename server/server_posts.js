const express = require('express');
const joi = require('joi');
const posts = express.Router();
const functions = require('../database/dc_posts');
const functionsComm = require('../database/db_comments');
const checkUser = require('../database/db_user');

//check if the id is number
function validationId(req, res, next) {

    const schema = joi.number().min(1);
    const { error } = schema.validate(req.params.id||req.params.postId);
    if (error) {
        res.status(400).send(error.details[0].message);
        return
    }
    next();
};

const authentication = async (req, res, next) => {
    const auth = req.headers.auth;
    const [userName, password] = auth.split(':');
    if(!userName || !password) {
        res.status(400).send();
    }
    const user = await checkUser.login(userName, password);
    if (!user) {
        res.status(401).send();
        return;
    }
    req.user = user;
    next();
}


// const catchCreatPost = async (req, res, next)
//get all the posts
posts.get('/', async (req, res) => {
    try {
        const data = await functions.getAllTitlesOfposts();
        res.json(data);
        return;
    } catch (err) {
        res.status(500).send();
    }
});


//get a body of the post
posts.get('/:id', validationId, async (req, res) => {
    try {
        const data = await functions.getBodyOfPost(req.params.id);
        if (data) {
            res.json(data);
            return;
        }
        res.status(404).send()
    } catch (err) {
        res.status(500).send();
    }
});

//creat a new post
posts.post('/', authentication, async (req, res) => {
    if (req.body.userId !== req.user.id) {
        res.status(400).send();
        return;
    }
    try {
        const data = await functions.createPost(req.body.userId, req.body.title, req.body.body);
        if (data) {
            res.json(data);
            return;
        }
    } catch (err) {
        res.status(400).send();
    }
});

//update post
posts.put('/:postId', validationId, authentication, async (req, res) => {
    console.log("1");
    const post = await functions.getPost(req.params.postId);
    if (!post || post.userId !== req.user.id) {
        res.status(400).send();
        return;
    }
    try {
        const data = await functions.updateBodyPost(req.body.body,req.params.postId);
        if (data) {
            res.json(data);
            return;
        }
        res.status(404).send();
    } catch (err) {
        res.status(500).send();
    }
});

//delete post
posts.delete('/:id', validationId, authentication, async (req, res) => {
    const post = await functions.getPost(req.params.id);
    if (!post || post.userId !== req.user.id) {
        res.status(400).send("pppppp");
        return;
    }
    try {
        const data = await functions.deletePost(req.params.id);
        if (data) {
            // console.log(data);
            res.json(data);
            return;
        }
        res.status(404).send();
    } catch (err) {
        res.status(500).send();
    }
});

//get comments
posts.get('/:postId/comments/',validationId, async (req, res) => {
    try {
        const data = await functionsComm.getComments(req.params.postId);
        res.json(data);
        return;
    } catch (err) {
        res.status(500).send();
    }
});

//add comment
posts.post('/:postId', validationId, async (req, res) => {

    try {
        const data = await functionsComm.addComment(req.params.postId, req.body.name, req.body.body);
        res.json(data);
        return;
    } catch (err) {
        res.status(500).send();
    }
});

//delete comment
posts.delete('/:id/comments/', validationId, authentication, async (req, res) => {
    const comment = await functionsComm.getComment(req.params.id);
    if(!comment){
        res.status(400).json({error:"the comment is not defined"});
        return;
    }
    const post = await functions.getPost(comment.postId);
    if (post.userId !== req.user.id) {
        res.status(401).send({ error: "you can't delete!" });
        return;
    }
    console.log("gd");
    try {
        const data = await functionsComm.deleteComment(req.params.id);
        if (data) {
            res.json(data);
            return;
        }
        res.status(404).send();
    }
    catch (err) {
        res.status(500).send();
    }
});

module.exports = posts;

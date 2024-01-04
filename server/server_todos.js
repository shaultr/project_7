const express = require('express');
const Joi = require("joi");
const todos = express.Router();
const func = require('../database/db_todos');
const checkUser = require('../database/db_user');
//authentication
const authentication = async (req, res, next) => {
    const auth = req.headers.auth;
    if (!auth) {
        res.status(400).send();
    }
    const [userName, password] = auth.split(':');
    if (!userName || !password) {
        res.status(400).send();
    }
    const user = await checkUser.login(userName, password);
    if (!user) {
        res.status(401).send();
        return;
    }
    req.user = user;
    next();
};

//check if the id isn't number 
function validationId(req, res, next) {
    const idSchema = Joi.number().min(1);
    const { error } = idSchema.validate(req.params.id||req.params.userId);
    if (error) {
        res.status(400).send(error.details[0].message);
        return;
    }
    next();
};

//get all todos by user id
todos.get('/:id', validationId, async (req, res) => {
    try {
        const data = await func.getAllTodos(req.params.id);
        if (data) {
            res.json(data);
            return;
        }
        res.status(404).send();
    }
    catch (error) {
        res.status(500).send();
    };

});

//get all todos order by a-z
todos.get('/:id/alphabet', validationId, async (req, res) => {
    try {
        const data = await func.getalphabetTodos(req.params.id);
        if (data) {
            res.json(data);
            return;
        }
        res.status(404).send();
    }
    catch (error) {
        res.status(500).send();
    };

});

//get all todos if the todos is done
todos.get('/:id/true', validationId, async (req, res) => {
    try {
        const data = await func.showCompleteDone(req.params.id);
        if (data) {
            res.json(data);
            return;
        }
        res.status(404).send();
    }
    catch (error) {
        res.status(500).send();
    };

});

//get todos if the todos is not done
todos.get('/:id/false', validationId, async (req, res) => {
    try {
        const data = await func.showCompleteNotDone(req.params.id);
        if (data) {
            res.json(data);
            return;
        }
        res.status(404).send();
    }
    catch (error) {
        res.status(500).send();
    };

});

//creat a new todo
todos.post('/:userId', validationId, authentication,  async (req, res) => {

    if (parseInt(req.params.userId) !== req.user.id) {
        res.status(400).send();
        return;
    }
    try {
        const data = await func.createTodo(req.params.userId, req.body.title, req.body.completed);
        if (data) {
            res.json(data);
            return;
        }
        res.status(404).send();
    }
    catch (error) {
        res.status(500).send();
    };

});

//update title by id
todos.put('/:id/setTodo', validationId, async (req, res) => {
    try {
        const data = await func.updateTitleTodo(req.body.title, req.params.id);
        if (data) {
            res.json(data);
            return;
        }
        res.status(404).send();
    }
    catch (error) {
        res.status(500).send();
    };

});

//update completed successfully
todos.put('/:id/setCompleted',validationId, async (req, res) => {
    try {
        const data = await func.updateCompletedTodo(req.params.id, req.body.completed);
        if (data) {
            res.json(data);
            return;
        }
        res.status(404).send();
    }
    catch (error) {
        console.log("error: " + error);
        res.status(500).send("Error: " + error.message);
    };
});

//delete todo
todos.delete('/:id', validationId, async (req, res) => {
    try {
        const data = await func.deleteTodo(req.params.id);
        if (data) {
            res.json(data);
            return;
        }
        res.status(404).send();
    }
    catch (error) {
        res.status(500).send();
    };

});

//get todos by char
todos.get('/:id/:char', validationId, async (req, res) => {
    try {
        const data = await func.search(req.params.id, req.params.char);
        if (data) {
            res.json(data);
            return;
        }
        res.status(404).send();
    }
    catch (error) {
        console.log(error);
        res.status(500).send();
    };

});

module.exports = todos;
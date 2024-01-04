const mysql = require("mysql2/promise");
require("dotenv").config();

//crete connection
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    database: 'user_management',
    password: process.env.SQL_PASSWORD
});

//get all users
async function getAllUsers() {
    const SQL = `SELECT * FROM user_management.users`
    const [data] = await pool.query(SQL);
    return data;
};

//get user by id
async function getUser(id) {
    const SQL = `SELECT *
    FROM user_management.users
    WHERE id = ?`
    const [data] = await pool.query(SQL, [id]);
    return data;
};

//get all todos
async function getTodos(userId) {
    const SQL = `SELECT *
    FROM user_management.todos
    WHERE userId = ?`
    const [data] = await pool.query(SQL, [userId]);
    return data;
};

//update todo
async function updateTodo(title, id) {
    const SQL = `UPDATE user_management.todos
    SET title = ?
    WHERE userId = ?`
    const [data] = await pool.query(SQL, [title, id]);
    return data;
};

//create a new todo
async function createTodo(title, id) {
    const SQL = `INSERT INTO user_management.todos
    (id, title)
    VALUES(?, ?)`
    const [data] = await pool.query(SQL, [id,title]);
    return data;
};


//get all posts
async function getAllPosts() {
    const SQL = `SELECT *
    FROM user_management.posts`
    const [data] = await pool.query(SQL);
    return data;
};

//get post by user id
async function getPosts(userId) {
    const SQL = `SELECT *
    FROM user_management.posts
    WHERE userId = ?`
    const [data] = await pool.query(SQL, [userId]);
    return data;
};

//get comments by spcific post
async function getComments(userId, postId) {
    const SQL = `SELECT *
    FROM user_management.comments
    WHERE postId = ?
    JOIN user_management.posts
    ON userId = ?`
    const [data] = await pool.query(SQL, [postId, userId]);
    return data;
};

//update post
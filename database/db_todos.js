const pool = require('./main');

//get all todos by user id
async function getAllTodos(userId) {
    const SQL = `SELECT * FROM todos WHERE userId = ?`;
    const [data] = await pool.query(SQL, [userId]);
    return data;
};

//get all todos order by a-z
async function getalphabetTodos(userId) {
    const SQL = `SELECT * FROM todos WHERE userId = ? ORDER BY title`;
    const [data] = await pool.query(SQL, [userId]);
    return data;
};

//get todo by user id
async function getTodo(id) {
    const SQL = `SELECT * FROM todos WHERE id = ?`;
    const [data] = await pool.query(SQL, [id]);
    return data;
};

//create a new todos by user id
async function createTodo(userId, title, completed) {
    const SQL = `INSERT INTO todos
    (userId, title, completed)
    VALUES(?, ?, ?)`;
    const [data] = await pool.query(SQL, [userId, title, completed]);
    return getTodo(data.insertId)
    };

//delete todos
async function deleteTodo(id) {
    const result = await getTodo(id)
    const SQL = `DELETE FROM todos
    WHERE id = ?`;
    const [data] = await pool.query(SQL, [id]);
    return result
    };

//update title todos
async function updateTitleTodo(title, id) {
    const SQL = `UPDATE todos
    SET title = ?
    WHERE id = ?`;
    const [data] = await pool.query(SQL, [title, id]);
    return getTodo(id);
    };
    
//update completed todos
async function updateCompletedTodo(id, completed) {
    const SQL = `UPDATE todos
    SET completed = ?
    WHERE id = ?`;
    const [data] = await pool.query(SQL, [completed, id]);
    // let [x] = await getTodo(id)
    return getTodo(id)
};

//show completed if done
async function showCompleteDone(userId) {
    const SQL = `SELECT *
    FROM todos WHERE completed>0 AND userId = ?`
    const [data] = await pool.query(SQL, [userId])
    return data;
}
//show completed not done
async function showCompleteNotDone(userId) {
    const SQL = `SELECT * FROM todos
    WHERE completed=0 AND userId = ?`;
    const [data] = await pool.query(SQL,[userId])
    return data;
};

//search
async function search(userId, char) {
    try {
    const SQL =  `SELECT * FROM todos
    WHERE userId = ? AND title LIKE ?`;
    const [data] = await pool.query(SQL,[userId,char +"%"])
    return data; 
    }
    catch(error){
        console.log(error);
    }
}

module.exports = {
    getAllTodos,
    getalphabetTodos,
    getTodo,
    createTodo,
    deleteTodo,
    updateTitleTodo,
    updateCompletedTodo,
    showCompleteDone,
    showCompleteNotDone,
    search
}
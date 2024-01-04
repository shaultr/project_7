const pool = require('./main');



//get all titles of posts
async function getAllTitlesOfposts() {
    const SQL = `SELECT * FROM posts ORDER BY title`;
    const [data] = await pool.query(SQL);
    return data;
};


//get body of post by post id
async function getBodyOfPost(id) {
    const SQL = `SELECT body FROM posts WHERE id = ?`;
    const [[data]] = await pool.query(SQL, [id]);
    return data;
};

//get post by id
async function getPost(id) {
    const SQL = `SELECT * FROM posts WHERE id = ?`;
    const [[data]] = await pool.query(SQL, [id]);
    return data;
};

//create a new post by user id
async function createPost(userId, title, body) {
    const SQL = `INSERT INTO posts
    (userId, title, body)
    VALUES(?, ?, ?)`;
    const [data] = await pool.query(SQL, [userId, title, body]);
    return getPost(data.insertId)
};

// delete post by post id
async function deletePost(id) {
    const SQL = `DELETE FROM posts
    WHERE id = ?`;
    const result = await getPost(id)
    const [data] = await pool.query(SQL, [id]);
    return result
};

// update body post
async function updateBodyPost(body,id) {
    console.log('data');
    const SQL = `UPDATE posts
    SET body = ?
    WHERE id = ?`;
    const [data] = await pool.query(SQL, [body, id]);
    return getPost(id);
};


module.exports = {
    getAllTitlesOfposts,
    getBodyOfPost,
    getPost,
    createPost,
    deletePost,
    updateBodyPost
}
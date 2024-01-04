const pool = require('./main');



//show comments by post id
async function getComments(postId) {
    const SQL = `SELECT *
    FROM comments WHERE postId=? `
    const [data] = await pool.query(SQL, [postId])
    return data;
};

//get comment by id
async function getComment(id) {
    const SQL = `SELECT *
     FROM comments WHERE id=? `
    const [[data]] = await pool.query(SQL, [id])
    return data;
}
    
//add comment
async function addComment(postId, name, body) {
    const SQL = `INSERT INTO comments (postId, name, body)
    VALUES (?,?,?)`;
    const [data] = await pool.query(SQL, [postId, name, body])
    return getComment(data.insertId)
};

//set comment 
async function setComment(id, body) {
    const SQL = ` UPDATE comments  
    SET body =?
    WHERE id =?`;
    const [data] = await pool.query(SQL, [body, id])
    return getComment(id)
};
//delete comment Provided he owns the post
async function deleteComment(id) {
    const result = await getComment(id);
    const SQL = `DELETE FROM comments WHERE id=?`;
    const [data] = await pool.query(SQL, [id])
    return result;
};

module.exports = {
    getComments,
    getComment,
    addComment,
    setComment,
    deleteComment
}

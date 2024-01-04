const pool = require('./main');

async function getUserName(name) {
    const SQL = `SELECT * FROM users WHERE name = ?`;
    const [[date]] = await pool.query(SQL, [name]);
    return date;
};
async function getUserPassword(password) {
    const SQL = `SELECT * FROM passwords WHERE password = ?`;
    const [[date]] = await pool.query(SQL, [password]);
    return date;
};

//login user with name and password
async function login(username, password) {
    const SQL = `SELECT *
    FROM users
    JOIN passwords ON users.id = passwords.userId
    WHERE users.name = ? AND passwords.password = ?`;
    const [[data]] = await pool.query(SQL, [username, password])
    return data;
};
module.exports = {
    getUserName,
    getUserPassword,
    login
};

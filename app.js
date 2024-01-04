const express = require('express');
const app = express();
app.use(express.json());
const cors = require('cors');
const todos = require('./server/server_todos');
const posts = require('./server/server_posts');
const login = require('./server/server_login');
app.use(cors());
app.use('/api/login', login);
app.use('/api/todos', todos);
app.use('/api/posts', posts);








const port = process.env.PORT || 8000;
app.listen(port, () => console.log("The server is runnig on port " + port));
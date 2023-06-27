import http from 'http';
import 'dotenv/config.js';
// import users from './mock-data/users.json' assert { type: 'json' };
import {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
} from './controllers/usersController.js';

//console.log(process.NODE_ENV);
const server = http.createServer((req, res) => {
  if (req.url === '/api/users' && req.method === 'GET') {
    getUsers(req, res);
  } else if (
    req.url.match(/\/api\/users\/user\/[a-zA-Z0-9]+/) &&
    req.method === 'GET'
  ) {
    const userId = req.url.split('/')[4];
    getUser(req, res, userId);
  } else if (req.url === '/api/users' && req.method === 'POST') {
    createUser(req, res);
  } else if (
    req.url.match(/\/api\/users\/user\/[a-zA-Z0-9]+/) &&
    req.method === 'PUT'
  ) {
    const id = req.url.split('/')[4];
    updateUser(req, res, id);
  } else if (
    req.url.match(/\/api\/users\/user\/[a-zA-Z0-9]+/) &&
    req.method === 'DELETE'
  ) {
    const id = req.url.split('/')[4];
    deleteUser(req, res, id);
  } else {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'Resource not found!' }));
  }
});
let PORT = process.env.PORT || 7480;

server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

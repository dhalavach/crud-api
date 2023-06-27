import {
  getAllUsers,
  getUserById,
  create,
  update,
} from '../models/usersModel.js';
import { getPostData } from '../helpers.js';

export const getUsers = async (req, res) => {
  try {
    const users = await getAllUsers();
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(users));
  } catch (err) {
    console.log(err);
  }
};

export const getUser = async (req, res, id) => {
  try {
    const user = await getUserById(id);
    if (!user) {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: 'User not found!' }));
    } else {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(user));
    }
  } catch (err) {}
};

export const createUser = async (req, res) => {
  try {
    const body = await getPostData(req);

    const { username, age, hobbies } = JSON.parse(body);

    const user = {
      username,
      age,
      hobbies,
    };

    const newUser = await create(user);

    res.writeHead(201, { 'Content-Type': 'application/json' });
    return res.end(JSON.stringify(newUser));
  } catch (err) {
    console.log(err);
  }
};

export const updateUser = async (req, res, id) => {
  try {
    const user = await getUserById(id);

    if (!user) {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: 'User not found' }));
    } else {
      const body = await getPostData(req);

      const { username, age, hobbies } = JSON.parse(body);

      const userData = {
        username: username || user.username,
        age: age || user.age,
        hobbies: hobbies || user.hobbies,
      };

      const updUser = await update(id, userData);

      res.writeHead(200, { 'Content-Type': 'application/json' });
      return res.end(JSON.stringify(updUser));
    }
  } catch (error) {
    console.log(error);
  }
};

export const deleteUser = async (id) => {};

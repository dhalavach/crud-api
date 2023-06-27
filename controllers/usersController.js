import { getAllUsers, getUserById, create } from '../models/usersModel.js';
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

    const { name, age, hobbies } = JSON.parse(body);

    const user = {
      name,
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

export const updateUser = async (id) => {};
export const deleteUser = async (id) => {};

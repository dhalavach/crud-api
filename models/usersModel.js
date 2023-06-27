import users from '../mock-data/users.json' assert { type: 'json' };
import { uuid } from 'uuidv4';
import { writeToFile } from '../helpers.js';
import { writeFile } from 'fs/promises';

export const getAllUsers = () => {
  return new Promise((resolve, reject) => {
    resolve(users);
  });
};

export const getUserById = (id) => {
  return new Promise((resolve, reject) => {
    const user = users.find((user) => user.id === id);
    resolve(user);
  });
};

export const create = (user) => {
  console.log(uuid());
  return new Promise((resolve, reject) => {
    const newUser = { id: uuid(), ...user };
    users.push(newUser);
    if (process.env.NODE_ENV !== 'test') {
      writeToFile('./mock-data/users.json', users);
    }
    resolve(newUser);
  });
};

import users from '../mock-data/users.json' assert { type: 'json' };

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

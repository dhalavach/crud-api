import { writeFile } from 'fs/promises';

export const getPostData = async (req, res) => {
  return new Promise((resolve, reject) => {
    try {
      let body = '';

      req.on('data', (chunk) => {
        body += chunk.toString();
      });

      req.on('end', () => {
        resolve(body);
      });
    } catch (err) {
      reject(err);
    }
  });
};

export const writeToFile = async (name, data) => {
  await writeFile(name, JSON.stringify(data), 'utf8', (err) => {
    if (err) {
      console.log(err);
    }
  });
};

export const checkIfRequiredFieldsArePresent = (userInfo) => {
  if (userInfo.username && userInfo.age && userInfo.hobbies) return true;
  else return false;
};

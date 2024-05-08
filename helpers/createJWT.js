import jwt from "jsonwebtoken";

const generateJWT = (id = "") => {
  return new Promise((resolve, reject) => {
    const payload = { id };
    jwt.sign(payload, process.env.SECRET_KEY, (err, token) => {
      if (err) {
        console.log(err);
        reject("JWT not generated");
      } else resolve(token);
    });
  });
};

export default generateJWT;

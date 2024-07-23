const jwt = require("jsonwebtoken");
const hashCode = process.env.HASHJWT;

exports.generateToken = ({ id, username, role }) => {
  return jwt.sign({ id, username, role }, hashCode);
};

exports.decryptToken = (token) => {
  return jwt.verify(token, hashCode);
};

const bcrypt = require("bcryptjs");

exports.encrypt = async (password) => {
  const saltRounds = Math.ceil(Math.random() * 15);
  const salt = await bcrypt.genSalt(saltRounds);
  return bcrypt.hash(password, salt);
};

exports.isCompare = async (password, hash) => {
  return bcrypt.compare(password, hash);
};

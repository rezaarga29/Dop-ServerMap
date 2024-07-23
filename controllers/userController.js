const { User, ServiceCategory, sequelize } = require("../models");
const { Op } = require("sequelize");
const { isCompare } = require("../helpers/bcrypt");
const { generateToken } = require("../helpers/jwt");

// ========== Login ==========
exports.login = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const instance = await User.findOne({ where: { username } });
    if (!instance || !(await isCompare(password, instance.password))) {
      throw { name: "login failed" };
    }
    const access_token = generateToken(instance);
    const { role } = instance;
    res.status(200).json({ access_token, role });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

// ========== Find All ==========
exports.readAll = async (req, res, next) => {
  try {
    const { search, page, limit, sortBy, order } = req.query;
    let option = {
      order: [[sortBy || "username", order || "ASC"]],
      limit: +limit || 10,
      offset: page ? (+page - 1) * (+limit || 10) : 0,
      attributes: {
        exclude: ["password"],
      },
      where: { [Op.not]: { role: "Super Admin" } },
    };
    if (search) {
      option.where = {
        [Op.or]: [
          { username: { [Op.iLike]: `%${search}%` } },
          { email: { [Op.iLike]: `%${search}%` } },
        ],
        [Op.not]: { role: "Super Admin" },
      };
    }
    const { rows, count } = await User.findAndCountAll(option);
    res.status(200).json({ data: rows, total: count, page: +page || 1 });
  } catch (err) {
    next(err);
  }
};

// ========== Read One ==========
exports.readOne = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await User.findByPk(id, {
      attributes: {
        exclude: ["password"],
      },
      include: {
        model: ServiceCategory,
        attributes: ["id", "name"],
      },
    });
    if (!user) throw { name: "Not Found", param: "User" };
    res.status(200).json({ data: user });
  } catch (err) {
    next(err);
  }
};

// ========== Insert ==========
exports.createUser = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const instance = await User.create({ username, password, role: "user" });
    res
      .status(201)
      .json({ status: "Success", message: "New User has been registered" });
  } catch (err) {
    next(err);
  }
};

exports.createAdmin = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const instance = await User.create({ username, password, role: "admin" });
    res
      .status(201)
      .json({ status: "Success", message: "New Admin has been registered" });
  } catch (err) {
    next(err);
  }
};

// ========== Edit ==========
exports.update = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { username, password, role } = req.body;
    const instance = await User.findByPk(id);
    if (!instance) throw { name: "Not Found", param: "user" };
    await instance.update({ username, password, role });
    res
      .status(200)
      .json({ status: "Success", message: "User has been updated" });
  } catch (err) {
    next(err);
  }
};

// ========== Delete ==========
exports.destroy = async (req, res, next) => {
  try {
    const { id } = req.params;
    const instance = await User.findByPk(id);
    if (!instance) throw { name: "Not Found", param: "User" };
    await instance.destroy();
    res
      .status(200)
      .json({ status: "Success", message: "User has been deleted" });
  } catch (err) {
    next(err);
  }
};

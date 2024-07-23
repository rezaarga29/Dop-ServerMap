const { ServiceCategory, ServicePoint } = require("../models");

// ========== Create ==========
exports.create = async (req, res, next) => {
  try {
    const { name } = req.body;
    const UserId = req.user.id; // Mendapatkan UserId dari middleware req.user

    const serviceCategory = await ServiceCategory.create({ name, UserId });

    res.status(201).json({ status: "Success", data: serviceCategory });
  } catch (err) {
    next(err);
  }
};

// ========== Read All ==========
exports.readAll = async (req, res, next) => {
  try {
    const serviceCategories = await ServiceCategory.findAll({
      include: [{ model: ServicePoint, attributes: ["name", "address"] }],
    });
    res.status(200).json({ data: serviceCategories });
  } catch (err) {
    next(err);
  }
};

// ========== Read One ==========
exports.readOne = async (req, res, next) => {
  try {
    const { id } = req.params;
    const serviceCategory = await ServiceCategory.findByPk(id, {
      include: [{ model: ServicePoint, attributes: ["name", "address"] }],
    });
    if (!serviceCategory) {
      return res.status(404).json({ error: "ServiceCategory not found" });
    }
    res.status(200).json({ data: serviceCategory });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

// ========== Update ==========
exports.update = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const UserId = req.user.id; // Mendapatkan UserId dari middleware req.user

    const serviceCategory = await ServiceCategory.findByPk(id);
    if (!serviceCategory) {
      return res.status(404).json({ error: "ServiceCategory not found" });
    }

    await serviceCategory.update({ name, UserId });

    res.status(200).json({ status: "Success", data: serviceCategory });
  } catch (err) {
    next(err);
  }
};

// ========== Delete ==========
exports.destroy = async (req, res, next) => {
  try {
    const { id } = req.params;
    const serviceCategory = await ServiceCategory.findByPk(id);
    if (!serviceCategory) {
      return res.status(404).json({ error: "ServiceCategory not found" });
    }

    await serviceCategory.destroy();
    res
      .status(200)
      .json({ status: "Success", message: "ServiceCategory deleted" });
  } catch (err) {
    next(err);
  }
};

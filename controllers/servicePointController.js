const { ServicePoint, ServiceCategory } = require("../models");

exports.create = async (req, res, next) => {
  try {
    const {
      name,
      email,
      address,
      phone,
      latitude,
      longitude,
      open,
      closed,
      type,
    } = req.body;

    const servicePoint = await ServicePoint.create({
      name,
      email,
      address,
      phone,
      latitude,
      longitude,
      open,
      closed,
      type,
    });

    res.status(201).json({ status: "Success", data: servicePoint });
  } catch (err) {
    next(err);
  }
};

exports.readAll = async (req, res, next) => {
  try {
    const servicePoints = await ServicePoint.findAll({
      include: [{ model: ServiceCategory, attributes: ["id", "name"] }],
    });
    res.status(200).json({ data: servicePoints });
  } catch (err) {
    next(err);
  }
};

exports.readOne = async (req, res, next) => {
  try {
    const { id } = req.params;
    const servicePoint = await ServicePoint.findByPk(id, {
      include: [{ model: ServiceCategory, attributes: ["id", "name"] }],
    });
    if (!servicePoint) {
      return res.status(404).json({ error: "ServicePoint not found" });
    }
    res.status(200).json({ data: servicePoint });
  } catch (err) {
    next(err);
  }
};

exports.update = async (req, res, next) => {
  try {
    const { id } = req.params;
    const {
      name,
      email,
      address,
      phone,
      latitude,
      longitude,
      open,
      closed,
      type,
      isActive,
      ServiceCategoryId,
    } = req.body;

    const serviceCategory = await ServiceCategory.findByPk(ServiceCategoryId);
    if (!serviceCategory) {
      return res.status(404).json({ error: "ServiceCategory not found" });
    }

    const servicePoint = await ServicePoint.findByPk(id);
    if (!servicePoint) {
      return res.status(404).json({ error: "ServicePoint not found" });
    }

    await servicePoint.update({
      name,
      email,
      address,
      phone,
      latitude,
      longitude,
      open,
      closed,
      type,
      isActive,
      ServiceCategoryId,
    });

    res.status(200).json({ status: "Success", data: servicePoint });
  } catch (err) {
    next(err);
  }
};

exports.destroy = async (req, res, next) => {
  try {
    const { id } = req.params;
    const servicePoint = await ServicePoint.findByPk(id);
    if (!servicePoint) {
      return res.status(404).json({ error: "ServicePoint not found" });
    }

    await servicePoint.destroy();
    res
      .status(200)
      .json({ status: "Success", message: "ServicePoint deleted" });
  } catch (err) {
    next(err);
  }
};

exports.checkingNotFound = async (primaryKey, model, param) => {
  const instance = await model.findByPk(primaryKey);
  if (!instance) throw { name: "Not Found", param };
};

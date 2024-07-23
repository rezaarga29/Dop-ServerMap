const { decryptToken } = require("../helpers/jwt");

exports.authentication = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    if (authorization) {
      const [bearer, token] = authorization.split(" ");
      if (!bearer || bearer !== "Bearer" || !token)
        throw { name: "invalid token" };
      const user = decryptToken(token);
      if (!user.role || user.role !== "admin") throw { name: "access_denied" };
      req.user = user;
      next();
    } else {
      throw { name: "token not found" };
    }
  } catch (err) {
    next(err);
  }
};

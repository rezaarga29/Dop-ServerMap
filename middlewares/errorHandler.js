module.exports = (err, req, res, next) => {
  const { name, param } = err;
  let status = 500;
  let message = "Internal server error";
  if (name == "Not Found") {
    status = 404;
    message = `${param} is not found`;
  } else if (name == "token not found") {
    status = 401;
    message = "please login first";
  } else if (name == "access_denied") {
    status = 401;
    message = "access denied";
  } else if (name == "login failed") {
    status = 401;
    message = "username or password was wrong";
  } else if (name == "Wrong Password/PIN") {
    status = 401;
    message = `${param} was wrong`;
  } else if (name == "Bad Request") {
    status = 400;
    message = param;
  } else if (name == "SequelizeValidationError") {
    status = 400;
    message = err.errors[0].message;
  } else if (name == "SequelizeUniqueConstraintError") {
    status = 400;
    message = err.message;
  } else if (name == "invalid token" || name == "JsonWebTokenError") {
    status = 401;
    message = "Invalid Token";
  } else if (name == "forbidden") {
    status = 403;
    message = "Forbidden Access";
  }

  if (status == 500) {
    console.log(err, "<<<<< [[ ERROR ]]");
  }

  res.status(status).json({ message });
};

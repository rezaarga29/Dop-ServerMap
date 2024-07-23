const {
  readAll,
  readOne,
  createUser,
  createAdmin,
  login,
  update,
  destroy,
} = require("../controllers/userController");
const { authentication } = require("../middlewares/authentication");

const router = require("express").Router();

router.post("/register-user", createUser);
router.post("/register-admin", createAdmin);
router.post("/login", login);
router.get("/", readAll);
router.get("/:id", readOne);
router.put("/:id", authentication, update);
router.delete("/:id", authentication, destroy);

module.exports = router;

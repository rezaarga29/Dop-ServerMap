const {
  readAll,
  readOne,
  create,
  update,
  destroy,
} = require("../controllers/serviceCategoryController");
const { authentication } = require("../middlewares/authentication");

const router = require("express").Router();

router.post("/", authentication, create);
router.get("/", readAll);
router.get("/:id", readOne);
router.put("/:id", authentication, update);
router.delete("/:id", authentication, destroy);

module.exports = router;

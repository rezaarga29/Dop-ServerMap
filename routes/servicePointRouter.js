const {
  readAll,
  readOne,
  create,
  update,
  destroy,
} = require("../controllers/servicePointController");
const { authentication } = require("../middlewares/authentication");

const router = require("express").Router();

router.post("/", authentication, create);
router.get("/", readAll);
router.get("/:id", readOne);
router.put("/:id", update);
router.delete("/:id", destroy);

module.exports = router;

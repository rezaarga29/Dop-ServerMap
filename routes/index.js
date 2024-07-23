const router = require("express").Router();

router.get("/", (req, res) => {
  res.send("Hello World!");
});

router.use("/user", require("./userRouter"));
router.use("/service-category", require("./serviceCategoryRouter"));
router.use("/service-point", require("./servicePointRouter"));

module.exports = router;

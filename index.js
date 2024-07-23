const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();

const port = process.env.PORT || 3005;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(require("./routes"));
app.use(require("./middlewares/errorHandler"));

app.listen(port, () => console.log("listening on port " + port));

const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const cors = require("cors");

const userRouter = require("./routes/user");
const postRouter = require("./routes/post");

const app = express();

dotenv.config();
app.use(cors());
app.use(bodyParser.json());

const connectionParams = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
};

mongoose
  .connect(process.env.DB_CONNECTION, connectionParams)
  .then(() => {
    app.listen(process.env.PORT || 4000, () => console.log("App is up and running on port 4000"));
  })
  .catch((err) => {
    console.log(err);
  });

mongoose.set("useFindAndModify", false);

app.use("/user", userRouter);
app.use("/post", postRouter);

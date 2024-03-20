const mongoose = require("mongoose");
mongoose
  .connect("mongodb://localhost:27017/newsWebsite")
  .then(() => {
    console.log("mongodb connected");
  })
  .catch(() => {
    console.log("connection failed");
  });

const schema = new mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const collection = mongoose.model("user", schema);

module.exports = collection;

const mongoose = require("mongoose");

const imageSchema = new mongoose.Schema({
  imageUrl: {
    type: String,
    required: true,
  },
  class1: {
    type: String,
    required: true,
  },
});

module.exports = Image = mongoose.model("Image", imageSchema);

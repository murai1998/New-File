const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const listSchema = new Schema(
  {
    description: {
      type: String,
      required: true,
      unique: true,
      minlength: 1
    }
  },
  {
    timestamps: true
  }
);

const List = mongoose.model("List", listSchema);

module.exports = List;

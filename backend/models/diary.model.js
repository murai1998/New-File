const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const diarySchema = new Schema(
  {
    username: {
      type: String,
      required: true
    },
    userDate: { type: String, required: true },
    text: { type: String, required: true }
  },
  {
    timestamps: true
  }
);

const Diary = mongoose.model("Diary", diarySchema);

module.exports = Diary;

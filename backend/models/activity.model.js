const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const activitySchema = new Schema(
  {
    username: {
      type: String,
      required: true
    },
    requiredAct: {
      type: Number,
      required: true
    },
    activity: {
      type: Number,
      required: true
    },
    userDate: {
      type: String,
      required: true
    },
    weight: {
      type: Number,
      required: true
    }
  },
  {
    timestamps: true
  }
);

const Activity = mongoose.model(" Activity", activitySchema);

module.exports = Activity;

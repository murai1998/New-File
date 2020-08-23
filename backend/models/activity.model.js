const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const activitySchema = new Schema(
  {
    username: {
      type: String,
      required: true
    },
    requiredAct: {
      type: String,
      required: true
    },
    activity: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true
  }
);

const Activity = mongoose.model(" Activity", activitySchema);

module.exports = Activity;

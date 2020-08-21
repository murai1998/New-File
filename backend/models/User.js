const { Schema, model } = require("mongoose");
const PLM = require("passport-local-mongoose");

const userSchema = new Schema(
  {
    email: String,
    username: {
      type: String,
      minlength: 1,
      required: true
    },
    height: {
      type: Number,
      min: 0,
      required: true
    },
    gender: {
      type: String,
      required: true
    },
    birth: {
      type: Date,
      default: Date.now
    },
    googleId: String,
    imageUrl: String
  },
  {
    timestamps: true,
    versionKey: false
  }
);

userSchema.plugin(PLM, { usernameField: "email" });

module.exports = model("User", userSchema);

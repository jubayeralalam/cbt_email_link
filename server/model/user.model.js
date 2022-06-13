var mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    userName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    expireAt: {
      type: Date,
      required: true,
    },
    verified: {
        type: Boolean,
        required: true,
      }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);

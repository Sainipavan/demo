const { Schema, model } = require("mongoose");

const messageSchema = new Schema(
  {
    senderId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    groupId: {
      type: Schema.Types.ObjectId,
      ref: "groupChat",
    },
    message: {
      type: String,
      trim: true,
      lowercase: true,
    },
  },
  { timestamps: true, versionKey: false }
);

module.exports = model("Message", messageSchema);

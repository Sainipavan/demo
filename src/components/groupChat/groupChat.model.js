const { Schema, model } = require("mongoose");

const groupChatSchema = new Schema(
  {
    groupName: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      unique: true,
    },
    groupAdminId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    members: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
        unique: true,
      },
    ],
  },
  { timestamps: true, versionKey: false }
);

module.exports = model("GroupChat", groupChatSchema);

const GroupChat = require("./groupChat.model");
const Message = require("./message.model");

const doCreateGroup = async (groupName, userId) => {
  const groupChat = await GroupChat.findOne({ groupName });
  if (groupChat) {
    throw new Error("Group chat already exists");
  }
  const newGroupChat = new GroupChat({
    groupName,
    groupAdminId: userId,
  });
  await newGroupChat.save();
  return newGroupChat;
};

const doAddMembers = async (memberId, groupId) => {
  const groupChat = await GroupChat.findById(groupId);
  if (!groupChat) {
    return res.status(404).json({ error: "Group chat not found" });
  }
  const existingMemberIndex = groupChat.members.findIndex(
    (member) => member.toString() === memberId
  );
  if (existingMemberIndex !== -1) {
    return res
      .status(400)
      .json({ error: "Member already exists in the group" });
  }
  groupChat.members.push(memberId);
  await groupChat.save();
};

const addMessage = async (senderId, groupid, Message) => {
  const message = new Message({
    senderId,
    groupid,
    Message,
  });
  await message.save();
};
const listMessage = async (groupId) => {
  const aggregate = [];
  aggregate.push(
    {
      $match: {
        groupId,
      },
    },
    {
      $lookup: {
        from: "users",
        localField: "senderId",
        foreignField: "_id",
        as: "sender",
      },
    },
    {
      $lookup: {
        from: "groupChat",
        localField: "groupid",
        foreignField: "_id",
        as: "groupChat",
      },
    },
    {
      $sort: {
        createdAt: -1,
      },
    }
  );
  const messages = await Message.aggregate(aggregate);
  return messages;
};
module.exports = {
  doCreateGroup,
  doAddMembers,
  addMessage,
  listMessage,
};

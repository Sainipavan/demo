const { doCreateGroup, doAddMembers } = require("./groupChat.service");

const createGroup = async (req, res, next) => {
  try {
    const { groupName } = req.body;
    const userId = req.userId;
    console.log(groupName, userId);
    const groupDetails = await doCreateGroup(groupName, userId);
    return res.status(201).json({
      groupDetails,
      message: "group create  successful",
    });
  } catch (err) {
    next(err);
  }
};

const addMembers = async (req, res, next) => {
  try {
    const { groupId, memberId } = req.body;
    await doAddMembers(memberId, groupId);
    return res.status(200).json({
      message: "members added successfully",
    });
  } catch (err) {
    next(err);
  }
};

module.exports = { createGroup, addMembers };

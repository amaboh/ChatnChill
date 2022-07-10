import MessageModel from "../models/MessageModel.js";

export const addMessage = async (req, res) => {
  const { chatId, senderId, text } = req.body;

  const message = new MessageModel({
    chatId,
    senderId,
    text,
  });

  try {
    console.log(req.body.chatId, req.body.senderId)
    const result = await message.save();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json(err);
  }
};

export const getMessages = async (req, res) => {
  const { chatId } = req.params;
  console.log(chatId);

  try {
    const result = await MessageModel.find({chatId});
    console.log(result);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json(error);
  }
};

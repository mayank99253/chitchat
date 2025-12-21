import cloudinary from "../lib/cloudinary.js";
import { sender } from "../lib/resend.js";
import Message from "../models/Message.js";
import User from '../models/User.js'

export const getAllContacts = async (req, res) => {
    try {
        const loggedUseriId = req.user._id;
        const FilteredUser = await User.find({ _id: { $ne: loggedUseriId } }).select("-password")

        res.status(200).json(FilteredUser)
    } catch (error) {
        console.log("Error in get All Contacts", error)
        res.status(500).json({ message: "Server Error" })
    }
}

export const getMessagesByUserId = async (req, res) => {
    try {
        const myId = req.user._id;
        const { id: userToChatId } = req.params;

        const message = await Message.find({
            $or: [
                { senderId: myId, receiverId: userToChatId },
                { senderId: userToChatId, receiverId: myId }
            ],
        })
        return res.status(200).json(message); // 🔥 MOST IMPORTANT LINE
    } catch (error) {
        console.log("Error in get Message controller ", error.message);
        res.status(500).json({ message: "Internal Server Error" })
    }
}

export const sendMessages = async (req, res) => {
    try {
        const { text, image } = req.body;
        const { id: receiverId } = req.params;
        const senderId = req.user._id;

        let imageUrl;
        // upload base64 image to cloudinary 
        if (image) {
            const uploadResponse = await cloudinary.uploader.upload(imageUrl);
            imageUrl = uploadResponse.secure_url;
        }

        const newMessage = new Message({
            senderId,
            receiverId,
            text,
            image: imageUrl
        })
        await newMessage.save()

        // todo - send massage in real = time if user is online - socket.io

        res.status(201).json(newMessage)
    } catch (error) {
        console.log("Error in get Message controller ", error.message);
        res.status(500).json({ message: "Internal Server Error" })
    }
}

export const getChatPartners = async (req, res) => {
    try {
        const loggedInUserId = req.user._id
        // find all the messages where the logged-in user is either sender or receiver
        const messages = await Message.find({
            $or: [{ senderId: loggedInUserId, receiverId: loggedInUserId }],
        });

        const chatPartnerIds = [
            ...new Set(
                messages.map((msg) => {
                    msg.senderId.toString() === loggedInUserId.toString()
                        ? msg.receiverId.toString()
                        : msg.senderId.toString()
                })
            )
        ];
        const chatPartners = await User.find({ _id: { $in: chatPartnerIds } }).select("-password")

        res.status(200).json(chatPartners)
    } catch (error) {
        console.log("Error in get Message controller ", error.message);
        res.status(500).json({ message: "Internal Server Error" })
    }
}
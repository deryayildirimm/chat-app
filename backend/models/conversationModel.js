const mongoose = require('mongoose');

const conversationSchema = new mongoose.Schema({
    isGroup: { type: Boolean, default: false },
    name: { type: String },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Conversation" , conversationSchema);
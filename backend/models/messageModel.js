const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({

    conversationId: { type: mongoose.Schema.Types.ObjectId, ref: "Conversation", required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    text: { type: String, required: true },
    sentAt: { type: Date, default: Date.now },
    readBy: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    isDeleted: { type: Boolean, default: false },
});

// ... mevcut şeman değişmesin diye sadece index ekliyoruz:
messageSchema.index({ conversationId: 1, sentAt: -1 });

module.exports = mongoose.model("Message", messageSchema);
const mongoose = require('mongoose');

const userConversationSchema = new mongoose.Schema({

    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    conversationId: { type: mongoose.Schema.Types.ObjectId, ref: "Conversation", required: true },
    isArchived: { type: Boolean, default: false },
    isMuted: { type: Boolean, default: false },
    lastSeenAt: { type: Date, default: Date.now },
    joinedAt: { type: Date, default: Date.now },

});

// Aynı kullanıcı aynı konuşmaya iki kere eklenemesin:
userConversationSchema.index({userId : 1 ,conversationId: 1} , {unique:true});

module.exports = mongoose.model("UserConversation", userConversationSchema);
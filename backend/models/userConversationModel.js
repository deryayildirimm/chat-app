const mongoose = require('mongoose');

const userConversationSchema = new mongoose.Schema({

    userId : {type : mongoose.Schema.Types.ObjectId , ref: "User" , required : true},
    conversationId : {type : mongoose.Schema.Types.ObjectId, ref : "Conversation" , required : true},
    isArchived : {type : Boolean, default : false},
    isMuted : {type : Boolean, default : false},
    lastSeenAt : {type : Date, default : Date.now},
    joinedAt : {type : Date, default : Date.now},

});

module.export = mongoose.model("UserConversation", userConversationSchema );
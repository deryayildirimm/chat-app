const messageRepo = require("../repository/messageRepository");
const userConvRepo = require("../repository/userConversationRepository");
const conversationRepo = require("../repository/conversatinRepository");
const userRepo = require("../repository/userRepository");

module.exports = {

    sendMessage : async ({conversationId, userId, text}) => {

        if(!text || !text.trim()){
            const err= new Error("Mesaj metni boş olamaz!!");
            err.status = 400;
            throw err;
        }

        // uyelık kontrolu
        const inConv = await userConvRepo.findMembership(userId, conversationId);
        if(!inConv) {
            const err = new Error("Kullanıcı bu konuşmanın üyesi değil.");
            err.status = 403;
            throw err;
        }

        const mesg = await messageRepo.create({
            conversationId,
            userId,
            text : text.trim(),
        });

        // konusmanın son aktıvıte zamanını guncel tutmak ıcın 
        await conversationRepo.touchUpdatedAt(conversationId);

        return mesg;

        
    },
    listByConversation : async ({conversationId, userId, page, limit}) => {
          // uyelık kontrolu
        const inConv = await userConvRepo.findMembership(userId, conversationId);
        if(!inConv) {
            const err = new Error("Kullanıcı bu konuşmanın üyesi değil.");
            err.status = 403;
            throw err;
        }

        return await messageRepo.findByConversation(conversationId, {page, limit});
    },
    markRead : async ({conversationId, userId}) => {
            // uyelık kontrolu
        const inConv = await userConvRepo.findMembership(userId, conversationId);
        if(!inConv) {
            const err = new Error("Kullanıcı bu konuşmanın üyesi değil.");
            err.status = 403;
            throw err;
        }

        await messageRepo.markReadBy(conversationId, userId);
        await userConvRepo.updateLastSeen(userId, conversationId);

        return {ok : true};
        
    },
    deleteForAll : async ({messageId, userId}) => {
        
    },
    deleteForMe : async ({messageId, userId}) => {
        
    },

};
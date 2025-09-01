const BaseRepository = require("./base/BaseRepository");
const UserConversation  =require("../models/userConversationModel");


class UserConversationRepository extends BaseRepository{

    constructor() {
        super(UserConversation);
    }

    async findConversationsOfUser(userId) {
        return this.find(
            {userId},
            {
                populate : { path : "conversationId"},
                sort : { joinedAt : -1},
                lean : true
            }
        );
    }

    // uyelık kontrolu
    async findMembership(userId, conversationId) {
        return this.findOne({userId, conversationId}, { lean : true});
    }


    async updateLastSeen(userId, conversationId) {
        return UserConversation.findOneAndUpdate(
            {userId, conversationId},
            {lastSeenAt : Date.now()},
            {new : true}
        ).lean().exec();
    }

}

module.exports = new UserConversationRepository();
const BaseRepository = require("./base/BaseRepository");
const Conversation = require("../models/conversationModel");

class ConversationRepository extends BaseRepository {

    constructor() {
        super(Conversation);
    }

    // Konuşmada yeni mesaj vs. olduğunda liste sırasını güncel tutmak için
  async touchUpdatedAt(conversationId) {
    return this.updateById(conversationId, { updatedAt: Date.now() }, { lean: true });
  }


}
module.exports = new ConversationRepository();
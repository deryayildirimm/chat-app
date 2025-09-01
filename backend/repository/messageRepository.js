const BaseRepository = require("./base/BaseRepository");
const Message = require("../models/messageModel");

class MessageRepository extends BaseRepository{

    constructor() {
        super(Message);
    }

// Konuşmanın mesajlarını sayfalı getir (en yeni üstte)
  async findByConversation(conversationId, { page = 1, limit = 30 } = {}) {
    return this.paginate(
      { conversationId, isDeleted: false },
      {
        page,
        limit,
        sort: { sentAt: -1 },                          // en yeni mesaj en üstte
        populate: { path: "userId", select: "userName profilePicture" },
        lean: true
      }
    );
  }

  // Okundu işaretleme: kullanıcıyı readBy set'ine ekle (çiftlenme yok)
  async markReadBy(conversationId, userId) {
    await Message.updateMany(
      { conversationId, readBy: { $ne: userId } },
      { $addToSet: { readBy: userId } }
    ).exec();
  }


}

module.exports = new MessageRepository();
const messageService = require('../services/messageService');


module.exports = {

    async sendMessage(req, res) {

        const senderId = req.user && req.user.id;
        const { conversationId, text } = req.body;

        if (!senderId) return res.status(401).json({ message: "Kimlik doğrulaması gerekli!" });
        if (!conversationId) return res.status(400).json({ message: "conversationId zorunlu bir alandır." });
        if (!text || !text.trim()) return res.status(400).json({ message: "Mesaj alanı boş olamazz!" });

        try {
            const msg = await messageService.sendMessage({ conversationId, senderId, text });
            return res.status(201).json(msg);
        } catch (error) {
            const status = error.status || 500;
            return res.json(status).json({ message: error.message || "Sunucu hatası" });
        }

    },

    async listByConversation(req, res) {

        const userId = req.user && req.user.id;
        const { conversationId } = req.params;

        // TODO:: query string
        const page = parseInt(req.query.page || "1", 10);
        const limit = parseInt(req.query.limit || "30", 10);

        if (!userId) return res.status(401).json({ message: "Kimlik doğrulaması gerekli !" });
        if (!conversationId) return res.status(400).json({ message: "ConversationId gerekli !" });

        try {
            const result = await messageService.listMessages({ conversationId, userId, page, limit });
            return res.status(201).json(result);
        } catch (error) {
            const status = error.status || 500;
            return res.status(status).json({ message: error.message || "Sunucu hatası" });
        }

    },
    async markRead(req, res) {
        const userId = req.user && req.user.id;
        const { conversationId } = req.body;

        if (!userId) return res.status(401).json({ message: "Kimlik doğrulaması gerekli." });
        if (!conversationId) return res.status(400).json({ message: "conversationId zorunludur." });

        try {
            const answ = await messageService.markRead({ conversationId, userId });
            return res.status(201).json(answ);
        } catch (e) {
            const status = e.status || 500;
            return res.status(status).json({ message: e.message || "Sunucu hatası" });
        }
    },
    // DELETE /api/messages/:messageId  -> herkesten sil
    async deleteForAll(req, res) {
        const userInfo = req.user && req.user.id;
        const { messageId } = req.params;

        if (!userInfo) return res.status(401).json({ message: "Kimlik doğrulaması gerekli" });
        if (!messageId) return res.status(400).json({ message: "messageId boş olamaz" });

        try {

            const answ = await messageService.deleteForAll({ messageId, userId });
            return res.status(200).json(answ);

        } catch (error) {
            return res.status(error.status || 500).json({ message: error.message || "Sunucu hatası" });
        }


    },
    // DELETE /api/messages/:messageId/me  -> benden sil
    async deleteForMe(req, res) {
        const userId = req.user && req.user.id;
        const { messageId } = req.params;
        if (!userId) return res.status(401).json({ message: "Kimlik doğrulaması gerekli." });
        if (!messageId) return res.status(400).json({ message: "messageId zorunludur." });

        try {
            const r = await messageService.deleteForMe({ messageId, userId });
            return res.status(200).json(r);
        } catch (e) {
            return res.status(e.status || 500).json({ message: e.message || "Sunucu hatası" });
        }
    },

};
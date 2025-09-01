const express = require('express');
const router = express.Router();
const authentication  =require('../middlewares/authMiddleware');
const messageController = require('../controllers/messageController'); 
/*
POST /api/messages – Yeni mesaj gönder

GET /api/messages/:conversationId – Bir conversation’ın tüm mesajlarını getir

DELETE /api/messages/:messageId – Mesajı sil

PATCH /api/messages/:id/read – Mesajı okundu olarak işaretle

GET /api/messages/unread – Okunmamış mesajlar
*/

router.post('/' , authentication, messageController.sendMessage );
router.get('/:conversationId' , authentication, messageController.listByConversation);
router.post('/read', authentication , messageController.markRead);
// router.delete('/:messageId' , authentication, messageController.deleteMessage);

module.exports = router;
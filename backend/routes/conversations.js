express = require('express');
const convController = require("../controllers/conversationController");
const authentication = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/direct" , authentication, convController.startDirect);
router.post("/group" , authentication, convController.startGroup);
router.get("/me" , authentication, convController.listMine);

module.exports = router;


/*
POST /api/conversations – Yeni bir conversation başlat (örneğin: { members: [user1, user2] })

GET /api/conversations – Kullanıcının tüm conversation'larını getir

GET /api/conversations/:id – Bir conversation’ı detaylı getir

DELETE /api/conversations/:id – Sohbeti sil

Ekstra özelliklere göre:

PATCH /api/conversations/:id/archive – Arşivleme

PATCH /api/conversations/:id/mute – Sessize alma
*/
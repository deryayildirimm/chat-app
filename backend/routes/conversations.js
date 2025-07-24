/*
POST /api/conversations – Yeni bir conversation başlat (örneğin: { members: [user1, user2] })

GET /api/conversations – Kullanıcının tüm conversation'larını getir

GET /api/conversations/:id – Bir conversation’ı detaylı getir

DELETE /api/conversations/:id – Sohbeti sil

Ekstra özelliklere göre:

PATCH /api/conversations/:id/archive – Arşivleme

PATCH /api/conversations/:id/mute – Sessize alma
*/
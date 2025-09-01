
const userRepo = require("../repository/userRepository");
const userConvRepo = require("../repository/userConversationRepository");
const conversationRepo = require("../repository/conversatinRepository");
const { startGroup } = require("../controllers/conversationController");


module.exports = {

    // birebir konusma baslat
    /** 
     * 1) peer var mı 
     * 2) aynı ikili arasında hali hazırda konusma var mı 
     * 3) konusmayı yarat + ıkılı uyelık kaydı 
    */
    startDirect: async ({ creatorId, peerId }) => {
        // 1) does this user even exists ?? 
        const peer = await userRepo.findById(peerId, { select: "_id isActive", lean: true });
        if (!peer || peer.isActive === false) {
            const err = new Error("Hedef kullanıcı bulunamadı veya pasif.");
            err.status = 404;
            throw err;
        }

        // 2) daha oncesınde konusmuslar mı 
        const myMemberships = await userConvRepo.find(
            { userId: creatorId },
            { select: "conversationId", lean: true }
        );

        for (const m of myMemberships) {
            const convId = m.conversationId?._id || m.conversationId;
            if (!convId) continue;

            // grup mu ? 
            const conv = await conversationRepo.findOne(
                { _id: convId, isGroup: false },
                { select: "_id", lean: true }
            );
            // grupsa atlıyoruz
            if (!conv) continue;

            // peer bu konusmada uye mı ? 
            const peerMembership = await userConvRepo.findOne(
                { userId: peerId, conversationId: convId },
                { lean: true }
            );
            if (peerMembership) {
                // zaten var olan birebir konusmayı dondur
                return await conversationRepo.findById(convId, { lean: true });
            }
        }

        // 3) yenı konusma olustur
        const conversation = await conversationRepo.create(
            {
                isGroup: false,
                createdBy: creatorId
            }
        );

        await userConvRepo.createMany([
            { userId: creatorId, conversationId: conversation._id },
            { userId: peerId, conversationId: conversation._id },

        ]);

        return conversation;
    },

    /**
     * Grup konusması
     * 
     */
    startGroup: async ({ creatorId, name, memberIds = [] }) => {
        if (!name || !name.trim()) {
            const err = new Error("Grupd adı zorunludur.");
            err.status = 400;
            throw err;
        }

        const conversation = await conversationRepo.create({
            isGroup: true,
            name: name.trim(),
            createdBy: creatorId
        });

        const uniqueMembers = Array.from(
            new Set([String(creatorId), ...memberIds.map(String)])
        );

        await userConvRepo.createMany(
            uniqueMembers.map(uid => (
                { userId: uid, conversationId: conversation._id }
            ))
        );

        return conversation;
    },

    /**
     * Kullanıcının konusmalarını lıstelemek
     * @param {} userId 
     */
    listForUser: async (userId) => {

        const rows = await userConvRepo.findConversationsOfUser(userId);

        rows.sort((a, b) => {
            const au = new Date(a.conversationId?.updatedAt || a.conversationId?.createdAt || 0).getTime();
            const bu = new Date(b.conversationId?.updatedAt || b.conversationId?.createdAt || 0).getTime();
            return bu - au; // DESC
        });

        return rows.map(uc => ({
            conversation: uc.conversationId,
            isMuted: uc.isMuted,
            isArchived: uc.isArchived,
            lastSeenAt: uc.lastSeenAt,
            joinedAt: uc.joinedAt
        }));

    },


};
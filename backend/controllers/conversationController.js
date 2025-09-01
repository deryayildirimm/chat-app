const conversationService = require("../services/conversationService");

module.exports = {

    async startDirect(req, res) {
        const creatorId = req.user && req.user.id;
        const {peerId} = req.body;
        // validasyon
        if(!creatorId) return res.status(401).json({message : "Kimlik doğrulaması gereklidir."});
        if(!peerId) return res.status(400).json({message : "peerId zorunludur"});

        try{
            const conv = await conversationService.startDirect({creatorId, peerId});
            return res.status(201).json(conv);
        }catch(e){
            const status = e.status || 500;
            return res.status(status).json({message : e.message || "Sunucu hatası"});
        }

    },

    async startGroup(req, res) {
        const creatorId = req.user && req.user.id;
        const {name, memberIds} = req.body; 

        if(!creatorId) return res.status(401).json({message:"Kimlik doğrulaması gerekli."});
        if(!name || !name.trim()) return res.status(400).json({message:"Grup adı zorunludur."});

        try {

            const conv = await conversationService.startGroup({creatorId, name, memberIds});
            return res.status(201).json(conv);
            
        } catch (error) {
            const status = error.status || 500;
            return res.status(status).json({message : error.message || "Sunucu hatası"});
        }

    },

    async listMine(req,res) {
        const userId = req.user && req.user.id;
        if(!userId) return res.status(401).json({message:"Kimlik doğrulaması gerekli"});

        try{
            const data = await conversationService.listForUser(userId);
            return res.status(201).json(data);
        }catch (error) {
            const status = error.status || 500;
            return res.status(status).json({message : error.message || "Sunucu hatası"});
        }
    }

}
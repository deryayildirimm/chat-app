const mongoose = require('mongoose');

const uri = 'mongodb+srv://admin:123456.@chat-app-cluster.lkl2xil.mongodb.net/chatApp?retryWrites=true&w=majority&appName=chat-app-cluster';

async function connectDB() {
    try {
        await mongoose.connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('MongoDB bağlantısı başarılı ✅');
    } catch (err) {
        console.error('MongoDB bağlantı hatası ❌', err);
        process.exit(1);
    }
}

module.exports = { connectDB };

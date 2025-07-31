const mongoose = require('mongoose');

const uri = process.env.DB_URL;

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

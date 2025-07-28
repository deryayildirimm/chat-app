require("dotenv").config();

const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const app = express(); // Creates an Express application
const server = http.createServer(app);
const io = new Server(server);

const cors = require("cors");
const authRoutes = require('./routes/auth');
const errorHandler = require('./errors/errorHandler');
const { connectDB } = require('./config/db');
const { swaggerUi, swaggerSpec } = require('./config/swagger');
const AppError = require("./errors/AppError");

connectDB();


const allowedOrigins = [
  process.env.FRONTEND_URL,
  'http://localhost:3000' 
];
console.log("✅ FRONTEND_URL:", process.env.FRONTEND_URL);

app.use(cors({
  origin: function (origin, callback) {
    console.log("🟡 Gelen origin:", origin);
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new AppError("Not allowed by CORS", 403));
    }
  },
  credentials: true
}));

//JSON Body i okuyabilmek için 
app.use(express.json());
app.use('/api/auth', authRoutes); // URL /api/auth ile başlıyorsa authRoutes'a yönlendir
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

io.on('connection', (socket) => {

    socket.on('chat-message', (data) => {
        const now = new Date();
        const time = now.toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' });

        const messageData = {
            user: data.user,
            text: data.text,
            time: time
        };

        console.log(`[${messageData.time}] ${messageData.user}: ${messageData.text}`);
        io.emit('chat-message', messageData);
    });

    socket.on('disconnect', () => {
        console.log('Kullanıcı ayrıldı:', socket.id);
    });
});




app.use(express.static('public'));
app.use(errorHandler);


server.listen(3000, () => {
    console.log("Server çalışıyor. ");
});

console.log("JWT_SECRET:", process.env.JWT_SECRET);


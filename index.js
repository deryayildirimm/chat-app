const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const app = express(); // Creates an Express application
const server = http.createServer(app);
const io = new Server(server);

const authRoutes = require('./routes/auth');
const errorHandler = require('./errors/errorHandler');
const { connectDB } = require('./config/db');
const { swaggerUi, swaggerSpec } = require('./config/swagger');

connectDB();

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



require("dotenv").config();

const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const app = express(); // Creates an Express application
const server = http.createServer(app);
const io = new Server(server);

const cors = require("cors");
const authRoutes = require('./routes/auth');
const conversationRoutes = require("./routes/conversations");
const msgRoutes = require('./routes/message');
const errorHandler = require('./errors/errorHandler');
const { connectDB } = require('./config/db');
const swaggerUi = require("swagger-ui-express");
const YAML = require("yamljs");
const AppError = require("./errors/AppError");
const errorMessages = require("./constants/errorMessages");
const path = require("path");

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
      callback(new AppError(errorMessages.CORS_ERROR, 403));
    }
  },
  credentials: true
}));

//JSON Body i okuyabilmek için 
app.use(express.json());
app.use('/api/auth', authRoutes); // URL /api/auth ile başlıyorsa authRoutes'a yönlendir
app.use("/api/conversations", conversationRoutes);
app.use("/api/messages", msgRoutes)

const swaggerDoc = YAML.load(path.join(__dirname, 'docs', 'openapi.yaml'));
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc, { explorer: true }));

app.use(errorHandler);

server.listen(3000, () => {
    console.log("Server çalışıyor. ");
});





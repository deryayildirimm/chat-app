# 💬 ChatApp

A modern real-time messaging application built using the **MERN stack**.  
ChatApp supports secure user authentication and provides a clean, responsive interface for messaging.

> 🚧 This project is actively under development. New features and improvements are on the way!
![Rick and Morty Chat](https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExb2x0N2pudzQ4c3BidDdnZG9mcXVtcDBweXVtZ3VobmNveDU1bDU5eiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/FPnjfwDsasfp9pz0d0/giphy.gif)

---

## 🛠️ Technologies Used

### 🔙 Backend

- **Node.js** with **Express.js**
- **MongoDB Atlas** (Cloud database)
- **Mongoose** (ODM)
- **JWT** for authentication
- **Socket.IO** for real-time communication
- **Swagger UI** for API documentation

### 🔜 Frontend

- **React.js**
- **React Router DOM**
- **Axios** for API requests

---

## 📘 API Documentation

You can explore and test the backend API via Swagger:

👉 `http://localhost:3000/api-docs`

---


## 🚀 Getting Started

To run the project locally:

### 1. Clone the repository

```bash
git clone https://github.com/deryayildirimm/chat-app.git
cd chat-app
```

### 2. Setup environment variables

Create a `.env` file in the `backend` folder with the following content:

```env
PORT=5000
MONGO_URI=your_mongo_connection_string
JWT_SECRET=your_jwt_secret
```

### 3. Install dependencies and run both apps

#### Backend

```bash
cd backend
npm install
npm start
```

#### Frontend

```bash
cd ../frontend
npm install
npm run dev
```

Now visit `http://localhost:5173` to see the frontend and test the application.

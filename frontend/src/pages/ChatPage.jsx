import "./ChatPage.css";
import { useState } from "react";
import { ChatBox, ChatList,SideBar } from "../components/Chat";


const ChatPage = () => {
  const [showUserList, setShowUserList] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedChat, setSelectedChat] = useState(null);


  const chatData = [
    {
      id: 1,
      user: { name: "Ali", avatar: "https://i.pravatar.cc/150?img=1" },
      messages: ["Selam, nasılsın?", "Akşam görüşürüz", "İyi geceler 🌙"],
      lastMessage: "Selam, nasılsın?",
    },
    {
      id: 2,
      user: { name: "Ayşe", avatar: "https://i.pravatar.cc/150?img=2" },
      messages: ["Fotoğrafları attım", "Yarın erken çıkacağım", "Görüşürüz"],
      lastMessage: "Yarın buluşalım mı?",
    },
    {
      id: 3,
      user: { name: "Zeynep", avatar: "https://i.pravatar.cc/150?img=3" },
       messages: ["Tamamdır, haber veririm."],
      lastMessage: "Tamamdır, haber veririm.",
    },
    {
      id: 4,
      user: { name: "Mert", avatar: "https://i.pravatar.cc/150?img=4" },
       messages: ["Teşekkürler 😊"],
      lastMessage: "Teşekkürler 😊",
    },
    {
      id: 5,
      user: { name: "Elif", avatar: "https://i.pravatar.cc/150?img=5" },
       messages: ["Fotoğrafları yolladım."],
      lastMessage: "Fotoğrafları yolladım.",
    },
  ];

  const userData = [
    {
      id: 10,
      name: "Mehmet",
      email: "mehmet@example.com",
      avatar: "https://i.pravatar.cc/150?img=8",
    },
    {
      id: 11,
      name: "Zeynep",
      email: "zeynep@example.com",
      avatar: "https://i.pravatar.cc/150?img=18",
    },
  ];

 const filteredChats = chatData.filter(chat =>
  Array.isArray(chat.messages) &&
  chat.messages.some(message =>
    message.toLowerCase().includes(searchQuery.toLowerCase())
  )
);


  return (
    <div className="chat-layout">
      <aside className="sidebar">
        <SideBar />
      </aside>

      <section className="chat-list">
        <div className="chatlist-navbar">
          <h2>Sohbetler</h2>
          <span
            className="user-toggle"
            onClick={() => setShowUserList(!showUserList)}
          >
            👤
          </span>
        </div>

        <input
          type="text"
          placeholder="Mesajlarda ara..."
          className="chat-search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        <ChatList
          mode={showUserList ? "users" : "chats"}
          data={filteredChats}
          onItemClick={(item) => setSelectedChat(item)}
        />
      </section>

      <main className="chat-box">
        <ChatBox selectedChat={selectedChat} />
      </main>
    </div>
  );
};

export default ChatPage;

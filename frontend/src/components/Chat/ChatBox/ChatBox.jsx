import "./ChatBox.css";

const ChatBox = ({ selectedChat }) => {
  return (
    <main className="chat-box">
      {selectedChat ? (
        <div className="chat-box-content">
          <h3>{selectedChat.user.name}</h3>

          {selectedChat.messages && selectedChat.messages.length > 0 ? (
            <ul className="chat-message-list">
              {selectedChat.messages.map((msg, index) => (
                <li key={index}>{msg}</li>
              ))}
            </ul>
          ) : (
            <p className="empty-chat">Henüz mesaj yok. İlk mesajı gönder!</p>
          )}
        </div>
      ) : (
        <div className="chat-box-placeholder">
          <p>Bir kişi seçin 👈</p>
        </div>
      )}
    </main>
  );
};

export default ChatBox;

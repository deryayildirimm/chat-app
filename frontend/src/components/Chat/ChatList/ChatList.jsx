import "./ChatList.css";

const ChatList = ({ mode, data, onItemClick }) => {
  return (
    <>
      <div className="chat-list-wrapper">
        {data.map((item) => (
          <div
            key={item.id}
            className="chat-list-item"
            onClick={() => onItemClick(item)}
          >
            <img
              src={
                mode === "users"
                  ? item.avatar
                  : item.user.avatar || `https://i.pravatar.cc/150?u=${item.id}`
              }
              alt="avatar"
              className="chat-list-avatar"
            />
            <div className="chat-list-info">
              <p className="chat-list-title">
                {mode === "users" ? item.name : item.user.name}
              </p>
              <p className="chat-list-subtext">
                {mode === "users" ? item.email : item.lastMessage}
              </p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default ChatList;

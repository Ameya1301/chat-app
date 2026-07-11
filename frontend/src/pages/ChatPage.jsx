import React from "react";
import toast from "react-hot-toast";
function ChatPage() {
  return (
    <div>
      chatPage
      <button onClick={() => toast.success("you clicked")}>Click me</button>
    </div>
  );
}

export default ChatPage;

import React, { useState } from "react";

export interface MyMessagesProps {
  message: { recipient: string; message: string; type: string }; // Structured prop
}

const MyMessages: React.FC<MyMessagesProps> = ({ message: initialMessage }) => {
  const { recipient, type, message: initialMessageText } = initialMessage;
  const [messages, setMessages] = useState<string[]>([initialMessageText]);
  const [newMessage, setNewMessage] = useState("");

  const handleAddMessage = () => {
    if (newMessage.trim()) {
      setMessages((prevMessages) => [...prevMessages, newMessage]);
      setNewMessage("");
    }
  };

  return (
    <div className="flex flex-col px-6 py-6 mt-9 w-full text-base font-semibold rounded-3xl border-2 border-solid bg-stone-50 border-neutral-200">
      {/* Recipient Name */}
      <h3 className="text-4xl leading-tight px-4">{recipient}</h3>

      {/* Message Type */}
      <p className="text-xl text-gray-600 px-4">
        <strong>{type}</strong> 
      </p>

      {/* Messages */}
      <div className="mt-4 px-4">
        <ul className="mt-2">
          {messages.map((msg, index) => (
            <li
              key={index}
              className="mb-2 text-neutral-700 text-xl border-b border-gray-300 pb-2 text-right"
            >
              {msg}
            </li>
          ))}
        </ul>
      </div>

      {/* Input for Adding New Message */}
      <div className="flex items-center gap-2 mt-6 px-4">
        <input
          type="text"
          placeholder="Responde a esta mensagem"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-lime-500"
        />
        <button
          onClick={handleAddMessage}
          className="px-6 py-2 bg-lime-600 text-white font-medium rounded-lg hover:bg-[#2e9578] transition"
        >
          Enviar Mensagem
        </button>
      </div>
    </div>
  );
};

export default MyMessages;

'use client';

import React, { useState, useRef, useEffect } from 'react';

interface Message {
  id: number;
  text: string | null;
  file: File | null;
  sender: number;
  timestamp: string;
}

const ChatApp = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [activeUser, setActiveUser] = useState(1);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim() || file) {
      setMessages([
        ...messages,
        {
          id: Date.now(),
          text: newMessage || null,
          file: file || null,
          sender: activeUser,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        }
      ]);
      setNewMessage('');
      setFile(null);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null;
    setFile(selectedFile);
  };

  return (
    <div className="h-screen flex flex-col bg-white">
      {/* Header */}
      <div className="bg-white border-b shadow-sm">
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <h1 className="text-xl font-semibold text-gray-800">Wohnwert Messenger</h1>
            <div className="flex gap-2">
              <button
                onClick={() => setActiveUser(1)}
                className={`px-4 py-2 rounded-lg transition-all duration-200 ${activeUser === 1 ? 'bg-blue-50 text-blue-600' : 'hover:bg-gray-100 text-gray-700'}`}
              >
                Person 1
              </button>
              <button
                onClick={() => setActiveUser(2)}
                className={`px-4 py-2 rounded-lg transition-all duration-200 ${activeUser === 2 ? 'bg-blue-50 text-blue-600' : 'hover:bg-gray-100 text-gray-700'}`}
              >
                Person 2
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Chat Container */}
      <div className="flex-1 overflow-hidden bg-white">
        <div className="max-w-4xl mx-auto h-full px-4 py-6 overflow-y-auto">
          <div className="flex flex-col gap-2">
            {messages.map((message, index) => (
              <div key={message.id} className={`flex ${message.sender === activeUser ? 'justify-end' : 'justify-start'}`}>
                <div className="flex flex-col max-w-[70%]">
                  {message.text && (
                    <div className={`px-4 py-2 rounded-lg ${message.sender === activeUser ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-900'}`}>
                      {message.text}
                    </div>
                  )}
                  {message.file && (
                    <div className="mt-2">
                      {message.file.type.startsWith('image/') ? (
                        <img src={URL.createObjectURL(message.file)} alt="Uploaded" className="max-w-full rounded-lg" />
                      ) : (
                        <a href={URL.createObjectURL(message.file)} download={message.file.name} className="text-blue-500 underline">
                          {message.file.name}
                        </a>
                      )}
                    </div>
                  )}
                  <span className="text-xs text-gray-500 mt-1">
                    {message.timestamp}
                  </span>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
        </div>
      </div>

      {/* Message Input */}
      <div className="bg-white border-t">
        <div className="max-w-4xl mx-auto p-4">
          <form onSubmit={handleSend} className="flex gap-2">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Aa"
              className="flex-1 rounded-full text-gray-700 bg-gray-100 border-0 px-6 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-500"
            />
            <input
              type="file"
              onChange={handleFileChange}
              className="hidden"
              id="file-upload"
            />
            <label
              htmlFor="file-upload"
              className="px-4 py-3 rounded-full bg-gray-100 text-gray-700 cursor-pointer hover:bg-gray-200"
            >
              Attach
            </label>
            <button
              type="submit"
              className="px-6 py-3 rounded-full bg-blue-500 text-white font-semibold hover:bg-blue-600 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={!newMessage.trim() && !file}
            >
              Send
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChatApp;

'use client';

import React, { useState, useRef, useEffect } from 'react';
import Dropdown from './components/dropdown';


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
  const [selectedDropdownItem, setSelectedDropdownItem] = useState<string | null>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

 
  const options = [
    "Wohnwert AGB",
    "Vertriebspartnervertrag",
    "Personalausweis-Kopie", 
    "Nachweis § 34 c", 
    "Gewerbeanmeldung", 
    "Polizeiliches Führungszeugnis", 
    "Unbedenklichkeits­bescheinigung",
    "Sonstiges",
    "Abbrechen"
  ];


  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() && !file && !selectedDropdownItem) return;
  
    const newMessageObject = {
      id: Date.now(), // or a unique ID generator
      text: newMessage.trim(),
      file: file || null,
      dropdownSelection: selectedDropdownItem,
      sender: activeUser,
      timestamp: new Date().toLocaleTimeString(),
    };
  
    setMessages([...messages, newMessageObject]);
    setNewMessage('');
    setFile(null);
    setSelectedDropdownItem(null); // Reset dropdown after sending
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    const selectedFile = e.target.files?.[0] || null;
    setFile(selectedFile);
  };

  return (
    <div className="h-screen flex flex-col bg-white">
      {/* Header */}
      <div className="bg-white border-b shadow-sm">
        <div className="max-w-2xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <h1 className="text-xl font-semibold text-gray-800">Wohnwert Back Office Messenger</h1>
            <div className="flex gap-2">
              <button
                onClick={() => setActiveUser(1)}
                className={`px-4 py-2 rounded-lg transition-all duration-200 ${activeUser === 1 ? 'bg-blue-50 text-orange-600' : 'hover:bg-gray-100 text-gray-700'}`}
              >
                Person 1
              </button>
              <button
                onClick={() => setActiveUser(2)}
                className={`px-4 py-2 rounded-lg transition-all duration-200 ${activeUser === 2 ? 'bg-blue-50 text-orange-600' : 'hover:bg-gray-100 text-gray-700'}`}
              >
                Person 2
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Chat Container */}
      <div className="flex-1 overflow-hidden bg-white">
        <div className="max-w-2xl mx-auto h-full px-4 py-6 overflow-y-auto">
          <div className="flex flex-col gap-2">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`w-full flex ${
                  message.sender === activeUser ? 'justify-end' : 'justify-start'
                }`}
              >
                <div
                  className={`w-3/5 flex justify-center ${
                    message.sender === activeUser
                      ? 'pr-4' 
                      : 'pl-4'
                  }`}
                >
                  <div
                    className={`flex flex-col p-4 max-w-[80%] border-5 rounded-2xl ${
                      message.sender === activeUser
                        ? 'border-orange-500'
                        : 'border-gray-300'
                    }`}
                  >
                      {message.text && (
                        <div
                          className={` bg-white text-gray-900 break-words `}
                        >
                          {message.text}
                        </div>
                      )}
                      {message.file && (
                        <div className="mt-2">
                          {message.file.type.startsWith('image/') ? (
                            <img
                              src={URL.createObjectURL(message.file)}
                              alt="Uploaded"
                              className="max-w-full rounded-lg"
                            />
                          ) : (
                            <a
                              href={URL.createObjectURL(message.file)}
                              download={message.file.name}
                              className="text-orange-500 underline"
                            >
                              {message.file.name}
                            </a>
                          )}
                        </div>
                      )}
                      <span className={`text-xs text-gray-500 mt-1 flex ${
                        message.sender === activeUser
                          ? 'justify-end mr-1'
                          : 'justify-start ml-1'
                      }`}>
                        {message.timestamp}
                      </span>
                    </div>
                  </div>
                </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
        </div>
      </div>


      {/* Message Input */}
      <div className="bg-white border-t">
        <div className="max-w-2xl mx-auto p-4">
          <form onSubmit={handleSend} className="space-y-4">
            {/* Input Section */}
            <div>
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Input your text here ..."
                className="w-full rounded-full text-gray-700 bg-gray-100 border-0 px-6 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500 placeholder-gray-500"
              />
            </div>

            {/* Buttons Section */}
            <div className="flex items-center gap-2 justify-center">
              <input
                type="file"
                onChange={handleFileChange}
                className="hidden"
                id="file-upload"
              />
              <label
                htmlFor="file-upload"
                className="flex items-center justify-center px-6 py-3 rounded-full bg-gray-100 text-gray-700 cursor-pointer hover:bg-gray-200 font-semibold"
              >
                Attach
              </label>

              <Dropdown buttonText="Dokument Auswählen" items={options} />

              <button
                type="submit"
                className="px-6 py-3 rounded-full bg-orange-500 text-white font-semibold hover:bg-orange-600 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={!newMessage.trim() && !file}
              >
                Send
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>

  );
};

export default ChatApp;

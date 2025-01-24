'use client';

import React, { useState, useRef, useEffect } from 'react';
import Dropdown from './components/dropdown';
import logo from "../public/Logo_Wohnwert.jpg";


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
  const [selectedDropdownItem, setSelectedDropdownItem] = useState(null);
  const [temporaryDropdownSelection, setTemporaryDropdownSelection] = useState(null);
  const [resetDropdown, setResetDropdown] = useState(false);
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
    "Exposé",
    "Sonstiges",
    "Abbrechen"
  ];

  const virtualUserMessages = [
    "Hallo, ja gerne",
    "Danke. Wie ist die genaue Adresse von diesem Objekt?",
    "Super, sieht gut aus!",
    "Dienstag Vormittag wäre nice.",
    "Prima! Bis dann ...",
  ];

  const currentMessageIndex = useRef(0);


  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
  
    // Prevent sending empty messages
    if (!newMessage.trim() && !file && !selectedDropdownItem) return;
  
    const now = new Date();
  
    // Create the new message object
    const newMessageObject = {
      id: Date.now(),
      text: newMessage.trim(),
      file: file || null,
      dropdownSelection: selectedDropdownItem,
      sender: activeUser,
      timestamp: `${now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} ― ${now.toLocaleDateString([], { day: '2-digit', month: '2-digit', year: 'numeric' })}`,
    };
  
    // Add the new message to the messages array
    setMessages([...messages, newMessageObject]);
  
    // Reset inputs
    setNewMessage('');
    setFile(null);
    setSelectedDropdownItem(null);
    setResetDropdown(true);
  
    // Switch the active user
    setActiveUser(activeUser === 1 ? 2 : 1);
  
    // Send a virtual message after a delay
    setTimeout(() => {
      if (currentMessageIndex.current < virtualUserMessages.length) {
        const now = new Date(); // Get current timestamp for the virtual message
  
        // Get the next virtual message in order
        const randomMessage = virtualUserMessages[currentMessageIndex.current];
  
        // Create the virtual message object
        const virtualMessage = {
          id: Date.now(),
          text: randomMessage.trim(),
          file: null, // Assuming no file for virtual messages
          dropdownSelection: null, // Assuming no dropdown selection for virtual messages
          sender: activeUser === 1 ? 2 : 1, // Alternate sender
          timestamp: `${now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} ― ${now.toLocaleDateString([], { day: '2-digit', month: '2-digit', year: 'numeric' })}`,
        };
  
        // Add the virtual message to the messages array
        setMessages((prevMessages) => [...prevMessages, virtualMessage]);
  
        // Increment the message index
        currentMessageIndex.current += 1;
  
        // Keep the active user unchanged
        setActiveUser(activeUser);
      }
    }, 2000);
  };
  

  useEffect(() => {
    if (resetDropdown) {
      setResetDropdown(false); 
    }
  }, [resetDropdown]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    const selectedFile = e.target.files?.[0] || null;
    setFile(selectedFile);
  };

  const handleDropdownSelect = (item) => {
    // setSelectedDropdownItem(item);
    setTemporaryDropdownSelection(item);
  };

  const handleAttach = () => {
    if (temporaryDropdownSelection) {
      setSelectedDropdownItem(temporaryDropdownSelection);
      setTemporaryDropdownSelection(null); // Clear temporary state after attachment
    }
  };

  return (
    <div className="h-screen flex flex-col bg-white">
      {/* Header */}
      <div className="bg-white border-b shadow-sm">
        <div className="max-w-2xl mx-auto px-4 relative">
          <div className="flex items-center justify-between h-20">
            <h1 className="text-xl font-semibold text-gray-800">Wohnwert Back Office Messenger</h1>
            {/* <div className="flex gap-2">
              
              <button
                onClick={() => setActiveUser(1)}
                className={`px-4 py-2 rounded-lg transition-all duration-200 ${
                  activeUser === 1 ? 'bg-blue-50 text-orange-600' : 'hover:bg-gray-100 text-gray-700'
                }`}
              >
                Person 1
              </button>
              <button
                onClick={() => setActiveUser(2)}
                className={`px-4 py-2 rounded-lg transition-all duration-200 ${
                  activeUser === 2 ? 'bg-blue-50 text-orange-600' : 'hover:bg-gray-100 text-gray-700'
                }`}
              >
                Person 2
              </button>

            </div> */}
          </div>
        </div>
        <img
            className="absolute top-0 left-[9%] h-20 "
            src="/Logo_Wohnwert.jpg"
            alt="Wohnwert Logo"
          />

          <img
            className="absolute top-0 left-[65%] h-20"
            src="/Vertriebportrais_Mann_01.jpg"
            alt="Vertriebler"
          />
      </div>


        {/* Chat Container */}
        <div className="flex-1 overflow-hidden bg-white">
          <div className="max-w-2xl mx-auto h-full px-4 py-6 overflow-y-auto">
            <div className="flex flex-col gap-2">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`w-full flex mt-[2%] ${
                    message.sender === 1 ? 'justify-end' : 'justify-start'
                  }`}
                >
                  <div
                    className={`w-3/5 flex justify-center ${
                      message.sender === 1 ? 'pr-4' : 'pl-4'
                    }`}
                  >
                    <div
                      className={`flex flex-col p-8 max-w-[100%] border-8 rounded-2xl leading-5 ${
                        message.sender === 1 ? 'border-orange-500' : 'border-gray-300'
                      }`}
                    >
                      {message.text && (
                        <div className="bg-white text-gray-900 break-words">
                          {message.text}
                        </div>
                      )}
                      {message.file && (
                        <div className="mt-2">
                          {message.file.type.startsWith('image/') ? (
                            <img
                              src={URL.createObjectURL(message.file)}
                              alt="Uploaded"
                              className="max-w-full"
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
                      <span
                        className={`text-xs pt-3 text-black mt-1 flex ${
                          message.sender === 1 ? 'justify-start ml-2' : 'justify-start ml-2'
                        }`}
                      >
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
                Anhängen
              </label>

              <Dropdown
                buttonText="Dokument Auswählen"
                items={options}
                onSelect={handleDropdownSelect}
                reset={resetDropdown}
              />
              

              <button
                type="submit"
                className="px-6 py-3 rounded-full bg-orange-500 text-white font-semibold hover:bg-orange-600 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={!newMessage.trim() && !file && !selectedDropdownItem}
              >
                Senden
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>

  );
};

export default ChatApp;

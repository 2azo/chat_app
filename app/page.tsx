'use client';

import React, { useState, useRef, useEffect } from 'react';
import { FileText } from 'lucide-react';
import Dropdown from './components/dropdown';
import Header from './components/header';

// not need to import what's in app.tsx

// import logo from "../public/Logo_Wohnwert.jpg";
// import BubbleSvg from '../public/chat-bubble.svg'; 


interface Message {
  id: number;
  text: string | null;
  file: File | null;
  sender: number;
  timestamp: string;
  dropdownItem: string | null;
}

const ChatApp = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [activeUser, setActiveUser] = useState(1);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [selectedDropdownItem, setSelectedDropdownItem] = useState("");
  // const [temporaryDropdownSelection, setTemporaryDropdownSelection] = useState(null);
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
    
    // preventing any default behaviour (I guess)
    e.preventDefault();
  
    // return if emtpy
    if (!newMessage.trim() && !file ) return;
  
    // Date object
    const now = new Date();
  
    // Message object
    const newMessageObject = {
      id: Date.now(),
      text: newMessage.trim(),
      file: file || null,
      dropdownSelection: selectedDropdownItem,
      sender: activeUser, // just number 1 or 2
      timestamp: `${now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} ― ${now.toLocaleDateString([], { day: '2-digit', month: '2-digit', year: 'numeric' })}`,
      dropdownItem: selectedDropdownItem,
    };
  
    // copy the old array of message objects and add add the new one to it
    setMessages([...messages, newMessageObject]);
   
    setNewMessage('');
    setFile(null);
    setSelectedDropdownItem("");
    setResetDropdown(true);
  

    // setActiveUser(activeUser === 1 ? 2 : 1);
  
  
    // setTimeout(() => {
    //   if (currentMessageIndex.current < virtualUserMessages.length) {
    //     const now = new Date(); 
  
     
    //     const randomMessage = virtualUserMessages[currentMessageIndex.current];
  
       
    //     const virtualMessage = {
    //       id: Date.now(),
    //       text: randomMessage.trim(),
    //       file: null, 
    //       dropdownSelection: null, 
    //       sender: activeUser === 1 ? 2 : 1, 
    //       timestamp: `${now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} ― ${now.toLocaleDateString([], { day: '2-digit', month: '2-digit', year: 'numeric' })}`,
    //     };
  
        
    //     setMessages((prevMessages) => [...prevMessages, virtualMessage]);
  
        
    //     currentMessageIndex.current += 1;
  
        
    //     setActiveUser(activeUser);
    //   }
    // }, 2000);
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

  const handleDropdownSelect = (item:string) => {
    console.log("item :", typeof item);
    setSelectedDropdownItem(item);
    // setTemporaryDropdownSelection(item);
  };

  // const handleDropdownSelect = () => {
  //   if (temporaryDropdownSelection) {
  //     setSelectedDropdownItem(temporaryDropdownSelection);
  //     setTemporaryDropdownSelection(null); // Clear temporary state after attachment
  //   }
  // };

  return (
    <div className="h-screen flex flex-col bg-white">
      {/* Header */}
      <Header
                activeUser={activeUser}
                setActiveUser={setActiveUser}
      />



        {/* Chat Container */}
        <div className="flex-1 overflow-hidden bg-white ">
          <div className="max-w-2xl mx-auto h-full px-4 py-6 overflow-y-auto ">
            <div className="flex flex-col gap-2 ">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`w-full flex mt-[2%] ${
                    message.sender === 1 ? 'justify-end' : 'justify-start'
                  }`}
                >
                 <div
                    className={`relative w-3/5 flex justify-center ${
                      message.sender === 1 ? 'pr-4' : 'pl-4'
                    }`}
                  >
                    {/* dropdown element rendering (right) */}
                    <div
                      className={`text-black absolute top-[44.5%] right-[101%] leading-[0.9rem] whitespace-nowrap ${
                        message.sender === 1 &&
                        message.dropdownItem &&
                        message.dropdownItem !== "Sonstiges"
                          ? 'block'
                          : 'hidden'
                      }`}
                    >
                      {/* Parentheses */}
                      <span className="text-2xl">(</span>
                      {/* Text */}
                      <span className="text-base"> {message.dropdownItem} </span>
                      <span className="text-2xl">)</span>
                    </div>

                    {/* Horizontal line */}
                    {message.sender === 1 && message.dropdownItem && message.dropdownItem !== "Sonstiges" && (
                      <div
                        className="absolute left-0 right-0 top-1/2 h-0.5 w-[15%]  bg-black"
                      ></div>
                    )}

                    {/* chat bubble svg */}
                    {/* <img
                      src="/chat-bubble.svg"
                      alt="Message Bubble"
                      className={`w-24 absolute scale-y-200 ${
                        message.sender === 1 ? "text-orange-500" : "text-gray-300 -scale-x-100"
                      }`}
                    /> */}

                    {/* message box */}
                    <div
                      className={`relative flex flex-col p-8 max-w-[100%] border-8  leading-5 ${
                        message.sender === 1
                          ? 'border-[#f97316] rounded-[1rem_1rem_1rem_1rem]'
                          : 'border-gray-300 rounded-[1rem_1rem_1rem_1rem]'
                      }`}
                    >
                      
                      {/* Arrow Styling */}
                      {message.sender === 1 && (
                        <>
                          <div
                            className="absolute top-full right-[8%] w-0 h-0 border-solid"
                            style={{
                              borderWidth: '9px',
                              borderColor: '#f97316 #f97316 transparent transparent',
                              borderStyle: 'solid',
                            }}
                          ></div>
                          <div
                            className="absolute top-[calc(100%-5px)] right-[calc(8%+3px)] w-0 h-0 border-solid"
                            style={{
                              borderWidth: '8px',
                              borderColor: 'white white transparent transparent',
                              borderStyle: 'solid',
                            }}
                          ></div>
                        </>
                      )}

                      {message.sender !== 1 && (
                        <>
                          <div
                            className="absolute top-full left-[8%] w-0 h-0 border-solid"
                            style={{
                              borderWidth: '9px',
                              borderColor: 'gray gray transparent transparent',
                              borderStyle: 'solid',
                            }}
                          ></div>
                          <div
                            className="absolute top-[calc(100%-5px)] left-[calc(8%+3px)] w-0 h-0 border-solid"
                            style={{
                              borderWidth: '8px',
                              borderColor: 'white white transparent transparent',
                              borderStyle: 'solid',
                            }}
                          ></div>
                        </>
                      )}

                      {/* Message Text */}
                      {message.text && (
                        <div className="bg-white text-gray-900 break-words">{message.text}</div>
                      )}

                      {/* Message File */}
                      {message.file && (
                        <div className="mt-2">
                          {message.file.type.startsWith('image/') ? (
                            <img
                              src={URL.createObjectURL(message.file)}
                              alt="Uploaded"
                              className="max-w-full"
                            />
                          ) : message.file.type === 'application/pdf' ? (
                            <div className="flex flex-col items-start gap-2 w-[10rem]">
                              <FileText className="w-full h-full text-gray-800 stroke-1" />
                              <a
                                href={URL.createObjectURL(message.file)}
                                download={message.file.name}
                                className="text-[#f97316] underline"
                              >
                                {message.file.name}
                              </a>
                            </div>
                          ) : (
                            <a
                              href={URL.createObjectURL(message.file)}
                              download={message.file.name}
                              className="text-[#f97316] underline"
                            >
                              {message.file.name}
                            </a>
                          )}
                        </div>
                      
                    )}
                    
                      <span
                        className={`text-xs pt-3 text-black mt-1 flex ${
                          message.sender === 1
                            ? 'justify-start ml-2'
                            : 'justify-start ml-2'
                        }`}
                      >
                        {message.timestamp}
                      </span>
                    </div>

                    
                    {/* Horizontal line */}
                    {message.sender === 2 && message.dropdownItem && message.dropdownItem !== "Sonstiges" && (
                      <div
                        className="absolute left-[85%] right-0 top-1/2 h-0.5 w-[15%]  bg-black"
                      ></div>
                    )}

                    {/* dropdown element rendering (left) */}
                    <div
                      className={`text-black absolute top-[44.5%] left-[101%] leading-[0.9rem] whitespace-nowrap ${
                        message.sender === 2 &&
                        message.dropdownItem &&
                        message.dropdownItem !== "Sonstiges"
                          ? 'block'
                          : 'hidden'
                      }`}
                    >
                      {/* Parentheses */}
                      <span className="text-2xl">(</span>
                      {/* Text */}
                      <span className="text-base"> {message.dropdownItem} </span>
                      <span className="text-2xl">)</span>
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
                className={`w-full rounded-full text-gray-700 bg-gray-100 border-0 px-6 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500 placeholder-gray-500 
                  ${
                    Boolean(selectedDropdownItem)
                      ? 'opacity-50 cursor-not-allowed bg-gray-200 text-gray-400'
                      : ''
                  }
                  `}
                disabled={Boolean(selectedDropdownItem)}
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
                className={`${selectedDropdownItem ? "flex" : "hidden" } items-center justify-center px-6 py-3 rounded-full bg-gray-100 text-gray-700 cursor-pointer hover:bg-gray-200 font-semibold`}
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
                disabled={!newMessage.trim() && !file}
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

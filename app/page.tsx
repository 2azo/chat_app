'use client';

import React, { useState, useRef, useEffect } from 'react';
import { FileText } from 'lucide-react';
import Dropdown from './components/dropdown';
import Header from './components/header';
import  Container  from './components/container';
import Input from './components/input';

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
  // const [newMessage, setNewMessage] = useState('');
  // const [file, setFile] = useState<File | null>(null);
  const [activeUser, setActiveUser] = useState(1);
  // const messagesEndRef = useRef<HTMLDivElement>(null);
  // const [selectedDropdownItem, setSelectedDropdownItem] = useState("");
  // const [temporaryDropdownSelection, setTemporaryDropdownSelection] = useState(null);
  // const [resetDropdown, setResetDropdown] = useState(false);
  // const scrollToBottom = () => {
  //   messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  // };

 
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


    

  // const handleSend = (e: React.FormEvent) => {
    
  //   // preventing any default behaviour (I guess)
  //   e.preventDefault();
  
  //   // return if emtpy
  //   if (!newMessage.trim() && !file ) return;
  
  //   // Date object
  //   const now = new Date();
  
  //   // Message object
  //   const newMessageObject = {
  //     id: Date.now(),
  //     text: newMessage.trim(),
  //     file: file || null,
  //     dropdownSelection: selectedDropdownItem,
  //     sender: activeUser, // just number 1 or 2
  //     timestamp: `${now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} ― ${now.toLocaleDateString([], { day: '2-digit', month: '2-digit', year: 'numeric' })}`,
  //     dropdownItem: selectedDropdownItem,
  //   };
  
  //   // copy the old array of message objects and add add the new one to it
  //   setMessages([...messages, newMessageObject]);
   
  //   setNewMessage('');
  //   setFile(null);
  //   setSelectedDropdownItem("");
  //   setResetDropdown(true);
  

  //   // setActiveUser(activeUser === 1 ? 2 : 1);
  
  
  //   // setTimeout(() => {
  //   //   if (currentMessageIndex.current < virtualUserMessages.length) {
  //   //     const now = new Date(); 
  
     
  //   //     const randomMessage = virtualUserMessages[currentMessageIndex.current];
  
       
  //   //     const virtualMessage = {
  //   //       id: Date.now(),
  //   //       text: randomMessage.trim(),
  //   //       file: null, 
  //   //       dropdownSelection: null, 
  //   //       sender: activeUser === 1 ? 2 : 1, 
  //   //       timestamp: `${now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} ― ${now.toLocaleDateString([], { day: '2-digit', month: '2-digit', year: 'numeric' })}`,
  //   //     };
  
        
  //   //     setMessages((prevMessages) => [...prevMessages, virtualMessage]);
  
        
  //   //     currentMessageIndex.current += 1;
  
        
  //   //     setActiveUser(activeUser);
  //   //   }
  //   // }, 2000);
  // };
  

  // useEffect(() => {
  //   if (resetDropdown) {
  //     setResetDropdown(false); 
  //   }
  // }, [resetDropdown]);

 

  // const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   e.preventDefault()
  //   const selectedFile = e.target.files?.[0] || null;
  //   setFile(selectedFile);
  // };

  // const handleDropdownSelect = (item:string) => {
  //   console.log("item :", typeof item);
  //   setSelectedDropdownItem(item);
  //   // setTemporaryDropdownSelection(item);
  // };

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

        <Container
                messages={messages}
                
        />
        
        

      


      {/* Message Input */}

      <Input 
        messages={messages}
        setMessages={setMessages}
        options={options}
        activeUser={activeUser}
      />

      
    </div>

  );
};

export default ChatApp;

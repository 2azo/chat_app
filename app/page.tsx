'use client';

import React, { useState, useRef, useEffect } from 'react';
import Header from './components/header';
import  Container  from './components/container';
import Input from './components/input';



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
  const [activeUser, setActiveUser] = useState(1);


 
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

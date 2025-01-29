import React, { useState, useRef, useEffect } from 'react';
import Dropdown from './dropdown';


const Input = ({ messages, setMessages, options, activeUser  }) => {
    
      const [newMessage, setNewMessage] = useState('');
      const [file, setFile] = useState<File | null>(null);
    //   const [activeUser, setActiveUser] = useState(1);
      // const messagesEndRef = useRef<HTMLDivElement>(null);
      const [selectedDropdownItem, setSelectedDropdownItem] = useState("");
      // const [temporaryDropdownSelection, setTemporaryDropdownSelection] = useState(null);
      const [resetDropdown, setResetDropdown] = useState(false);
      // const scrollToBottom = () => {
      //   messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
      // };
      
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

    useEffect(() => {
        if (resetDropdown) {
          setResetDropdown(false); 
        }
      }, [resetDropdown]);
    
        
    return(
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


    )
}

export default Input;
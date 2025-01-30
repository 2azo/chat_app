import React, { useState, useEffect } from 'react';
import Dropdown from './dropdown';


const Input = ({ messages, setMessages, options, activeUser  }) => {
    
      const [newMessage, setNewMessage] = useState('');
      const [file, setFile] = useState<File | null>(null);
      const [selectedDropdownItem, setSelectedDropdownItem] = useState("");
      const [resetDropdown, setResetDropdown] = useState(false);
      
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
      
    
        
      };

      const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        const selectedFile = e.target.files?.[0] || null;
      
        if (selectedFile) {
          const fileType = selectedFile.type; // MIME type (e.g., application/pdf)
          const fileName = selectedFile.name; // file name
      
          
          if (fileType === "application/pdf" || selectedDropdownItem === "Sonstiges / Bild") {
            setFile(selectedFile);
          } else {
            alert("Only PDF files are allowed.");
            e.target.value = "";
            setFile(null); 
          }
        }
      };
 
        const handleDropdownSelect = (item:string) => {
            // console.log("item :", typeof item);
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
                        Boolean(selectedDropdownItem && selectedDropdownItem !== "Sonstiges / Bild")
                        ? 'opacity-50 cursor-not-allowed bg-gray-200 text-gray-400'
                        : ''
                    }
                    `}
                    disabled={Boolean(selectedDropdownItem && selectedDropdownItem !== "Sonstiges / Bild")}
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
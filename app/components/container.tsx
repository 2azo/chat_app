import { FileText } from "lucide-react";
import { useEffect, useRef } from "react";

const Container = ({ messages  }) => {
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
      };

    useEffect(() => {
        scrollToBottom();
      }, [messages]);
    

    return(
        <div className="flex-1 overflow-hidden bg-white ">
            <div className="max-w-2xl mx-auto h-full px-4 py-6 overflow-y-auto ">
            <div className="flex flex-col gap-[1rem] ">
            {messages.map((message, index) => {

                // Find if this is the last message for this sender
                const isLastMessageFromSender = messages

                    .slice(index + 1) // the messages after this (new array)

                    .every(msg => msg.sender !== message.sender);
                    // .every() return true or false (only true if all elements are)
                    // msg => () no messages from the same sender in the sliced array

                return (
                    <div
                        key={message.id}
                        className={`w-full flex mt-[2%] ${
                        message.sender === 1 ? 'justify-end' : 'justify-start'
                        }`}
                    >
                    {/* message box */}
                    <div
                        className={`relative w-3/5 flex justify-center ${
                            message.sender === 1 ? 'pr-4' : 'pl-4'
                        }`}
                        >
                        {/* dropdown element rendering (right) */}
                        <div
                            className={`text-black absolute top-[44.5%] right-[99%] leading-[0.9rem] whitespace-nowrap ${
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
                            className="absolute left-[2%] right-0 top-1/2 h-0.5 w-[13%]  bg-black"
                            ></div>
                        )}

                        <div
                            className={`relative flex flex-col p-8 max-w-[100%] border-8  leading-5 ${
                            message.sender === 1
                                ? 'border-[#f97316] rounded-[2rem]'
                                : 'border-gray-300 rounded-[2rem]'
                            }`}
                        >
                            
                            {message.sender === 1 && (
                                <>
                                    {/* Outer Arrow */}
                                    <div
                                    className={`absolute border-solid transition-all duration-100 ease-in-out ${
                                        isLastMessageFromSender 
                                        ? 'opacity-100 translate-y-0' 
                                        : 'opacity-0 translate-y-2'
                                    }`}
                                    style={{
                                        bottom: '-2.0rem',
                                        right: '4rem',
                                        borderWidth: '1.1rem',
                                        borderColor: '#f97316 transparent transparent #f97316',
                                        transform: 'rotate(67.5deg)',
                                        // visibility: isLastMessageFromSender ? 'visible' : 'hidden'
                                    }}
                                    />

                                    {/* Inner Arrow */}
                                    <div
                                    className={`absolute transition-all duration-300 ease-in-out ${
                                        isLastMessageFromSender 
                                        ? 'opacity-100 translate-y-0' 
                                         : 'opacity-0 translate-y-2'
                                    }`}
                                    style={{
                                        borderWidth: '1.25rem',
                                        borderColor: 'white transparent transparent white',
                                        borderStyle: 'solid',
                                        bottom: '-1.5rem',
                                        right: '4rem',
                                        transform: 'rotate(67.5deg)',
                                        // visibility: isLastMessageFromSender ? 'visible' : 'hidden'
                                    }}
                                    />
                                </>
                            )}

                            {message.sender !== 1 && (
                            <>
                                <div 
                                className={`absolute border-solid transition-all duration-100 ease-in-out ${
                                    isLastMessageFromSender 
                                    ? 'opacity-100 translate-y-0' 
                                    : 'opacity-0 translate-y-2'
                                }`}
                                style={{ 
                                    bottom: '-2.1rem',
                                    left: '4rem',    
                                    borderWidth: '1.1rem',
                                    borderColor: '#d1d5db  transparent transparent #d1d5db ',
                                    transform: 'rotate(22.5deg)',
                                    // visibility: isLastMessageFromSender ? 'visible' : 'hidden'
                                }}
                                />
                                <div
                                className={`absolute transition-all duration-300 ease-in-out ${
                                    isLastMessageFromSender 
                                    ? 'opacity-100 translate-y-0' 
                                    : 'opacity-0 translate-y-2'
                                }`}
                                style={{
                                    borderWidth: '1.25rem',
                                    borderColor: 'white transparent transparent white',
                                    borderStyle: 'solid',
                                    bottom: '-1.6rem',
                                    left: '4rem',     
                                    transform: 'rotate(22.5deg)',
                                    // visibility: isLastMessageFromSender ? 'visible' : 'hidden'
                                }}
                                />
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
                            className="absolute left-[85%] right-0 top-1/2 h-0.5 w-[13%]  bg-black"
                            ></div>
                        )}

                        {/* dropdown element rendering (left) */}
                        <div
                            className={`text-black absolute top-[44.5%] left-[99%] leading-[0.9rem] whitespace-nowrap ${
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
)})}
        
                <div ref={messagesEndRef} />
            
            </div>
            </div>
        </div>
    )
}

export default Container;
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
            <div className="flex flex-col gap-2 ">
                {messages.map((message) => (
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
                            className="absolute border-solid"
                            style={{ 
                                top: '101.5%',
                                right: '8.5%',
                                width: '42px',
                                height: '42px',
                                borderWidth: '25.5px',
                                borderColor: 'orange transparent transparent orange',
                                transform: 'rotate(77.5deg)'
                            }}
                            />
                            <div
                            className="absolute"
                            style={{
                                borderWidth: '28.5px',
                                borderColor: 'white transparent transparent white',
                                borderStyle: 'solid',
                                top: '89%',
                                right: '8.5%',
                                height: '42px',
                                width: '42px',
                                transform: 'rotate(77.5deg)'  // Note: 'rotate' property alone isn't valid CSS, we use transform
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
    )
}

export default Container;
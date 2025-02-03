export interface Message {
    id: number;
    text: string | null;
    file: File | null;
    sender: number;
    timestamp: string;
    dropdownItem: string | null;
  }
  
  export interface ContainerProps {
    messages: Message[];
  }
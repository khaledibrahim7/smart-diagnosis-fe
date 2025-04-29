// chat-message.model.ts
export interface ChatMessage {
    id: number;
    session: ChatSession;
    sender: string;
    message: string;
    timestamp: string;
  }
  
  export interface ChatSession {
    id: number;
    patient: Patient;
    title: string;
    startTime: string;
    endTime: string;
  }
  
  export interface Patient {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
  }
  
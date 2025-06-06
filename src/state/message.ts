import {create} from "zustand"



type message={
  receiverId:string,
  senderId:string,
  message:string
}


type useMessageType={
  messages:Array<message>,
  setMessages:(val:message[])=> void,
  setNewMessage:(val:message)=> void
}

const useMessages=create<useMessageType>((set)=>({
  messages:[],
  setMessages:(message)=>set((state)=>({messages:message})),
  setNewMessage:(msg)=>set((state)=>({messages:[...state.messages,msg]}))
}))


export {
  useMessages
}
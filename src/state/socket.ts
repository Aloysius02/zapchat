import {create} from "zustand"


type useSocketType={
  socket:any,
  onlineUsers:any,
  setSocket:(val:any)=> void,
  setOnlineUsers:(val:any)=> void,
}

const useSocket=create<useSocketType>((set)=>({
  socket:null,
  onlineUsers:[],
  setSocket:(val)=>set((state)=>({socket:val})),
  setOnlineUsers:(val)=>set((state)=>({onlineUsers:val}))
}))


export {
  useSocket
}
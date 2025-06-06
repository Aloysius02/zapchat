"use client"
import {
  userState
} from "@/state"

export default function NoChat(){
  
  const {user} = userState((state)=> state)
  
  
  return (
      <div className="w-full h-full flex flex-col justify-center items-center text-center text-[1.2rem] font-medium">
         
         <h1> Welcome 👋 {user?.username}</h1>
         <p>select chat to start messaging </p>
      </div>
    )
}
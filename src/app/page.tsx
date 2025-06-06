"use client";
import Link from "next/link";
import { userState } from "@/state";
import { ProtectRoute } from "@/lib";
import {useEffect,useState} from "react"

//components
import { ChatBar, SideBar, NoChat,LogoutModal } from "@/components";

//state 
import {
  useSideBar
} from "@/state/global"

import {
  useSelectedUser
} from "@/state"

import socket from "@/lib/socket"


export default function Home() {
  const { user } = userState((state) => state);
  socket();
  const {isSideBar} = useSideBar(state=> state)
 
  
  return (
    <ProtectRoute>
      <div className="w-screen h-[100svh] flex justify-center overflow-auto items-center">
        <LogoutModal/>
        <div className="w-full h-full sm:w-[95%] max-w-5xl glassBg sm:h-[98%] rounded-lg flex items-center overflow-hidden relative shadow-2xl">
          
            {/*side bar*/}
            <SideBarRes
            />
            {/*chat bar*/}

              <ChatBarRes/>
           
        </div>
      </div>
    </ProtectRoute>
  );
}


function ChatBarRes(){
  const {isSideBar} = useSideBar(state=> state)
  const {selectedUser} = useSelectedUser(state=> state)
  
  
  return(
    <>
     {/*sm*/}
    <div
    style={{
      transform:isSideBar ? `translateX(100%)` : "translateX(0)"
    }}
    className="chatBar transition-all duration-300 sm:hidden block absolute inset-0">
       {
        !selectedUser?
        <NoChat/> :
        <ChatBar/>
      }
    </div>
    
   {/*md*/}
    <div className="hidden sm:block w-full sm:w-[60%] h-full">
      {
        !selectedUser?
        <NoChat/> :
        <ChatBar/>
      }
    </div>
    </>
    
    )
}

function SideBarRes(){
  const {isSideBar} = useSideBar(state=> state)
  
  return(
    <>
     {/*sm*/}
    <div 
    style={{
      transform:isSideBar ? `translateX(0)` : "translateX(-100%)"
    }}
    className="sideBar transition-all duration-300 sm:hidden block absolute inset-0">
      <SideBar/>
    </div>
    
   {/*md*/}
    <div className="hidden sm:block w-full  sm:border-r border-purple-200/[0.2] sm:w-[40%] h-full">
      <SideBar/>
    </div>
    </>
    
    )
}
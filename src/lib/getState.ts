"use client";
import { useEffect, useState } from "react";
import { userState,useSelectedUser } from "@/state";

export default function GetState({ children }: { children: React.ReactNode }) {
  
  const { setUser } = userState((state) => state);
  //const { setSelectedUser } = useSelectedUser((state) => state);
  

  useEffect(() => {
    async function setState() {
      
      const user: any = await localStorage.getItem("user");
      //const selectedUser: any = await localStorage.getItem("selectedUser");
      
      if (user) {
        setUser(JSON.parse(user));
      }
      
      // if(selectedUser){
      //   setSelectedUser(JSON.parse(selectedUser));
      // }
   }
    
    setState()
  }, []);

  return children;
}

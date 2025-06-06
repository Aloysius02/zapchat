"use client";
import LogOut from "./logout";
import {SearchUser} from "@/components";

import Conversation from "./conversations";
import { userState } from "@/state";
import Image from "next/image";
import Avatar from "./Avatar"



export default function SideBar() {
  const { user } = userState((state) => state);

  return (
    <div className="h-full w-full flex flex-col">
      
      <div className="bg-slate-900 py-4 border-b border-purple-200/[0.2] padding">
       
        {/*user*/}
        {!user?
          <ProfileSkeleton/>
          :
        <div className="w-full flex items-center gap-6 cursor-pointer">
          
          <Avatar
            src={user?.profilePic} 
            alt={user?.username} 
          />
          
          <div className="flex flex-col  text-white">
            <h1 className="text-[1.4rem] font-bold capitalize">{user?.username}</h1>
            <p className="text-[1rem] opacity-70 capitalize">{user?.fullname}</p>
          </div>
        </div>
        }
      </div>

      {/*search bar*/}
      <SearchUser/>

      {/*conversation*/}
      <Conversation />

      {/*logout*/}
      <LogOut />
    </div>
  );
}





function ProfileSkeleton() {
  return (
    <div className="flex flex-col gap-6 w-full ">
      <div className="flex gap-4 items-center w-full">
        <div className="skeleton  w-20 lg:w-24  h-20 lg:h-24 rounded-full shrink-0"></div>
        <div className="flex flex-col gap-1 w-full">
          <div className="skeleton h-6 w-full"></div>
          <div className="skeleton h-6 w-full"></div>
        </div>
      </div>
    </div>
  );
}
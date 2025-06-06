"use client";
import { FaArrowLeft } from "react-icons/fa";
import SendMsg from "./sendMsg";
import Messages from "./message";
import { useSideBar } from "@/state/global";
import { useSelectedUser,userState,useSocket  } from "@/state";
import Avatar from "./Avatar";

export default function ChatBar() {
  const { setIsSideBar } = useSideBar((state) => state);
  
  const { selectedUser } = useSelectedUser((state) => state);const { onlineUsers } = useSocket((state) => state);
  
  const { user } = userState((state) => state);
  
  const isOnline = onlineUsers.includes(selectedUser?._id)

  function handleBack() {
    setIsSideBar(true);
  }

  return (
    <div className="h-full w-full flex flex-col">
      <div className="w-full border-b border-purple-200/[0.2] bg-slate-900 padding py-4 flex items-center gap-4">
        <FaArrowLeft
          onClick={handleBack}
          size={25}
          className="sm:hidden cursor-pointer hover:text-purple-300"
        />

        {/*user*/}
        {!selectedUser ? (
          <ProfileSkeleton />
        ) : (
          <div className="flex items-center gap-6 cursor-pointer">
            <Avatar
              src={selectedUser?.profilePic}
              alt={selectedUser?.username}
              className="w-[3.8rem]"
            />
            <div className="flex flex-col">
              <h3 className="text-[1.3rem] font-semibold text-white">{selectedUser?.username}</h3>
             <p className="text-[1rem] text-white opacity-70">{ isOnline ? "online" : "not online"}</p>
              
            </div>
          </div>
        )}
      </div>

      {/*msg*/}
      <Messages />
      {/*send msg*/}
      <SendMsg />
    </div>
  );
}

function ProfileSkeleton() {
  return (
    <div className="flex flex-col gap-6 w-full ">
      <div className="flex gap-4 items-center w-full">
        <div className="skeleton w-[3.8rem] h-[3.8rem] rounded-full shrink-0"></div>
        <div className="flex flex-col gap-1 w-full">
          <div className="skeleton h-6 w-full max-w-sm"></div>
          <div className="skeleton h-6 w-full max-w-sm"></div>
        </div>
      </div>
    </div>
  );
}

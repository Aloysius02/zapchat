"use client";
import { useState, useEffect } from "react";
import { useSideBar } from "@/state/global";
import { userState, useAllUsers, useSelectedUser, useSocket } from "@/state";
import { getAllUsersService } from "@/services";
import Avatar from "./Avatar";
import { useRouter } from "next/navigation";
import ConversationSkeleton from "./converSkeleton";
import { Button } from "@/components";
import { ScrollArea } from "@/components/ui/scroll-area"




export default function Conversation() {
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const { filteredUsers: conversations, setUsers,setFilteredUsers } = useAllUsers((state) => state);

  const { user } = userState((state) => state);

  const router = useRouter();

  async function getUsers() {
    setIsError(false)
    setIsLoading(true)
    let res: any = await getAllUsersService();

    if (res) {
      setIsError(false);
      if (res === "token") {
        localStorage.removeItem("user");
        router.replace("/signin");
      } else {
        await setUsers(res);
        await setFilteredUsers(res);
        setIsLoading(false);
      }
    } else {
      setIsError(true);
    }
  }

  useEffect(() => {
    if (user) {
      getUsers();
    }
  }, [user]);

  if (isError) {
    


    
    
    
    return (
      <div className="w-full flex-1 px-6 flex justify-center items-center flex-col gap-2">
        <p className="text-[1.3rem] opacity-80">error occurred </p>
        <Button  onClick={getUsers} className="w-[12rem]">
          retry
        </Button>
      </div>
    );
  }

  return (
    <ScrollArea className="w-full flex-1">
      {isLoading ? (
        <ConversationSkeleton />
      ) : (
        <ListOfConversation conversations={conversations} />
      )}
    </ScrollArea>
  );
}

function ListOfConversation({ conversations }: { conversations: any }) {
  const { setIsSideBar } = useSideBar((state) => state);
  const { selectedUser,setSelectedUser } = useSelectedUser((state) => state);
  const { onlineUsers } = useSocket((state) => state);
  const { user } = userState((state) => state);

  function handleConversation(user: any) {
    setIsSideBar(false);
    localStorage.setItem("selectedUser", JSON.stringify(user));
    setSelectedUser(user);
  }
 
 
 if(!conversations.length){
   return (
       <div className="w-full flex justify-center items-center text-[1.3rem] opacity-70">
          user not found
       </div>
     )
 }
 
 
  return (
    <div className=" w-full flex flex-col">
      {conversations.map((item: any, i: number) => (
        <div
          key={i}
          onClick={() => handleConversation(item)}
          className={`px-6 py-4 border-b border-purple-200/[0.1] hover:bg-purple-300/[0.3] cursor-pointer flex items-center gap-6 relative`}
        >
          {/*pic*/}
          <Avatar
            src={item?.profilePic}
            alt={item?.username}
            className="w-[3.5rem]"
            isOnline={onlineUsers.includes(item?._id)}
          />

          {/*name*/}
          <div className="flex flex-col">
            <h3 className="text-[1.3rem] font-semibold text-white">
              {item.username}
            </h3>
            <p className="text-[1rem] text-white opacity-70">{item.fullname}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

"use client";
import MsgSkeleton from "./msgSkeleton";
import { useMessages, userState, useSelectedUser } from "@/state";
import { getMessages } from "@/services";
import { useState, useEffect, useRef } from "react";
import Avatar from "./Avatar";
import { extractTime } from "@/lib";
import { Button } from "@/components";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function Messages() {
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const containerRef: any = useRef(null);

  const { messages, setMessages } = useMessages((state) => state);
  const { user } = userState((state) => state);
  const { selectedUser } = useSelectedUser((state) => state);

  async function fetchMsg() {
    setIsLoading(true);
    setIsError(false);
    const msg = await getMessages(selectedUser?._id);
    if (msg || msg.length) {
      //alert(res)
      setMessages([...msg]);
      setIsLoading(false);
      setIsError(false);
    } else {
      setIsLoading(false);
      setIsError(true);
    }
  }

  useEffect(() => {
    if (user && selectedUser) {
      fetchMsg();
    }
  }, [user, selectedUser]);

  const scrollToBottom = () => {
    containerRef.current.scrollTo({
      top: containerRef.current.scrollHeight,
      behavior: "smooth", // Optional for smooth scrolling
    });
  };

  useEffect(() => {
    setTimeout(() => {
      scrollToBottom();
    }, 100);
  }, [messages]);

  if (isError) {
    return (
      <div className="w-full flex-1 px-6 flex justify-center items-center flex-col gap-2">
        <p className="text-[1.3rem] opacity-80">error occurred </p>
        <Button onClick={fetchMsg} className="w-[12rem]">
          retry
        </Button>
      </div>
    );
  }

  return (
    <ScrollArea ref={containerRef} className="w-full flex-1 overflow-auto">
      {isLoading ? <MsgSkeleton /> : <ListOfMessages messages={messages} />}
    </ScrollArea>
  );
}

function ListOfMessages({ messages }: { messages: any }) {
  const { user } = userState((state) => state);
  const { selectedUser } = useSelectedUser((state) => state);

  if (!messages.length) {
    return (
      <div className="w-full pt-4 flex justify-center items-center">
        <p className="text-[1.2rem] opacity-70 mt-6">
          send a message to start a conversation
        </p>
      </div>
    );
  }

  return (
    <div className="px-4 w-full flex flex-col gap-4 py-6">
      {messages.map((item: any, i: number) => (
        <div
          key={i}
          className={`chat ${
            user?._id === item?.senderId ? "chat-end" : "chat-start"
          } `}
        >
          <Avatar
            src={
              user?._id === item?.senderId
                ? user?.profilePic
                : selectedUser?.profilePic
            }
            className="w-10 rounded-full"
            isChatImage={true}
          />

          <div
            className={`text-white chat-bubble ${
              item.shouldShake ? "shake" : ""
            } ${user?._id === item?.senderId ? "bg-purple-500" : ""}`}
          >
            {item?.message}
          </div>

          <div className="chat-footer opacity-50">
            {extractTime(item?.createdAt)}
          </div>
        </div>
      ))}
    </div>
  );
}

// <div className="chat chat-end">
//   <div className="chat-image avatar">
//     <div className="w-10 rounded-full">
//     </div>
//   </div>

//   <div className="chat-bubble">I hate you!</div>
//   <div className="chat-footer opacity-50">Seen at 12:46</div>
// </div>

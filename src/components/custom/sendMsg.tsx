"use client";
import { Input } from "@/components/ui/input";
import { IoSend } from "react-icons/io5";
import { Loader } from "@/components";
import { useState } from "react";
import { sendMessage } from "@/services";
import { useSelectedUser, userState, useMessages } from "@/state";

export default function SendMsg() {
  const [isLoading, setIsLoading] = useState(false);
  const [msg, setMsg] = useState("");
  const { selectedUser } = useSelectedUser((state) => state);
  const { user } = userState((state) => state);
  const {messages , setMessages } = useMessages((state) => state);

  function handleOnchange(e: any) {
    setMsg(e.target.value);
  }

  async function handleSendMsg() {
    setIsLoading(true);
    if (msg) {
      const res = await sendMessage(selectedUser?._id, msg);
      if(res){
        setMessages([...messages,res])
        setIsLoading(false)
        setMsg("")
      }else{
        setIsLoading(false)
      }
    }
  }

  return (
    <div className="w-full bg-slate-900 padding py-4 border-t border-purple-200/[0.2] flex gap-6 items-center">
      <div className="w-full relative">
        <Input
          className="w-full mx-auto bg-slate-800 border p-6 border-purple-200/[0.2] shadow-2xl focus:border-purple-200/[0.6] transition-all duration-200 "
          placeholder="message..."
          value={msg}
          onChange={handleOnchange}
        />

        {msg && (
          <div className="absolute top-0 h-full right-0 flex justify-center items-center px-6">
            {isLoading ? (
              <Loader />
            ) : (
              <IoSend
                onClick={handleSendMsg}
                size={25}
                className="-rotate-45"
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
}

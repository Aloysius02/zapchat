"use client";
import { io } from "socket.io-client";
import { useEffect, useState } from "react";
import { userState, useSocket, useMessages } from "@/state";

function Socket() {
  const { user } = userState((state) => state);
 

  const { setNewMessage } = useMessages((state) => state);

  const { socket, onlineUsers, setSocket, setOnlineUsers } = useSocket(
    (state) => state
  );


  useEffect(() => {
    if (user) {
      const socket = io("https://zap-chat-api.onrender.com", {
        query: {
          userId: user._id,
        },
      });

      socket.on("getOnlineUsers", (users) => {
         setOnlineUsers(users);
      });

      socket.on("newMessage", (msg) => {
        if(msg){
          msg.shouldShake = true;
		      const sound = new Audio("./notification.mp3");
			    sound.play();
			    setNewMessage(msg)
        }
      });

      setSocket(socket);
    } else {
      if (socket) {
        socket.close();
        setSocket(null);
      }
    }

    return () => {
      if (socket) {
        socket.off("getOnlineUsers");
        socket.off("newMessage");
      }
    };
  }, [user]);
}

export default Socket;

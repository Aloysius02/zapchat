"use client"
import Image from "next/image";
import { cn } from "@/lib/utils"
import {useState} from "react"

export default function Avatar({
  className,
  src,
  alt,
  isOnline,
  isChatImage
}:{
  className?:string,
  src:any,
  alt?:any,
  isOnline?:boolean
  isChatImage?:boolean
}) {
  
  const [isLoading,setIsLoading] = useState(true)
  
  return (
    <div className={`avatar ${isOnline ? "online" : ""} rounded-full ${isChatImage ? "chat-image" : ""}`}>
      <div className={cn(`w-20   border-purple-200/[0.5] border rounded-full relative`,
       className
      )}>
        
        <div className={`skeleton  w-full h-full rounded-full absolute inset-0 z-10 ${!isLoading ? "hidden" : ""} `}></div>
      
        <Image
          src={src}
          alt=""
          fill={true}
          onLoad={()=> setIsLoading(false)}
          className={`object-contain border-0 rounded-full ${isLoading ? "opacity-0" : "opacity-100"}`}
        />

    
      </div>
    </div>
  );
}

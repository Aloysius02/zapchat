
import { cn } from "@/lib/utils"
import {Loader} from "@/components"


type props ={
  className?:string,
  children:React.ReactNode,
  isLoading?:boolean,
  onClick:()=> void
}


export default function Button({
  className,
  children,
  isLoading,
  onClick
}:props){
  return (
      <button
        onClick={onClick}
        disabled={isLoading}
        className={cn(` ${isLoading ? "opacity-60" : ""} outline-0 border-0 w-full p-3 rounded-[3rem] bg-gradient-to-l from-purple-300 to-purple-400 text-white flex justify-center items-center font-medium text-[1.2rem] cursor-pointer hover:scale-95 transition-all duration-300`,
         className
        )}
      >
        {isLoading ? <Loader/> : children}
      </button>
    )
}
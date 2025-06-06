"use client";
import { Button } from "@/components";
import { useState } from "react";
import {logoutService} from "@/services"
import {userState} from "@/state"
import {useRouter} from "next/navigation"


export default function Home() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false);
 
  const {setUser} = userState((state)=> state)


 async function handleLogOut() {
    setIsLoading(true)
    const res = await logoutService()
   let modal:any = document.getElementById('closeModal')
   
    if(res){
      localStorage.removeItem("user")
      localStorage.removeItem("selectedUser")
      setUser(null)
      modal.click()
      setIsLoading(false)
      router.push("/signin")
    }else{
      setIsLoading(false)
    }
  }

  return (
    <dialog id="logoutModal" className="modal">
      <div className="bg-slate-800 modal-box ">
        <form method="dialog">
          <button id="closeModal" className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
            ✕
          </button>
        </form>

        <h3 className="font-bold text-lg">Warning!</h3>
        <p className="py-4 text-center text-[1.2rem]">Are you sure you want to logout</p>
        <Button isLoading={isLoading} onClick={handleLogOut} className="pt-2">
          Yes, I&apos;m
        </Button>
      </div>
    </dialog>
  );
}

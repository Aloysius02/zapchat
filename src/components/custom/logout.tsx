import { MdLogout } from "react-icons/md";

export default function LogOut(){
  
  function handleLogout(){
    let modal:any = document.getElementById('logoutModal')
    
    modal.showModal()
  }
  
  
  return (
      <div className="border-t border-purple-200/[0.2] w-full padding py-4 flex justify-start items-center  text-white text-[1.2rem]  font-semibold bg-slate-900">
        
        <div
        onClick={handleLogout}
        className="flex items-center gap-2 hover:text-purple-300 transition-all duration-300 cursor-pointer">
         <MdLogout />
         <p>Log out</p>
        </div>
      </div>
    )
}
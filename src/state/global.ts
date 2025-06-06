import {create} from "zustand"



//sidebar
type sideBarType={
  isSideBar:boolean,
  setIsSideBar:(val:boolean)=> void
}

const useSideBar = create<sideBarType>((set)=>({
  isSideBar:true,
  setIsSideBar:(val)=>set(()=>({isSideBar:val}))
}))





export{
  useSideBar
}
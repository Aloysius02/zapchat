import {create} from "zustand"

type User={
  username:string,
  fullname: string,
  _id:string,
  profilePic:string
}

type userType={
  user:User | null ,
  setUser:(val: User|null)=> void
}



const userState = create<userType>((set)=>({
  user: null,
  setUser:(val)=>set(()=> ({user:val})),
}))


//all users
type Users={
  users:Array<User>,
  setUsers:(val:Array<User>)=> void,
  filteredUsers:Array<User>,
  setFilteredUsers:(val:Array<User>)=> void,
}

const useAllUsers=create<Users>((set)=>({
  users:[],
  setUsers:(val)=>set(()=>({users:val})),
  filteredUsers:[],
  setFilteredUsers:(val)=>set(()=> ({filteredUsers:val}))
}))



//useSelectedUser
type selectedUser={
  selectedUser:User|null,
  setSelectedUser:(val:User)=> void
}

const useSelectedUser = create<selectedUser>((set)=>({
    selectedUser:null,
    setSelectedUser:(val)=> set(()=>({selectedUser:val}))
}))


export {
  userState,
  useAllUsers,
  useSelectedUser
}
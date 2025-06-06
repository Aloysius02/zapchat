import {create} from "zustand"


type signUptype={
  isLoading:boolean,
  setIsLoading:(val:boolean)=> void
}


const signUpStates = create<signUptype>((set)=>({
  isLoading:false,
  setIsLoading:(val:boolean)=>set(()=> ({isLoading:val}))
}))

// interface BearState {
//   bears: number
//   increase: (by: number) => void
// }

// const useBearStore = create<BearState>()((set) => ({
//   bears: 0,
//   increase: (by) => set((state) => ({ bears: state.bears + by })),
// }))


export {
  signUpStates
}
"use client"

//next 
import Link from "next/link"
import {useRouter} from "next/navigation"

//react 
import {useState,useEffect} from "react"

//components 
import {
  Input,
  Button,
  Checkbox
} from "@/components"

//hooks  
import {signInService} from "@/services"

//state 
import {userState} from "@/state"

//lib 
import {ProtectRoute} from "@/lib"

export default function SignIn(){
  
  const router = useRouter()
  const {setUser} = userState((state)=> state)
  const [isLoading,setIsLoading] = useState(false)
  

  type formType={
    username:string,
    password:string,
  }
  
  const [formData,setFormData] = useState<formType>({
    username:"",
    password:"",
  })
 
  
  function handleChange(val:any,type:string){
  
     setFormData(prev => ({...prev,[type]:val.target.value}))
    
  }
  
  
  async function handleSubmit(){
   
    const res = await signInService(formData,setIsLoading)
    
    if(res){
      
      localStorage.setItem("user",JSON.stringify(res))
      setUser(res)
      router.push("/")
    }
  }
  
  return (
    <ProtectRoute>
      <div className="w-screen h-screen flex justify-center items-center">
        
        <div className="w-[90%] max-w-lg  rounded-2xl py-6 glassBg px-4 flex flex-col  gap-6">
          
          {/*heading*/}
         <div className="text-center flex flex-col gap-1 ">
           <h1 className="text-[2rem] max-md:text-[1.5rem] font-bold text-purple-300">Sign In To ZapChat</h1>
           <p className="italic text-white/[0.6]">Enter your details to continue</p>
         </div>
         
         {/*inputs*/}
         
         <div className="w-full max-w-sm mx-auto flex flex-col gap-6 items-center">
            <Input
             label="Username"
             type="text"
             placeholder="Enter your username"
             value={formData.username}
             onChange={(e:any)=> handleChange(e,"username")}
            />
            
            <Input
             label="Password"
             type="password"
             placeholder="Enter password"
             value={formData.password}
             onChange={(e:any)=> handleChange(e,"password")}
            />
       
            
            
            <div className="flex gap-2 items-center flex-start w-full py-2">
              <p className="opacity-60">Don&apos;t have an account?</p>
              <Link className="text-purple-300 hover:underline" href="/signup">Sign Up</Link>
            </div>
            
            <Button
             isLoading={isLoading}
             onClick={handleSubmit}
             className="pt-2"
            >
              Sign In 
            </Button>
         </div>
          
        </div>
        
      </div>
     </ProtectRoute>
    )
}
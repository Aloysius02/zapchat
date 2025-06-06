import { Toast } from "@/components";

export default async function sendMessages(id:string|undefined,message:string) { 
  
  if(!id){
    Toast({
      id: "sendError1",
      msg: "invalid user",
      type: "error",
    });
    return false
  }

  try {
  
    let res = await fetch(`/api/message/send/${id}`,{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({message}),
      credentials: 'include',
    });

    let data = await res.json();

    if (data?.success) {
      return data?.message;
    } else {
      
        Toast({
          id: "sendMsgerror2",
          msg: data?.message,
          type: "error",
        });


      return false;
    }
  } catch (err: any) {
    console.log(err?.message);
    Toast({
      id: "senderrallu",
      msg: "Network error",
      type: "error",
    });
    return false;
  }
}

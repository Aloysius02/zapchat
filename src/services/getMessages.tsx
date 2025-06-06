import { Toast } from "@/components";

export default async function getMessages(id:string|undefined) { 
  
  if(!id){
    Toast({
      id: "getError1",
      msg: "invalid user",
      type: "error",
    });
    return false
  }

  try {
  
    let res = await fetch(`/api/message/${id}`,{
      credentials: 'include',
    });

    let data = await res.json();

    if (data?.success) {
      return data?.messages;
    } else {
      
        Toast({
          id: "getMsgerror2",
          msg: data?.message,
          type: "error",
        });


      return false;
    }
  } catch (err: any) {
    
    Toast({
      id: "errallu",
      msg: "Network error",
      type: "error",
    });
    return false;
  }
}

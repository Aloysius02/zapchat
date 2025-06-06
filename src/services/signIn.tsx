
import { Toast } from "@/components";

type formType = {
  username: string;
  password: string;
};


export default async function signIn(
  formData: formType,
  setIsLoading:(val:boolean)=> void
  ) {
  const verified: boolean = await verifyData(formData);

  if (!verified) return false;
  
  
  setIsLoading(true);
  const Id: any = Toast({
    msg: "please wait...",
    type: "loading",
    id: "siginloading",
  });

  try {
    let res = await fetch("/api/auth/signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    let data = await res.json();

    if (data?.success) {
      
      Toast({
        id: Id,
        msg: data?.message,
        type: "success",
      });
      
      return data?.user
    } else {
      Toast({
        id: Id,
        msg: data?.message,
        type: "error",
      });
    }
    return false
  } catch (err: any) {
    console.log(err?.message);
    Toast({
      id: Id,
      msg: "Network error",
      type: "error",
    });
    return false 
  } finally {
    setIsLoading(false);
  }
}



function verifyData(formData: formType): boolean {
  const { username, password } = formData;

  if (!username || !password) {
    Toast({
      msg: "All fields are required",
      type: "error",
      id: "allsignIn",
    });

    return false;
  }

  return true;
}

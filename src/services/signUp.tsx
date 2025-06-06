import { Toast } from "@/components";

type formType = {
  username: string;
  fullname: string;
  password: string;
  confirmPassword: string;
  gender: string;
};

export default async function signUp(
  formData: formType,
  setIsLoading: (val: boolean) => void
) {
  
 
  const verified: boolean = await verifyData(formData);

  if (!verified) return false;

  setIsLoading(true);
  const Id: any = Toast({
    msg: "please wait...",
    type: "loading",
    id: "signloading",
  });

  try {
    let res = await fetch("/api/auth/signup", {
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
      
      return true
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
  const { username, fullname, password, confirmPassword, gender } = formData;

  if (!username || !fullname || !password || !confirmPassword || !gender) {
    Toast({
      msg: "All fields are required",
      type: "error",
      id: "allsignup",
    });

    return false 
  }else if (password.length < 8) {
    Toast({
      msg: "Password must be upto 8 characters",
      type: "error",
      id: "8character",
    });

    return false;
  }else if (password != confirmPassword) {
    Toast({
      msg: "Passwords does not match",
      type: "error",
      id: "don't match",
    });

    return false;
  }

  return true;
}

import { Toast } from "@/components";

export default async function LogoutServices() {
  
  const Id: any = Toast({
    msg: "please wait...",
    type: "loading",
    id: "logoutloading",
  });
  
  
  
  try {
    let res = await fetch("/api/auth/logout");

    let data = await res.json();

    if (data?.success) {
      Toast({
        id: Id,
        msg: data?.message,
        type: "success",
      });
      return true;
    } else {
      Toast({
        id: Id,
        msg: data?.message,
        type: "error",
      });

      return false;
    }
  } catch (err: any) {
    console.log(err?.message);
    Toast({
      id: Id,
      msg: "Network error",
      type: "error",
    });
    return false;
  }
}

import { Toast } from "@/components";

export default async function allUsersService() {
  try {
    
    
    let res = await fetch("/api/user",{
      credentials: 'include',
    });

    let data = await res.json();

    if (data?.success) {
      return data?.users;
    } else {
      
      if (data?.type === "accessToken-error") {
        Toast({
          id: "alluseretr",
          msg: data?.message,
          type: "error",
        });

        return "token";
      }

      Toast({
        id: "alluseretr",
        msg: data?.message,
        type: "error",
      });

      return false;
    }
  } catch (err: any) {
    Toast({
      id: "erralluser",
      msg: "Network error",
      type: "error",
    });
    return false;
  }
}

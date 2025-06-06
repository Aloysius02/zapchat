import toast from "react-hot-toast";

export default function Toast({
  type,
  msg,
  id,
}: {
  type: "error" | "success" | "loading";
  msg: string;
  id: string;
}) {
  if (type === "success") {
    toast.success(msg, {
      id,
      iconTheme: {
        primary: "hsl(222.2 44% 50%)",
        secondary: "#fff",
      },
    });
  }

  if (type === "error") {
    toast.error(msg, {
      id,
    });
  }

  if (type === "loading") {
    const toastId = toast.loading(msg, {
      id,
    });
    
    return toastId
  }
}

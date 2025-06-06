"use client";
import { userState } from "@/state";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function ProtectRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  
  const { user } = userState((state) => state);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    async function getUser() {
      const User: any = await localStorage.getItem("user");

      if (!User) {
        if (!pathname.includes("/signup")) {
          router.replace("/signin");
        }
      } else {
        if (pathname.includes("signin") || pathname.includes("signup")) {
           router.replace("/");
        }
      }
    }

    getUser();
  }, [user]);

  return children;
}

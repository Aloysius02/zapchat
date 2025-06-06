"use client";
import { useState, useEffect } from "react";
import { Toast } from "@/components";

type formType = {
  username: string;
  fullname: string;
  password: string;
  confirmPassword: string;
  gender: string;
};

export default function useSignUp() {
  const [isLoading, setIsLoading] = useState(false);
  

  async function signUp(formData: formType) {
    const verified: boolean = await verifyData(formData);

    //if (!verified) return;

    try {
      setIsLoading(true);
      const Id: any = Toast({
        msg: "please wait...",
        type: "loading",
        id: "signloading",
      });

      setTimeout(() => {
        Toast({
          id: Id,
          msg: "signed up successfully",
          type: "success",
        });
      setIsLoading(false);
      }, 2000);
      
      return true
    } catch (err: any) {
      console.log(err?.message);
    } finally {
      setIsLoading(false);
    }
  }

  return { isLoading, signUp };
}

function verifyData(formData: formType): boolean {
  const { username, fullname, password, confirmPassword, gender } = formData;

  if (!username || !fullname || !password || !confirmPassword || !gender) {
    Toast({
      msg: "All fields are required",
      type: "error",
      id: "allsignup",
    });

    return false;
  }

  if (password.length < 8) {
    Toast({
      msg: "Password must be upto 8 characters",
      type: "error",
      id: "8character",
    });

    return false;
  }

  if (password != confirmPassword) {
    Toast({
      msg: "Passwords does not match",
      type: "error",
      id: "don't match",
    });

    return false;
  }

  return true;
}

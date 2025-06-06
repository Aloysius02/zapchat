"use client";

//next
import Link from "next/link";
import { useRouter } from "next/navigation";

//react
import { useState, useEffect } from "react";

//components
import { Input, Button, Checkbox } from "@/components";

//hooks
import { signUpService } from "@/services";

//states
import { signUpStates } from "@/state";

//lib
import { ProtectRoute } from "@/lib";

export default function Signup() {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);

  type formType = {
    username: string;
    fullname: string;
    password: string;
    confirmPassword: string;
    gender: string;
  };

  const [formData, setFormData] = useState<formType>({
    username: "",
    fullname: "",
    password: "",
    confirmPassword: "",
    gender: "",
  });

  function handleChange(val: any, type: string) {
    if (type === "gender") {
      setFormData((prev) => ({ ...prev, gender: val }));
    } else {
      setFormData((prev) => ({ ...prev, [type]: val.target.value }));
    }
  }

  async function handleSubmit() {
    const res = await signUpService(formData, setIsLoading);

    
    if (res) {
      router.push("/signin");
    }
  }

  return (
    <ProtectRoute>
      <div className="w-screen h-screen flex justify-center items-center">
        <div className="w-[90%] max-w-lg  rounded-2xl py-6 glassBg px-4 flex flex-col  gap-4">
          {/*heading*/}
          <div className="text-center flex flex-col gap-1 ">
            <h1 className="text-[2rem] max-md:text-[1.5rem] font-bold text-purple-300">
              Sign Up To ZapChat
            </h1>
            <p className="italic text-white/[0.6]">
              Enter your details to continue
            </p>
          </div>

          {/*inputs*/}

          <div className="w-full max-w-sm mx-auto flex flex-col gap-4 items-center">
            <Input
              label="Username"
              type="text"
              placeholder="Enter your username"
              value={formData.username}
              onChange={(e: any) => handleChange(e, "username")}
            />
            <Input
              label="Full-Name"
              type="text"
              placeholder="Enter your fullname"
              value={formData.fullname}
              onChange={(e: any) => handleChange(e, "fullname")}
            />
            <Input
              label="Password"
              type="password"
              placeholder="Enter password"
              value={formData.password}
              onChange={(e: any) => handleChange(e, "password")}
            />
            <Input
              label="Confirm Password"
              type="password"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={(e: any) => handleChange(e, "confirmPassword")}
            />

            <div className="flex gap-6 flex-start w-full items-center">
              <p>Gender:</p>
              <div
                onClick={() => handleChange("male", "gender")}
                className="flex items-center gap-2"
              >
                <p>Male</p>
                <Checkbox checked={formData.gender === "male"} />
              </div>
              <div
                onClick={() => handleChange("female", "gender")}
                className="flex items-center gap-2"
              >
                <p>Female</p>
                <Checkbox checked={formData.gender === "female"} />
              </div>
            </div>

            <div className="flex gap-2 items-center flex-start w-full">
              <p className="opacity-60">Already have an account?</p>
              <Link className="text-purple-300 hover:underline" href="/signin">
                Sign In
              </Link>
            </div>

            <Button isLoading={isLoading} onClick={handleSubmit}>
              Sign Up
            </Button>
          </div>
        </div>
      </div>
    </ProtectRoute>
  );
}

"use client";

import { useToast } from "@/hooks/use-toast";
import { SignOutButton } from "@clerk/nextjs";
import Link from "next/link";

function SignOutLink() {
  const { toast } = useToast();

  const handleLogout = () => {
    toast({
      description: "Logout successful",
    });
  };

  return (
    <SignOutButton redirectUrl="/products">
      {/* <p onClick={handleLogout}>Log out</p> */}
      <button className="w-full text-left" onClick={handleLogout}>
        Logout
      </button>
    </SignOutButton>
  );
}
export default SignOutLink;

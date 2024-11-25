"use client";

import { useFormStatus } from "react-dom";
import { ReloadIcon } from "@radix-ui/react-icons";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { LuTrash2, LuPenSquare } from "react-icons/lu";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import { SignInButton } from "@clerk/nextjs";

type btnSize = "default" | "lg" | "sm";
type SubmitButtonProps = {
  className?: string;
  text?: string;
  size?: btnSize;
};

function SubmitButton({ className, text, size }: SubmitButtonProps) {
  const { pending } = useFormStatus();
  console.log("penging", pending); //false;
  return (
    <Button type="submit" disabled={pending} className={cn("capitalize", className)} size={size}>
      {pending ? (
        <>
          <ReloadIcon className="mr-2 h-4 w-4 animate-spin" /> Please wait...
        </>
      ) : (
        text
      )}
    </Button>
  );
}

export type actionType = "edit" | "delete";

export const IconButton = ({ actionType }: { actionType: actionType }) => {
  const { pending } = useFormStatus();

  const renderIcon = () => {
    switch (actionType) {
      case "edit":
        return <LuPenSquare />;
      case "delete":
        return <LuTrash2 />;
      // prevent from adding another type magicTS

      default:
        const never: never = actionType; //swicth only 2case so amy extra type will be error
        throw new Error(`invalid action type: ${never}`);
    }
  };

  return (
    <Button type="submit" size="icon" variant="link" className="p-2 cursor-pointer">
      {pending ? <ReloadIcon className="animate-spin" /> : renderIcon()}
    </Button>
  );
};

export default SubmitButton;

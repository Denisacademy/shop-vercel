import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { LuAlignLeft } from "react-icons/lu";
import Link from "next/link";
import { Button } from "../ui/button";
import { links } from "@/utils/links";
// import { currentUser } from "@clerk/nextjs/server";
import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton, SignOutButton } from "@clerk/nextjs";

import SignOutLink from "./SignOutLink";
import UserIcon from "./UserIcon";
import { auth } from "@clerk/nextjs/server";
import React from "react";

function BtnSingIn({ children }: { children: React.ReactNode }) {
  const { userId } = auth();

  if (!userId) {
    return (
      <DropdownMenu>
        <DropdownMenuItem>
          <SignInButton mode="modal">
            <button className="w-full text-left">Sign in</button>
          </SignInButton>
          {/* <SignedIn /> */}
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <SignUpButton mode="modal">
            <button className="w-full text-left">Sugn up</button>
          </SignUpButton>
          {/* <SignOutButton /> */}
        </DropdownMenuItem>
      </DropdownMenu>
    );
  }
  return children;
}

async function LinksDropdown() {
  return (
    <DropdownMenu>
      {/* ONLY TRIGGER */}
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="flex gap-4 max-w-[100px]">
          <LuAlignLeft className="w-6 h-6" />
          {/* USER_ICON */}
          <UserIcon />
        </Button>
      </DropdownMenuTrigger>
      {/* MENU */}
      {
        <DropdownMenuContent className="w-40" align="start" sideOffset={10}>
          {/* Either one component or another if you sign-in */}
          {/* <SignedOut> */}
          {/* LOGIN REGISTER */}

          {/* <DropdownMenuItem>
              <SignInButton mode="modal">
                <button className="w-full text-left">Login</button>
              </SignInButton>
            </DropdownMenuItem> */}

          {/* <DropdownMenuSeparator /> */}

          {/* <DropdownMenuItem>
              <SignUpButton mode="modal">
                <button className="w-full text-left">Register</button>
              </SignUpButton>
            </DropdownMenuItem> */}
          {/* *** */}
          {/* </SignedOut> */}

          {/* SPECIAL COMPONENT */}
          {/* <SignedIn> */}
          <BtnSingIn>
            {/* <div>USE ARE LOGIN</div> */}
            <>
              {links.map((link) => {
                return (
                  <DropdownMenuItem key={link.href}>
                    <Link href={link.href} className="capitalize w-full">
                      {link.label}
                    </Link>
                  </DropdownMenuItem>
                );
              })}
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                {/* LOG-OUT */}
                {/* <p>TEST LOG_OUT</p> */}
                <SignOutButton redirectUrl="/products" />
                {/* <SignOutLink /> */}
              </DropdownMenuItem>
            </>
          </BtnSingIn>
          {/* </SignedIn> */}
        </DropdownMenuContent>
      }
    </DropdownMenu>
  );
}
export default LinksDropdown;

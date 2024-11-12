import Link from "next/link";
import React from "react";
import { VscCode } from "react-icons/vsc";
import { Button } from "../ui/button";

function Logo() {
  return (
    <Button size="sm" asChild>
      <Link href="/">
        Shop
        <VscCode className="w-8 h-8" />
      </Link>
    </Button>
  );
}

export default Logo;

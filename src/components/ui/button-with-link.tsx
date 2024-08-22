// components/ButtonWithLink.js
import { Button } from "@material-tailwind/react";
import React from "react";
import Link from "next/link";

export interface ButtonWithLinkProps {
  to: string;
  children: React.ReactNode;
}

const ButtonWithLink = ({ to, children }: ButtonWithLinkProps) => {
  return (
    <Button className="relative group">
      <Link href={to} className="absolute inset-0 z-10" />
      <span className="relative z-20">{children}</span>
    </Button>
  );
};

export default ButtonWithLink;

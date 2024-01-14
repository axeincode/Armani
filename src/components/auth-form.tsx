"use client";
import { GitHubLogoIcon } from "@radix-ui/react-icons";
import { Button } from "./ui/button";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { Icons } from "./icons";

export default function AuthForm() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const login = async () => {
    setIsLoading(true);
    await signIn("github", {
      redirect: false,
      callbackUrl: "/dashboard",
    });
    setIsLoading(false);
  };
  return (
    <Button className="flex flex-row gap-2" onClick={login}>
      {isLoading ? (
        <Icons.spinner size={20} className="animate-spin" />
      ) : (
        <GitHubLogoIcon width={20} height={20} />
      )}
      Sign in with GitHub
    </Button>
  );
}

import ThemeToggle from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { getAuthenticatedAppForUser } from "@/lib/firebase/firebase";
import Link from "next/link";
import React from "react";
import AuthForm from "@/components/auth-form";

export default async function Login() {
  const { currentUser } = await getAuthenticatedAppForUser();
  return (
    <div className="w-max min-h-screen mx-auto flex flex-col  gap-3 items-center justify-center">
      <div className="fixed right-0 bottom-0 p-4 flex flex-row  gap-1">
        <ThemeToggle />
      </div>
      <h1 className="text-xl font-medium">Welcome Back</h1>
      {currentUser ? (
        <Button>
          <Link href={"/dashboard"}>Go to dashboard</Link>
        </Button>
      ) : (
        <AuthForm currentUser={currentUser} />
      )}
    </div>
  );
}

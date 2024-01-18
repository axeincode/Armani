"use client";
import { Button } from "./ui/button";
import React from "react";
import { signInWithGoogle, signOut } from "../lib/firebase/auth";
import useUserSession from "@/lib/useUserSession";
import { Typography } from "@material-tailwind/react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function AuthForm({ currentUser }: any) {
  const user = useUserSession(currentUser?.toJSON());
  const router = useRouter();
  const handleSignIn = (event: any) => {
    event.preventDefault();
    signInWithGoogle();
  };

  const handleSignOut = (event: any) => {
    event.preventDefault();
    signOut();
  };

  React.useEffect(() => {
    if (user && user.email) {
      // navigate to the dashboard page
      router.push("/");
    }
  }, [user]);

  return (
    <>
      {user ? (
        <>
          <Typography className="flex flex-row gap-2">
            Signed in as {user?.email}
          </Typography>
          <Button className="flex justify-center" onClick={handleSignOut}>
            <Link href={"/"}>Go to dashboard</Link>
          </Button>
          <Button className="flex justify-center" onClick={handleSignOut}>
            {"Sign out"}
          </Button>
        </>
      ) : (
        <Button className="flex flex-row gap-2" onClick={handleSignIn}>
          Sign in with Google
        </Button>
      )}
    </>
  );
}

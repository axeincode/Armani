"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { User } from "next-auth";
import { signOut } from "next-auth/react";
import { getCapitalLettersOfName } from "@/lib/utils";

interface UserAccountNavProps {
  user: Pick<User, "name" | "image" | "email">;
}

export default function UserAccountNav({ user }: UserAccountNavProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="outline-none cursor-pointer" asChild>
        <Avatar>
          <AvatarImage src={user?.image as string} />
          <AvatarFallback>
            {user.name && getCapitalLettersOfName(user.name)}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <div className="text-md p-2 flex flex-col">
          {user.name && <h3 className="font-medium">{user.name}</h3>}
          {user.email && <p className="text-sm text-gray-1">{user.email}</p>}
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => signOut({ callbackUrl: "/" })}>
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

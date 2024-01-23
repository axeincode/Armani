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
import { signOut } from "@/lib/firebase/auth";
import { getCapitalLettersOfName } from "@/lib/utils";

interface UserAccountNavProps {
  user: Pick<User, "name" | "image" | "email">;
  className?: string;
}

export default function UserAccountNav({
  user,
  className,
}: UserAccountNavProps) {
  const handleSignOut = (event: any) => {
    event.preventDefault();
    signOut();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="outline-none cursor-pointer" asChild>
        <Avatar className={className}>
          <AvatarImage src={user?.image as string} className={className} />
          <AvatarFallback className={className}>
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
        <DropdownMenuItem onClick={handleSignOut}>Log out</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

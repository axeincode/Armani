import AuthForm from "@/components/auth-form";
import ThemeToggle from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
// import getCurrentUser from "@/lib/session";
import { GitHubLogoIcon, TwitterLogoIcon } from "@radix-ui/react-icons";
import Link from "next/link";

export default async function Login() {
  /// const user = await getCurrentUser()
  const user = null;
  return (
    <div className="w-max min-h-screen mx-auto flex flex-col  gap-3 items-center justify-center">
      <div className="fixed right-0 bottom-0 p-4 flex flex-row  gap-1">
        <Link
          href={"https://x.com/themanafov"}
          target="_blank"
          className="p-2 hover:bg-gray-2 w-9 h-9 cursor-pointer rounded-lg transition-colors"
        >
          <TwitterLogoIcon width={20} height={20} />
        </Link>

        <Link
          href={"https://github.com/themanafov/nextjs-dashboard-template"}
          target="_blank"
          className="p-2 hover:bg-gray-2 cursor-pointer w-9 h-9  rounded-lg transition-colors"
        >
          <GitHubLogoIcon width={20} height={20} />
        </Link>
        <ThemeToggle />
      </div>
      <h1 className="text-xl font-medium">Welcome Back</h1>
      <Button>
        <Link href={"/dashboard"}>Go to dashboard</Link>
      </Button>

      {/* {user ? (
        <Button>
          <Link href={"/dashboard"}>Go to dashboard</Link>
        </Button>
      ) : (
        <AuthForm />
      )} */}
    </div>
  );
}

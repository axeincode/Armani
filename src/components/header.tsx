import React from "react";
import {
  Navbar as MTNavbar,
  Collapse,
  Button,
  IconButton,
  Typography,
} from "@material-tailwind/react";
import {
  RectangleStackIcon,
  UserCircleIcon,
  CommandLineIcon,
  Squares2X2Icon,
  XMarkIcon,
  Bars3Icon,
  MoonIcon,
} from "@heroicons/react/24/solid";
import { useRouter } from "next/navigation";
import useUserSession from "@/lib/useUserSession";
import UserAccountNav from "./user-account-nav";

const NAV_MENU = [
  {
    name: "Page",
    icon: RectangleStackIcon,
  },
  {
    name: "Account",
    icon: UserCircleIcon,
  },
  {
    name: "Docs",
    icon: CommandLineIcon,
    href: "https://www.material-tailwind.com/docs/react/installation",
  },
];

interface NavItemProps {
  children: React.ReactNode;
  href?: string;
}

function NavItem({ children, href }: NavItemProps) {
  return (
    <li>
      <Typography
        as="a"
        href={href || "#"}
        target={href ? "_blank" : "_self"}
        variant="paragraph"
        color="gray"
        className="flex items-center gap-2 font-medium text-gray-900"
      >
        {children}
      </Typography>
    </li>
  );
}

export function Header({ currentUser }: any) {
  const user = useUserSession(currentUser?.toJSON());
  const [open, setOpen] = React.useState(false);
  const router = useRouter();

  function handleOpen() {
    setOpen((cur) => !cur);
  }

  const handleOnSignIn = () => {
    router.push("/signin");
  };

  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpen(false)
    );
  }, []);

  return (
    <div className="px-0 sticky z-50 bg-gray-900">
      <div className="w-full flex flex-1">
        <MTNavbar
          blurred
          color="white"
          className="bg-gray-900 z-50 py-2 relative border-0 mx-10 w-full justify-center max-w-none"
        >
          <div className="flex flex-1 justify-between items-center">
            <div className="flex items-center gap-4">
              <MoonIcon className="h-6 w-6 text-yellow-500" />
              <Typography color="yellow" className="text-lg font-bold">
                Canari Solutions
              </Typography>
            </div>
            {/* <div className="hidden items-center gap-4 lg:flex">
              <UserCircleIcon className="h-10 w-10" />
            </div> */}
            {user ? (
              <div className="hidden items-center gap-4 lg:flex">
                <UserAccountNav
                  user={{
                    name: user?.displayName,
                    image: user?.photoURL,
                    email: user?.email,
                  }}
                />
              </div>
            ) : (
              <div className="hidden items-center gap-4 lg:flex">
                <Button
                  variant="outlined"
                  size="sm"
                  color="white"
                  onClick={handleOnSignIn}
                >
                  Sign In
                </Button>
              </div>
            )}
            <IconButton
              variant="text"
              color="gray"
              onClick={handleOpen}
              className="ml-auto inline-block lg:hidden"
            >
              {open ? (
                <XMarkIcon strokeWidth={2} className="h-6 w-6" />
              ) : (
                <Bars3Icon strokeWidth={2} className="h-6 w-6" />
              )}
            </IconButton>
          </div>
          <Collapse open={open}>
            <div className="container mx-auto mt-3 border-t border-gray-200 px-2 pt-4">
              <ul className="flex flex-col gap-4">
                {NAV_MENU.map(({ name, icon: Icon, href }) => (
                  <NavItem key={name} href={href}>
                    <Icon className="h-5 w-5" />
                    {name}
                  </NavItem>
                ))}
              </ul>
              <div className="mt-6 mb-4 flex items-center gap-4">
                <Button variant="text">Log in</Button>
                <a
                  href="https://www.material-tailwind.com/blocks"
                  target="_blank"
                >
                  <Button color="gray">blocks</Button>
                </a>
              </div>
            </div>
          </Collapse>
        </MTNavbar>
      </div>
    </div>
  );
}

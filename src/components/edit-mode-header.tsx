import React from "react";
import {
  Navbar as MTNavbar,
  Button,
  IconButton,
  Typography,
  ButtonGroup,
} from "@material-tailwind/react";
import {
  XMarkIcon,
  Bars3Icon,
  ArrowLeftCircleIcon,
} from "@heroicons/react/24/solid";
import { updateDeck } from "@/lib/firebase/firestore/decks.firestore";
import { useRouter } from "next/navigation";
import useUserSession from "@/lib/useUserSession";
import UserAccountNav from "./user-account-nav";
import Link from "next/link";
import { useEditorObserveable, useObservable } from "@/store";
import { deNormalizeEditorData } from "@/types/editor.types";
import { toast } from "react-toastify";

export function EditModeHeader({ currentUser }: any) {
  const user = useUserSession(currentUser?.toJSON());
  const [open, setOpen] = React.useState(false);
  const router = useRouter();

  const editorDeck$ = useEditorObserveable();
  const editorState = useObservable(editorDeck$.getObservable());

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

  // callbacks
  const saveDeckCallback = () => {
    if (!editorState) return;
    const denormalizedDeck = deNormalizeEditorData(editorState);
    updateDeck(denormalizedDeck?.id, {
      ...denormalizedDeck,
    })
      .then(() => {
        toast.success("Success");
      })
      .catch((err) => {
        toast.error("Error");
      });
  };

  return (
    <div className="px-0 bg-gray-900">
      <div className="w-full flex flex-1">
        <MTNavbar
          blurred
          color="white"
          className="bg-gray-900 py-1 relative border-0 mx-0 px-2 w-full justify-center max-w-none"
        >
          <div className="flex flex-1 justify-between items-center">
            <div className="flex items-center gap-2">
              <ArrowLeftCircleIcon className="h-4 w-4 text-yellow-500" />
              <Link href="/" className="hover:underline">
                <Typography color="yellow" className="text-sm font-bold">
                  Dashboard
                </Typography>
              </Link>
            </div>
            {/* <div className="hidden items-center gap-4 lg:flex">
              <UserCircleIcon className="h-10 w-10" />
            </div> */}
            {user ? (
              <div className="items-center gap-2 lg:flex">
                <ButtonGroup
                  variant="gradient"
                  className="p-0 h-5 !text-xs text-white"
                >
                  <Button
                    className="py-0 h-5 !text-xs text-yellow-500"
                    onClick={saveDeckCallback}
                  >
                    Save
                  </Button>
                  <Button
                    className="py-0 h-5 !text-xs text-yellow-500"
                    onClick={saveDeckCallback}
                  >
                    Publish
                  </Button>
                </ButtonGroup>

                <UserAccountNav
                  user={{
                    name: user?.displayName,
                    image: user?.photoURL,
                    email: user?.email,
                  }}
                  className="h-5 w-5"
                />
              </div>
            ) : (
              <div className="hidden items-center gap-2 lg:flex">
                <Button
                  variant="outlined"
                  size="sm"
                  color="white"
                  onClick={handleOnSignIn}
                  className="p-0 h-5 !text-xs"
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
                <XMarkIcon strokeWidth={2} className="h-4 w-4" />
              ) : (
                <Bars3Icon strokeWidth={2} className="h-4 w-4" />
              )}
            </IconButton>
          </div>
        </MTNavbar>
      </div>
    </div>
  );
}

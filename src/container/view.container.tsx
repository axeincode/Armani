"use client";
import React from "react";
import Link from "next/link";
import { useRouter, useParams } from "next/navigation";
import { deleteDeck, getDeck } from "@/lib/firebase/firestore/decks.firestore";
import { User, normalizedEditorData } from "@/types/editor.types";
import { useObservable, usePageObserveable } from "@/store";
import { useEditorObserveable } from "@/store/editor.observeable";
import { toast } from "react-toastify";
import { ViewMainPage } from "@/components/view";
import useUserSession from "@/lib/useUserSession";
import { getAgreementByUser } from "@/lib/firebase/firestore/user.agreements";
import { useUserAgreementRepo } from "@/store/user-agreement.observeable";

export type ViewContainerProps = {
  currentUser: any;
};

export const ViewContainer = ({ currentUser }: ViewContainerProps) => {
  const router = useRouter();
  const user: User = useUserSession(currentUser?.toJSON());

  // router get id
  const params = useParams<{ id: string }>();
  // states
  const [isLoading, setIsLoading] = React.useState(false);
  const editorDeck$ = useEditorObserveable();
  const userAgreement$ = useUserAgreementRepo();
  const editorState = useObservable(editorDeck$.getObservable());
  const page$ = usePageObserveable();
  const pageState = useObservable(page$.getObservable());

  console.log("editorstate", editorState);
  console.log("currentUser", user);

  // effects
  React.useEffect(() => {
    if (!params.id) return;
    try {
      // fetch deck
      setIsLoading(true);
      getDeck(params.id).then((deck) => {
        if (!deck) return;
        setIsLoading(false);
        const normalizedDeck = normalizedEditorData(deck);
        console.log("normalizedeck", normalizedDeck);
        editorDeck$.setInitialState(normalizedDeck);
        const pages = normalizedDeck.entities.pages;
        if (!pages) return;
        let firstPage = Object.keys(pages).filter((key) => {
          return pages[key].pageNumber === 0;
        })[0];
        if (!firstPage) {
          firstPage = Object.keys(pages)[0];
        }
        console.log("firstPage", firstPage, pages);
        page$.setPageInfo({
          currentPage: pages[firstPage].pageNumber,
          totalPages: Object.keys(pages).length,
          pageName: pages[firstPage].name,
          pageId: firstPage,
        });
      });
    } catch (err) {
      console.log(err);
      setIsLoading(false);
    }
    // eslint-disable-next-line
  }, [params.id]);

  React.useEffect(() => {
    if (!user) return;
    console.log("Fetching User Agreements");
    getAgreementByUser(user.uid).then((agreements) => {
      if (!agreements) return;
      userAgreement$.setInitalAgreements(agreements);
    });
  }, [user, userAgreement$]);

  // callbacks
  const deleteDeckCallback = () => {
    deleteDeck(params.id)
      .then(() => {
        toast.success("Success");
        router.push(`/`);
      })
      .catch((error) => {
        toast.error("Error");
      });
  };

  return (
    <div className="flex flex-col flex-1 flex-grow w-full h-full">
      {/** content layout */}
      <div className="flex flex-1">
        {isLoading && (
          <div role="status" className="max-w-sm animate-pulse">
            <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
            <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px] mb-2.5"></div>
            <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
            <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[330px] mb-2.5"></div>
            <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[300px] mb-2.5"></div>
            <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px]"></div>
            <span className="sr-only">Loading...</span>
          </div>
        )}
        {!isLoading && <ViewMainPage user={user} />}
      </div>
      {/** footer layout */}
      <footer className="w-full flex flex-row gap-1 justify-center items-center border-t bg-gray-800">
        Powered by
        <Link
          href="https://canari.com"
          target="_blank"
          className="underline underline-offset-4 text-white"
        >
          Canari solutions
        </Link>
      </footer>
    </div>
  );
};

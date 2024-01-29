"use client";
import { EditorGrid, EditorTools, Sidebar } from "@/components";
import React from "react";
import Link from "next/link";
import { FloatingDeleteButton } from "@/components/ui/floating-delete-button";
import { useRouter, useParams } from "next/navigation";
import { deleteDeck, getDeck } from "@/lib/firebase/firestore/decks.firestore";
import { normalizedEditorData } from "@/types/editor.types";
import {
  useObservable,
  useDecksObserveable,
  useCreateDeckObserveable,
  useStore,
  usePageObserveable,
} from "@/store";
import { useEditorObserveable } from "@/store/editor.observeable";
import { toast } from "react-toastify";

export const EditorContainer = () => {
  const router = useRouter();
  // router get id
  const params = useParams<{ id: string }>();
  // states
  const [isLoading, setIsLoading] = React.useState(false);
  const editorDeck$ = useEditorObserveable();
  const editorState = useObservable(editorDeck$.getObservable());
  const page$ = usePageObserveable();
  const pageState = useObservable(page$.getObservable());

  console.log("editorstate", editorState);

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
          return pages[key].order === 0;
        })[0];
        if (!firstPage) {
          firstPage = Object.keys(pages)[0];
        }
        console.log("firstPage", firstPage, pages);
        page$.setPageInfo({
          currentPage: pages[firstPage].order,
          totalPages: Object.keys(pages).length,
          pageName: pages[firstPage].pageName,
          pageId: firstPage,
        });
      });
    } catch (err) {
      console.log(err);
      setIsLoading(false);
    }
  }, [params.id]);

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
      {/** header layout */}
      <EditorTools />
      {/** content layout */}
      <div className="flex flex-1">
        <Sidebar />
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
        {!isLoading && <EditorGrid editorState={editorState} />}
      </div>
      {/** footer layout */}
      <footer className="w-full p-2 flex flex-row gap-1 justify-center items-center border-t bg-gray-800">
        Powered by
        <Link
          href="https://canari.com"
          target="_blank"
          className="underline underline-offset-4 text-white"
        >
          Canari solutions
        </Link>
      </footer>
      <FloatingDeleteButton onClick={deleteDeckCallback} />
    </div>
  );
};

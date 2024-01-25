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
} from "@/store";
import { useEditorObserveable } from "@/store/editor.observeable";

export const EditorContainer = () => {
  const router = useRouter();
  // router get id
  const params = useParams<{ id: string }>();
  // states
  const editorDeck$ = useEditorObserveable();
  const editorState = useObservable(editorDeck$.getObservable());

  // effects
  React.useEffect(() => {
    if (!params.id) return;
    // fetch deck
    getDeck(params.id).then((deck) => {
      if (!deck) return;
      const normalizedDeck = normalizedEditorData(deck);
      console.log("editor deck", params.id, deck);
      editorDeck$.setInitialState(normalizedDeck);
    });
  }, [params.id]);

  // callbacks
  const deleteDeckCallback = () => {
    deleteDeck(params.id)
      .then(() => {
        router.push(`/`);
      })
      .catch((error) => {});
  };

  return (
    <div className="flex flex-col flex-1 flex-grow w-full h-full">
      {/** header layout */}
      <EditorTools />
      {/** content layout */}
      <div className="flex flex-1">
        <Sidebar />
        <EditorGrid editorState={editorState} />
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

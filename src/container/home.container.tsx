"use client";
import { useCreateDeckObserveable, useStore } from "../store";
import { appSelector } from "../selectors";
import { Home } from "../components/home";
import { AppInterface } from "../types/interface";
import { useRouter } from "next/navigation";
import { useObservable } from "@/store";
import React from "react";
import { addNewDeck } from "@/lib/firebase/firestore/decks.firestore";
import { v4 } from "uuid";
import { FloatingCreateButton } from "@/components/ui/floating-create-button";

export const HomeContainer = () => {
  const { state } = useStore();
  const router = useRouter();

  // states
  const [deckId, setDeckId] = React.useState<string | null>(null);
  const createDeck$ = useCreateDeckObserveable();
  const createDeckState = useObservable(createDeck$.getObservable());

  // callbacks
  const handleOnEdit = (id: string) => {
    router.push(`/editor/${id}`);
  };

  const handleOnCreate = () => {
    createDeckCallback();
  };

  const createDeckCallback = () => {
    createDeck$.setLoading(true);
    const newId = v4();
    addNewDeck(newId)
      .then(() => {
        setDeckId(newId);
        createDeck$.setLoading(false);
        router.push(`/editor/${newId}`);
      })
      .catch((error) => {
        createDeck$.setError(error.message);
        createDeck$.setLoading(false);
      });
  };

  let homeData: AppInterface[] | undefined = appSelector(state);
  return (
    <>
      <Home
        data={homeData}
        handleOnEdit={handleOnEdit}
        handleOnCreate={handleOnCreate}
        isLoading={createDeckState?.isLoading}
      />
      <FloatingCreateButton onClick={createDeckCallback} />
    </>
  );
};

"use client";
import { useStore } from "../store";
import { appSelector } from "../selectors";
import { Home } from "../components/home";
import { AppInterface } from "../types/interface";
import { useRouter } from "next/navigation";

export const HomeContainer = () => {
  const { state } = useStore();
  const router = useRouter();
  const handleOnEdit = (id: string) => {
    router.push(`/editor/${id}`);
  };
  let homeData: AppInterface[] | undefined = appSelector(state);
  return <Home data={homeData} handleOnEdit={handleOnEdit} />;
};

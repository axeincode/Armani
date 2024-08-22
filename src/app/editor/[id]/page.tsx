import { Suspense } from "react";
import { EditorContainer } from "@/container/editor.container";
import Loading from "@/components/loading";
import { EditModeHeader } from "@/components";
import { getAuthenticatedAppForUser } from "@/lib/firebase/firebase";
// components

export default async function Page() {
  const { currentUser } = await getAuthenticatedAppForUser();
  return (
    <div className="min-h-screen flex flex-col flex-1 flex-grow w-full h-full">
      <Suspense fallback={<Loading />}>
        <EditModeHeader currentUser={currentUser} />
        <EditorContainer />
      </Suspense>
    </div>
  );
}

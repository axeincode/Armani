import { Suspense } from "react";
import { EditorContainer } from "@/container/editor.container";
import Loading from "@/components/loading";
// components

export default async function Page() {
  return (
    <div className="min-h-screen flex flex-col flex-1 flex-grow w-full h-full">
      <Suspense fallback={<Loading />}>
        <EditorContainer />
      </Suspense>
    </div>
  );
}

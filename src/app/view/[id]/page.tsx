import { Suspense } from "react";
import Loading from "@/components/loading";
import { getAuthenticatedAppForUser } from "@/lib/firebase/firebase";
import { ViewContainer } from "@/container/view.container";
// components

export default async function Page() {
  const { currentUser } = await getAuthenticatedAppForUser();
  return (
    <div className="min-h-screen flex flex-col flex-1 w-full h-full">
      <Suspense fallback={<Loading />}>
        <ViewContainer currentUser={currentUser} />
      </Suspense>
    </div>
  );
}

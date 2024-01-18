// components
import { Header, Footer, Home } from "@/components";
import { getAuthenticatedAppForUser } from "@/lib/firebase/firebase";

export default async function Page() {
  const { currentUser } = await getAuthenticatedAppForUser();
  return (
    <>
      <Header currentUser={currentUser} />
      <Home />
      <Footer />
    </>
  );
}

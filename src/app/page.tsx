// components
import { Header, Footer } from "@/components";
import { HomeContainer } from "@/container/home.container";
import { getAuthenticatedAppForUser } from "@/lib/firebase/firebase";

export default async function Page() {
  const { currentUser } = await getAuthenticatedAppForUser();
  return (
    <>
      <Header currentUser={currentUser} />
      <HomeContainer />
      <Footer />
    </>
  );
}

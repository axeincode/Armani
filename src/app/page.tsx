// components
import { Footer, Header } from "@/components";
import { HomeContainer } from "@/container/home.container";
import { getAuthenticatedAppForUser } from "@/lib/firebase/firebase";
import { TableWithoutHeading } from "@/components/ui/table-without-heading";
import { TableWithHeading } from "@/components/ui/table-with-heading";
const data = {
  headings: ["1", "2"],
  rows: [
    {
      value: "hello",
      colIndex: 0,
      id: 0,
    },
    {
      value: "testing",
      colIndex: 1,
      id: 1,
    },
  ],
};

const headings = ["Name", "Age", "Gender"];
const data1 = [
  {
    value: "test",
    colIndex: 0,
    id: 0,
  },
  {
    value: "12",
    colIndex: 1,
    id: 1,
  },
  {
    value: "male",
    colIndex: 1,
    id: 1,
  },
];

export default async function Page() {
  const { currentUser } = await getAuthenticatedAppForUser();
  return (
    <>
      <Header currentUser={currentUser} />
      <HomeContainer />
      <TableWithoutHeading data={data} />
      <TableWithHeading data={data1} headings={headings} />
      <Footer />
    </>
  );
}

import { getServerSession } from "next-auth";
import authOptions from "./auth";

export default async function getCurrentUser() {
  console.log("authoptions", authOptions);
  const session = await getServerSession(authOptions);
  return session?.user;
}

import { Roles } from "@/types/roles";
import { redirect } from "next/navigation";
import { getUser } from "../(auth)/action";

async function page() {
  const user = await getUser();
  if (user.role === Roles.ADMIN) redirect("/admin");
  return <div>page</div>;
}
export default page;

import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";

export default async function DashboardRedirect() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    redirect("/portal/login");
  }

  const role = (session.user as any).role;

  if (role === "admin") {
    redirect("/portal/admin");
  } else if (role === "hr") {
    redirect("/portal/hr");
  } else {
    redirect("/portal/candidate");
  }

  return null; // Will never reach here due to redirects
}

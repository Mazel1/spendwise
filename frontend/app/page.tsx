import { redirect } from "next/navigation";

// Root always redirects — real landing can be added later
export default function RootPage() {
  redirect("/login");
}

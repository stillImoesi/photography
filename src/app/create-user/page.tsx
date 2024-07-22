import { cookies } from "next/headers";
import CreateUserForm from "./form";
import RedirectToQuery from "src/components/redirect";
import { jwtDecode } from "jwt-decode";
import { redirect } from "next/navigation";

export default function Page({
  searchParams,
}: {
  searchParams: { [key: string]: string };
}) {
  const cookieStore = cookies();
  const idToken = searchParams?.id_token || cookieStore.get("id_token")?.value;
  // check username from environment variables
  const username = process.env.ADMIN_USERNAME || "test_user";

  if (idToken) {
    const decodedToken = jwtDecode(idToken);

    if (decodedToken["sub"] !== username) {
      redirect("/");
    }

    if ((decodedToken["exp"] || 0) * 1000 < Date.now()) {
      redirect("/");
    }
  }

  return (
    <>
      <RedirectToQuery target={"create-user"} />
      <CreateUserForm />
    </>
  );
}

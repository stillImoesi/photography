"use server"

import Layout from "../layout";
import { headers } from "next/headers";
import { generateLogoutUrl } from "src/utils";
import Logout from "./logout";

export default async function Page({
  searchParams,
}: {
  searchParams: { [key: string]: string };
}) {
  const headersList = await headers();
  const origin = headersList.get("x-origin") || "";

  return (
    <Logout
      redirectUrl={generateLogoutUrl(origin, "/selection")}
    />
  );
}

Page.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

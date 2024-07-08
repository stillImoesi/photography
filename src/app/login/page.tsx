"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { generateLoginUrl } from "src/utils";

export default async function Page({
  searchParams,
}: {
  searchParams: { [key: string]: string };
}) {
  const headersList = await headers();
  const origin = headersList.get("x-origin") || "";

  redirect(generateLoginUrl(origin, searchParams.redirect));
}

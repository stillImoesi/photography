import { redirect } from "next/navigation";
import { ENDPOINT } from "./config";
import { Image, ImageUrlResponse } from "./type";

export const getAlbum = async (accessToken, idToken, albumName, referrer) => {
  const res = await fetch(`${ENDPOINT}/selection`, {
    next: { revalidate: 3600 },
    headers: {
      authorization: accessToken,
      "x-id-token": idToken,
      state: referrer === "final" ? "final" : "preview",
      ...(albumName ? { albumName } : {}),
    },
  });

  if (!res.ok) {
    if (res.status == 401) {
      redirect(`/login?redirect=/${referrer}`);
    } else {
      throw new Error("Failed to fetch data");
    }
  }

  const result = await res.json();
  return result;
};

export const getSignedUrls = async (
  keys: string[] = [],
  accessToken: string,
  idToken: string,
  endpoint: string,
  referrer?: string
): Promise<Image[]> => {
  if (!keys?.length || accessToken === "" || idToken === "") return [];
  const res = await fetch(`${endpoint}/get-signed-urls`, {
    next: { revalidate: 1800 },
    method: "POST",
    headers: {
      authorization: accessToken,
      "x-id-token": idToken,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      keysForSigning: keys,
    }),
  });

  if (res.status === 401) {
    if (typeof window !== "undefined") {
      window.open(`/login?redirect=/selection`, "_self");
    } else {
      redirect(`/login?redirect=/${referrer || "selection"}`);
    }
  }

  const imageUrlResponse: ImageUrlResponse = (await res.json()) as any;

  return imageUrlResponse?.body?.urls;
};

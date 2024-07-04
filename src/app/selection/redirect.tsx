// This is your client-side component that handles the redirection
"use client"

import { useEffect } from "react";
import { generateLoginUrl, getWindowCookie } from "src/utils";

interface Props {
  path: string;
  albumName?: string;
}

const RedirectToQuery = ({ path }: Props) => {

  useEffect(() => {
    if (typeof window !== "undefined") {

      const { location } = window;

      if (location.hash) {
        const hash = location.hash.substring(1);
        const queryString = hash.replace(/&/g, "&").replace(/=/g, "=");
        const newUrl = `${location.pathname}?${queryString}`;
        location.replace(newUrl);
      } else if (!getWindowCookie('access_token') || !getWindowCookie('id_token')) {
        location.replace(generateLoginUrl( location.origin, path));
      }
    }
  }, []);

  return null; // No need to render anything
};

export default RedirectToQuery;

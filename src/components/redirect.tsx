// This is your client-side component that handles the redirection
"use client";

import { useEffect } from "react";
import { generateLoginUrl, getWindowCookie } from "src/utils";

interface Props {
  target: string;
  cognitorLoginUrl?: string;
}

const RedirectToQuery = ({ target, cognitorLoginUrl }: Props) => {
  
  useEffect(() => {
    if (typeof window !== "undefined") {
      const { location } = window;

      if (location.hash) {
        const hash = location.hash.substring(1);
        const queryString = hash.replace(/&/g, "&").replace(/=/g, "=");
        const newUrl = `${location.pathname}?${queryString}`;
        location.replace(newUrl);
      } else if (
        !getWindowCookie("access_token") ||
        !getWindowCookie("id_token")
      ) {
        location.replace(
          generateLoginUrl(location.origin, `/${target}`, cognitorLoginUrl)
        );
      }
    }
  }, []);

  return null; // No need to render anything
};

export default RedirectToQuery;

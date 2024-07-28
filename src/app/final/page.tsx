import * as React from 'react';
import { AppBar, Box, Toolbar, Typography } from "@mui/material";
import Layout from "../layout";
import { ENDPOINT } from "src/utils/config";
import { cookies } from "next/headers";
import WhatsAppErrorMessage from "src/components/WhatsAppError";
import { AlbumResponse } from "src/utils/type";
import { getAlbum, getSignedUrls } from "src/utils/apis";
import ImageListComponent from "./imageList";
import RedirectToQuery from "../../components/redirect";

export default async function Page({
  searchParams,
}: {
  searchParams: { [key: string]: string };
}) {
  const cookieStore = cookies();
  const accessToken =
    searchParams?.access_token || cookieStore.get("access_token")?.value || "";
  const idToken =
    searchParams?.id_token || cookieStore.get("id_token")?.value || "";
  const albumTitle =
    searchParams?.album || cookieStore.get("album_title")?.value;

  let unSignedUrls: string[] = [];

  if (!albumTitle) {
    return (
      <WhatsAppErrorMessage
        error="No album is provided. Contact Admin below"
        message="Please can you give me the link to the album"
      />
    );
  }

  let albumResponse: AlbumResponse | undefined;

  if (accessToken && idToken) {
    albumResponse = await getAlbum(accessToken, idToken, albumTitle, "final");

    if (albumResponse?.statusCode === 404) {
      return (
        <WhatsAppErrorMessage
          error="Invalid Album requested. Contact Admin below"
          message="Please can you give me the link to the album"
        />
      );
    }

    unSignedUrls = albumResponse?.body?.final?.normal || [];
  }

  const albumProps =
    (albumResponse?.body?.albumProps &&
      Object.values(albumResponse.body?.albumProps)) ||
    [];

  const imageList = await getSignedUrls(
    unSignedUrls,
    accessToken,
    idToken,
    ENDPOINT,
    "final"
  );

  return (
    <>
      <RedirectToQuery target="final" cognitorLoginUrl={process.env.COGNITO_LOGIN_URL}  />
      <Box>
        {albumProps.map((album) => (
          <div key={album.title}>
            <Box>
              <AppBar
                position="fixed"
                sx={{ display: { background: "#000000bd" } }}
              >
                <Toolbar sx={{ justifyContent: "space-between" }}>
                  <Typography sx={{ typography: { sm: "h4", xs: "h6" } }}>
                    {`Album: ${albumTitle?.replaceAll("_", " ")}`}
                  </Typography>
                </Toolbar>
              </AppBar>
            </Box>
            <Box sx={{ marginTop: "64px" }}>
              <ImageListComponent imageList={imageList} />
            </Box>
          </div>
        ))}
      </Box>
    </>
  );
}

Page.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

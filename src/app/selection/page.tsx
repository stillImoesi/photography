import * as React from "react";
import Layout from "../layout";
import RedirectToQuery from "../../components/redirect";
import ImageSelectionList from "./imageSelection";
import { cookies } from "next/headers";
import { AlbumResponse } from "src/utils/type";
import { ENDPOINT } from "src/utils/config";
import { getAlbum } from "src/utils/apis";
import WhatsAppErrorMessage from "src/components/WhatsAppError";
import { addDays } from "src/utils";
import { Box, Link, Typography } from "@mui/material";

const PATH = "selection";

export default async function Page({
  searchParams,
}: {
  searchParams: { [key: string]: string };
}) {
  const cookieStore = cookies();
  const accessToken =
    searchParams?.access_token || cookieStore.get("access_token")?.value;
  const idToken = searchParams?.id_token || cookieStore.get("id_token")?.value;
  const albumTitle =
    searchParams?.album || cookieStore.get("album_title")?.value;

  let unSignedUrls: string[] = [];

  let albumResponse: AlbumResponse | undefined;

  if (accessToken && idToken) {
    albumResponse = await getAlbum(accessToken, idToken, albumTitle, PATH);

    if (albumResponse?.statusCode === 404) {
      return (
        <WhatsAppErrorMessage
          error="Invalid Album requested. Contact Admin below"
          message="Please can you give me the link to the album"
        />
      );
    }

    unSignedUrls = albumResponse?.body?.preview || [];
  }

  const albums =
    (albumResponse?.body?.albumProps &&
      Object.values(albumResponse.body?.albumProps)) ||
    [];

  if (!albumTitle) {
    return (
      <>
        {/* check for hash key in url */}
        <RedirectToQuery
          target={PATH}
          cognitorLoginUrl={process.env.COGNITO_LOGIN_URL}
        />
        <WhatsAppErrorMessage
          error="No album is selected. Select an ablum or contact admin."
          message="Select an album below or contact admin for help."
        />
        <Box sx={{ textAlign: "center", marginTop: "20px" }}>
          <Typography variant="h4">Select an album to continue</Typography>
          <Typography variant="h4">🎞</Typography>
          {albums.map((album) => (
            <Link
              key={album.title}
              href={`/${PATH}?album=${album.title}`}
              underline="hover"
              color="secondary"
              variant="button"
            >
              <Typography variant="h6">
                {album.title?.replaceAll("_", " ")}
              </Typography>
            </Link>
          ))}
        </Box>
      </>
    );
  }

  const selectedAlbum = albums.find((album) => album.title === albumTitle);

  return (
    <>
      {/* check for hash key in url */}
      <RedirectToQuery
        target={PATH}
        cognitorLoginUrl={process.env.COGNITO_LOGIN_URL}
      />
      {selectedAlbum === undefined ? (
        <WhatsAppErrorMessage
          error="Selected album not found. Contact admin for help"
          message="Select an album below or contact admin for help."
        />
      ) : (
        <div>
          <ImageSelectionList
            albumTitle={selectedAlbum.title}
            maxSelectedPics={selectedAlbum.max_allowed_pictures}
            accessToken={accessToken || ""}
            idToken={idToken || ""}
            endpoint={ENDPOINT}
            previouslySelected={selectedAlbum.selected_pictures}
            unSignedUrls={unSignedUrls}
            status={selectedAlbum.album_status}
            albumExpiry={addDays(selectedAlbum.created_at || "")}
          />
        </div>
      )}
    </>
  );
}

Page.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

import Layout from "../layout";
import RedirectToQuery from "../../components/redirect";
import ImageSelectionList from "./imageSelection";
import { cookies } from "next/headers";
import { AlbumResponse } from "src/utils/type";
import { ENDPOINT } from "src/utils/config";
import { getAlbum } from "src/utils/apis";
import WhatsAppErrorMessage from "src/components/WhatsAppError";
import { addDays } from "src/utils";

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
    albumResponse = await getAlbum(
      accessToken,
      idToken,
      albumTitle,
      PATH
    );

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

  return (
    <>
      {/* check for hash key in url */}
      <RedirectToQuery target={PATH} />
      {albums.map((album) => (
        <div key={album.title}>
          <ImageSelectionList
            albumTitle={album.title}
            maxSelectedPics={album.max_allowed_pictures}
            accessToken={accessToken || ""}
            idToken={idToken || ""}
            endpoint={ENDPOINT}
            previouslySelected={album.selected_pictures}
            unSignedUrls={unSignedUrls}
            status={album.album_status}
            albumExpiry={addDays(album.created_at || "")}
          />
        </div>
      ))}
    </>
  );
}

Page.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

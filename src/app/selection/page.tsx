import Layout from "../layout";
import RedirectToQuery from "./redirect";
import { redirect } from "next/navigation";
import ImageSelectionList from "./imageSelection";
import { cookies } from "next/headers";
import { Link, Typography } from "@mui/material";
import whatsApp from "../../assets/WhatsAppButtonGreenSmall.png";

interface Image {
  url: string;
  title: string;
}

interface AlbumResponse {
  statusCode: number;
  body: {
    preview: string[];
    albumProps: {
      [key: string]: {
        title: string;
        max_allowed_pictures: number;
        selected_pictures: string[];
      };
    };
  };
}

interface ImageUrlResponse {
  statusCode: number;
  body: {
    urls: {
      url: string;
      title: string;
    }[];
  };
}

const DEV_ENDPOINT =
  "https://rzs6126mm7.execute-api.eu-central-1.amazonaws.com/dev";
const PROD_ENDPOINT =
  "https://rzs6126mm7.execute-api.eu-central-1.amazonaws.com/prod";

const ENDPOINT =
  process.env.NODE_ENV === "production" ? PROD_ENDPOINT : DEV_ENDPOINT;

const getAlbum = async (accessToken, idToken, albumTitle) => {
  const res = await fetch(`${DEV_ENDPOINT}/selection`, {
    cache: "no-cache",
    headers: {
      authorization: accessToken,
      "x-id-token": idToken,
      state: "preview",
      albumName: albumTitle,
    },
  });

  if (!res.ok) {
    if (res.status == 401) {
      redirect("/login?redirect=/selection");
    } else {
      throw new Error("Failed to fetch data");
    }
  }

  return res.json();
};

const getSignedUrls = async (
  keys: string[] = [],
  accessToken,
  idToken
): Promise<Image[]> => {
  if (!keys?.length) return [];
  const res = await fetch(`${DEV_ENDPOINT}/get-signed-urls`, {
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

  const imageUrlResponse: ImageUrlResponse = (await res.json()) as any;

  return imageUrlResponse.body.urls;
};

const renderWhatsappMessage = (error: string, message: string) => (
  <div style={{ paddingTop: "30vh", textAlign: "center" }}>
    <Typography variant="h5" align="center" sx={{ marginBottom: "20px" }}>
      {error}
    </Typography>
    <Link
      type="button"
      href={`https://wa.me/+358444919193?text=${message}`}
      target="_blank"
    >
      <img
        src={whatsApp.src}
        alt="sent message via whatsapp"
        style={{ maxWidth: "250px" }}
      />
    </Link>
  </div>
);

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
    searchParams?.albumTitle || cookieStore.get("album_title")?.value;

  if (!albumTitle) {
    return renderWhatsappMessage(
      "No album is provided. Contact Admin below",
      "https://wa.me/+358444919193?text=Please can you give me the link to the album"
    );
  }

  let imageUrls: {
    url: string;
    title: string;
  }[] = [];
  let albumResponse: AlbumResponse | undefined;

  if (accessToken && idToken) {
    albumResponse = await getAlbum(accessToken, idToken, albumTitle);

    if (albumResponse?.statusCode === 404) {
      return renderWhatsappMessage(
        "Invalid Album requested. Contact Admin below",
        "https://wa.me/+358444919193?text=Please can you give me the link to the album"
      );
    }

    imageUrls = await getSignedUrls(
      albumResponse?.body?.preview,
      accessToken,
      idToken
    );
  }

  const albumProps =
    (albumResponse?.body?.albumProps &&
      Object.values(albumResponse.body?.albumProps)) ||
    [];

  return (
    <>
      {/* check for hash key in url */}
      <RedirectToQuery path="/selection" />
      {albumProps.map((album) => (
        <div key={album.title}>
          <ImageSelectionList
            imageList={imageUrls}
            albumTitle={album.title}
            maxSelectedPics={album.max_allowed_pictures}
            accessToken={accessToken || ""}
            idToken={idToken || ""}
            endpoint={ENDPOINT}
            previouslySelected={album.selected_pictures}
          />
        </div>
      ))}
    </>
  );
}

Page.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

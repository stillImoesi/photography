import "../../index.css";
import StoreProvider from "../StoreProvider";
import { ClientOnly } from "./client";
import path from "path";
import fs from "fs/promises";

export function generateStaticParams() {
  return [{ slug: [""] }];
}

const Page = async () => {
  const imageDirectory = path.join(process.cwd(), "public", "assets", "studio");
  const filenames = await fs.readdir(imageDirectory, {
    withFileTypes: true,
    encoding: null,
  });
  const images = filenames.map(({ name }, index) => ({
    url: `/assets/studio/${name}`,
    title: `pix${index + 1}`,
  }));

  return (
    <StoreProvider>
      <ClientOnly studio={images} location={images} />
    </StoreProvider>
  );
};

export default Page;

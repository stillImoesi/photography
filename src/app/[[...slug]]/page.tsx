import "../../index.css";
import { ClientOnly } from "./client";
import path from "path";
import fs from "fs/promises";

export function generateStaticParams() {
  return [{ slug: [""] }];
}

const getImagesSrc = async () => {
  const imageDirectory = path.join(process.cwd(), "src", "assets", "studio");
  const filenames = await fs.readdir(imageDirectory, {
    withFileTypes: true,
    encoding: null,
  });
  return Promise.all(
    filenames.map(async ({ name }, index) => ({
      path: (await import(`../../assets/studio/${name}`)).default,
      title: `pix${index + 1}`,
    }))
  );
};

const Page = async () => {
  const images = await getImagesSrc();

  return <ClientOnly studio={images} location={images} />;
};

export default Page;

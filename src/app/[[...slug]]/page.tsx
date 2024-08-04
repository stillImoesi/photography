import * as React from "react";
import "../../index.css";
import { ClientOnly } from "./client";
import path from "path";
import fs from "fs/promises";
import { LocalImages } from "src/utils/type";

export function generateStaticParams() {
  return [{ slug: [""] }];
}

const getImagesSrc = async (): Promise<LocalImages[]> => {
  const imageDirectory = path.join(process.cwd(), "src", "assets", "studio");
  const filenames = await fs.readdir(imageDirectory, {
    withFileTypes: true,
    encoding: null,
  });
  return Promise.all(
    filenames
      .filter(({ name }) => Boolean(name.match("DS_Store")) == false)
      .map(async ({ name }, index) => ({
        path: (await import(`../../assets/studio/${name}`)).default,
        title: `pix${index + 1}`,
      }))
  );
};

const Page = async () => {
  const images = await getImagesSrc();

  return <ClientOnly images={images} />;
};

export default Page;

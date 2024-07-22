"use client";

import { Box, Button, ImageListItem } from "@mui/material";
import ImageList from "@mui/material/ImageList";
import * as React from "react";
import ImgsViewer from "react-images-viewer";
import DownloadIcon from "@mui/icons-material/DownloadOutlined";
import PrintGuide from "./printGuide";

interface ImageListProps {
  imageList: {
    title: string;
    url: string;
  }[];
}

const ImageListComponent = ({ imageList }: ImageListProps) => {
  const [selectedImage, handleOnSelectedImage] = React.useState<number>(-1);
  const [imgCols, updateImgCols] = React.useState<number>();
  const [guideOpen, handleGuideOpen] = React.useState<boolean>(false);

  React.useEffect(() => {
    updateImgCols(screen.orientation.type == "landscape-primary" ? 4 : 2);
  }, []);

  const openImagePreview = selectedImage > -1;

  return (
    <>
      <ImageList
        cols={imgCols}
        sx={{
          width: "100vw",
          transform: "translateZ(0)",
        }}
        gap={18}
        variant="masonry"
      >
        {imageList.map((item, imageIndex) => {
          const cols = 1;
          const rows = 1;
          // const isSelectedIndex = getIndex(selectedPics, item.title);
          // const isSelected = isSelectedIndex > -1;

          return (
            <ImageListItem key={item.url} cols={cols} rows={rows}>
              <img
                src={item.url}
                alt={item.url}
                onClick={() => handleOnSelectedImage(imageIndex)}
                loading="lazy"
                style={{
                  width: "100%",
                  objectFit: "contain",
                  height: "100%",
                }}
              />
            </ImageListItem>
          );
        })}
      </ImageList>

      <PrintGuide
        open={guideOpen}
        onClose={() => handleGuideOpen(false)}
        image={imageList[selectedImage]}
      />
      {/* Image preview Modal */}
      {openImagePreview && (
        <Box>
          <Box
            sx={{
              position: "fixed",
              zIndex: 2002,
              bottom: 0,
              textAlign: "center",
              width: "100%",
              background: "#0000003d",
              button: {
                margin: "0 10px",
              },
            }}
          >
            <a download={"test"} href={imageList[selectedImage]?.url}>
              <Button
                variant="contained"
                aria-label="open resolution guide"
                startIcon={<DownloadIcon />}
                color="success"
                onClick={() => {
                  handleGuideOpen(true);
                }}
              >
                Download
              </Button>
            </a>
          </Box>
          <ImgsViewer
            preventScroll={false}
            isOpen={openImagePreview}
            imgs={imageList.map((i) => ({
              src: i.url,
              srcSet: i.url,
            }))}
            currImg={selectedImage}
            onClose={() => handleOnSelectedImage(-1)}
            preloadNextImg
            showCloseBtn
            backdropCloseable
            onClickNext={() => {
              handleOnSelectedImage(
                imageList.length - 1 === selectedImage
                  ? selectedImage
                  : selectedImage + 1
              );
            }}
            onClickPrev={() =>
              handleOnSelectedImage(
                selectedImage === 0 ? selectedImage : selectedImage - 1
              )
            }
          />
        </Box>
      )}
    </>
  );
};

export default ImageListComponent;

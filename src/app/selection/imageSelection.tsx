"use client";

import * as React from "react";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import IconButton from "@mui/material/IconButton";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import StarFilledIcon from "@mui/icons-material/Star";
import PriorityHighIcon from "@mui/icons-material/PriorityHigh";
import { Suspense } from "react";
import {
  AppBar,
  Backdrop,
  Box,
  Button,
  Fade,
  Modal,
  Toolbar,
  Typography,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import ImgsViewer from "react-images-viewer";

const MODEL_MESSAGE_SELECTION_COMPLETED =
  "Are you sure you want to lock in these selection? Selection cannot be changed later.";
const MODEL_MESSAGE_SELECTION_RANGE_EXCEEDED =
  "You have selected more that the images allocated to you :). Photographer will be notified. Do you want to lock in these selection?";
const MODEL_MESSAGE_SELECTION_ADDING_TO_PREVIOUSLY_SELECTED =
  "You are adding more pictures to the onces you have previously selected :). Photographer will be notified. Do you want to lock in these selection?";

const modelStyle = {
  position: "absolute" as "absolute",
  color: "#000",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  maxWidth: 600,
  width: "70vw",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

interface ImageSelectionProps {
  imageList: {
    title: string;
    url: string;
  }[];
  albumName: string;
  maxSelectedPics: number;
  idToken: string;
  accessToken: string;
  endpoint: string;
  previouslySelected: string[];
}

const getIndex = (selectedPics, target) => {
  return selectedPics.findIndex((x) => x === target);
};

const renderIconStar = ({
  item,
  isSelected,
  selectedPics,
  previouslySelected,
  updateSelectedPics,
  isSelectedIndex,
}: {
  item: {
    url: string;
    title: string;
  };
  isSelected: boolean;
  selectedPics: string[];
  previouslySelected: string[];
  updateSelectedPics: (pics: string[]) => void;
  isSelectedIndex: number;
}) => (
  <IconButton
    sx={{ color: "white", fill: "red" }}
    color="success"
    aria-label={`star ${item.url}`}
    disabled={previouslySelected.includes(item.title)}
    onClick={() => {
      if (!isSelected) {
        selectedPics.push(item.title);
        updateSelectedPics([...selectedPics]);
      } else if (isSelected) {
        selectedPics.splice(isSelectedIndex, 1);
        updateSelectedPics([...selectedPics]);
      }
    }}
  >
    {isSelected ? <StarFilledIcon /> : <StarBorderIcon />}
  </IconButton>
);

export default function ImageSelectionList(props: ImageSelectionProps) {
  const {
    previouslySelected,
    imageList,
    albumName,
    endpoint,
    accessToken,
    idToken,
    maxSelectedPics,
  } = props;
  const [selectedPics, updateSelectedPics] = React.useState<string[]>([
    ...previouslySelected,
  ]);

  const [selectionModalState, handleSelectionModalState] =
    React.useState<boolean>(false);
  const [selectedImage, handleOnSelectedImage] = React.useState<number>(-1);
  const openImagePreview = selectedImage > -1;

  const previewSelectionItem = imageList[selectedImage];
  const previewSelectionItemIndex =
    previewSelectionItem && getIndex(selectedPics, previewSelectionItem.title);

  const submitImageSelection = async () => {
    try {
      const res = await fetch(`${endpoint}/selection`, {
        next: { revalidate: 1800 },
        method: "PATCH",
        headers: {
          authorization: accessToken,
          "x-id-token": idToken,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          imageSelection: selectedPics,
          title: albumName,
        }),
      });
      const response = await res.json();

      if (response.statusCode !== 200) {
        throw Error(response.body);
      }
      handleSelectionModalState(false);
      if (selectedPics.length > maxSelectedPics) {
        window.open(
          `https://wa.me/+358444919193?text=I have selected additional picture more that we agreed. Thanks`
        );
      }
    } catch (e) {
      console.log({ e });
      throw Error(e.message);
    }
  };

  const isSelectedPicsExceeded = selectedPics.length > maxSelectedPics;
  const imgCols =
    typeof window === "undefined"
      ? 4
      : screen.orientation.type == "landscape-primary"
      ? 4
      : 2;

  const hideSelectionButton =
    JSON.stringify(selectedPics) === JSON.stringify(previouslySelected) ||
    selectedPics.length < maxSelectedPics;

  return (
    <React.Fragment>
      {/* Submit Modal */}
      <Modal
        aria-labelledby="selection warning modal"
        aria-describedby="do you want to submit your selection"
        open={selectionModalState}
        onClose={() => handleSelectionModalState(false)}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={selectionModalState}>
          <Box sx={modelStyle}>
            <Typography
              id="selection warning modal"
              variant="h6"
              component="h2"
            >
              {`Selected ${selectedPics.length} / ${maxSelectedPics}`}
            </Typography>
            <Typography
              id="do you want to submit your selection"
              sx={{ mt: 2 }}
            >
              {isSelectedPicsExceeded
                ? previouslySelected
                  ? MODEL_MESSAGE_SELECTION_ADDING_TO_PREVIOUSLY_SELECTED
                  : MODEL_MESSAGE_SELECTION_RANGE_EXCEEDED
                : MODEL_MESSAGE_SELECTION_COMPLETED}
            </Typography>
            <Box
              sx={{
                float: "right",
                marginTop: "20px",
              }}
            >
              <Button
                color="secondary"
                variant="outlined"
                onClick={() => handleSelectionModalState(false)}
              >
                Cancel
              </Button>
              <Button
                sx={{
                  marginLeft: "20px",
                }}
                color="success"
                onClick={() => submitImageSelection()}
                variant="contained"
                endIcon={<SendIcon />}
              >
                Accept
              </Button>
            </Box>
          </Box>
        </Fade>
      </Modal>
      {/* Top Menu */}
      <AppBar position="fixed" sx={{ display: { background: "#000000bd" } }}>
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Typography variant="h4" component="h4">
            {`Selection: Album ${albumName}`}
          </Typography>
          <Box sx={{ display: { xs: "block" } }}>
            <Button
              variant="contained"
              onClick={() => handleSelectionModalState(true)}
              disabled={hideSelectionButton}
              color="secondary"
            >
              {`Select ${selectedPics.length}/${maxSelectedPics}`}
              {isSelectedPicsExceeded && <PriorityHighIcon />}
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
      <Toolbar />
      {/* Image selection */}
      <Box sx={{ margin: "20px 0" }}>
        <Suspense fallback={<h1>Loading...</h1>}>
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
              const isSelectedIndex = getIndex(selectedPics, item.title);
              const isSelected = isSelectedIndex > -1;

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
                  <ImageListItemBar
                    sx={{
                      background: `linear-gradient(to bottom, rgb(0 0 0 / 44%) 0%, rgb(0 0 0 / 21%) 70%, rgb(0 0 0 / 7%) 100%)`,
                    }}
                    title={item.title}
                    position="top"
                    actionIcon={renderIconStar({
                      item,
                      isSelected,
                      previouslySelected,
                      updateSelectedPics,
                      isSelectedIndex,
                      selectedPics,
                    })}
                    actionPosition="left"
                  />
                </ImageListItem>
              );
            })}
          </ImageList>
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
                }}
              >
                {renderIconStar({
                  item: previewSelectionItem,
                  isSelected: previewSelectionItemIndex > 1,
                  previouslySelected,
                  updateSelectedPics,
                  isSelectedIndex: previewSelectionItemIndex,
                  selectedPics,
                })}
              </Box>

              <ImgsViewer
                isOpen={openImagePreview}
                imgs={props.imageList.map((i) => ({
                  src: i.url,
                  srcSet: i.url,
                  caption: i.title,
                }))}
                currImg={selectedImage}
                onClose={() => handleOnSelectedImage(-1)}
                preloadNextImg
                showCloseBtn
                backdropCloseable
                onClickNext={(e) =>
                  handleOnSelectedImage(
                    imageList.length - 1 === selectedImage
                      ? selectedImage
                      : selectedImage - 1
                  )
                }
                onClickPrev={(e) =>
                  handleOnSelectedImage(
                    selectedImage === 0 ? selectedImage : selectedImage - 1
                  )
                }
              />
            </Box>
          )}
        </Suspense>
      </Box>
    </React.Fragment>
  );
}

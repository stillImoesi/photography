"use client";

import * as React from "react";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import IconButton from "@mui/material/IconButton";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import StarFilledIcon from "@mui/icons-material/Star";
import PriorityHighIcon from "@mui/icons-material/PriorityHigh";
import {
  AppBar,
  Backdrop,
  Box,
  Button,
  Fade,
  Link,
  Modal,
  Pagination,
  Toolbar,
  Typography,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import ImgsViewer from "react-images-viewer";
import { getPaginatedChunk } from "src/utils";
import { Image } from "src/utils/type";
import Countdown from "react-countdown";
import { getSignedUrls } from "src/utils/apis";

const MODEL_MESSAGE_SELECTION_COMPLETED =
  "Are you sure you want to lock in these selection? Selection cannot be changed later.";
const MODEL_MESSAGE_SELECTION_RANGE_EXCEEDED =
  "You have selected more that the images allocated to you :). Photographer will be notified. Do you want to lock in these selection?";
const MODEL_MESSAGE_SELECTION_ADDING_TO_PREVIOUSLY_SELECTED =
  "You are adding more pictures to the onces you have previously selected :). Photographer will be notified. Do you want to lock in these selection for additional fee of 35€ / photo?";

const modelStyle = {
  position: "absolute",
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
  albumTitle: string;
  maxSelectedPics: number;
  idToken: string;
  accessToken: string;
  endpoint: string;
  previouslySelected: string[];
  unSignedUrls: string[];
  status?: string;
  albumExpiry: Date;
}

const getIndex = (selectedPics, target) => {
  return selectedPics.findIndex((x) => x === target);
};

const RenderIconStar = React.memo(function RenderIconStar({
  item,
  isSelected,
  selectedPics,
  previouslySelected,
  updateSelectedPics,
  isSelectedIndex,
  disabledEditing,
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
  disabledEditing: boolean;
}) {
  return (
    <IconButton
      sx={{ color: "white", fill: "red" }}
      color="success"
      aria-label={`star ${item.url}`}
      disabled={previouslySelected.includes(item.title) || disabledEditing}
      onClick={() => {
        if (!isSelected) {
          selectedPics.push(item.title);
          updateSelectedPics(selectedPics);
        } else if (isSelected) {
          selectedPics.splice(isSelectedIndex, 1);
          updateSelectedPics(selectedPics);
        }
      }}
    >
      {isSelected ? <StarFilledIcon /> : <StarBorderIcon />}
    </IconButton>
  );
});

const RenderProgressStatus = React.memo(function RenderIconStar({
  status,
  albumTitle,
}: {
  status?: string;
  albumTitle: string;
}) {
  const typographyProps = {
    sx: {
      typography: { xs: "body" },
      textDecoration: "underline",
      textAlign: "center",
    },
  };
  const progressMessage = (
    <Typography {...typographyProps}>
      Photographer is working on your pictures. You will be notified when they
      are ready
    </Typography>
  );

  const completedMessage = (
    <Typography {...typographyProps}>
      Picture are complete and ready for download. Click{" "}
      <Link href={`/final?album=${albumTitle}`}>here</Link>
    </Typography>
  );

  if (status) {
    return (
      <Toolbar sx={{ justifyContent: "center" }}>
        {status === "progress"
          ? progressMessage
          : status === "completed"
          ? completedMessage
          : null}
      </Toolbar>
    );
  }
  return null;
});

export default function ImageSelectionList(props: ImageSelectionProps) {
  const {
    previouslySelected,
    albumTitle,
    endpoint,
    accessToken,
    idToken,
    maxSelectedPics,
    unSignedUrls,
    albumExpiry,
  } = props;

  const [alreadySelectedPictures, updateAlreadySelectedPictures] =
    React.useState<string[]>([...previouslySelected]);

  const [selectedPics, updateSelectedPics] = React.useState<string[]>([
    ...previouslySelected,
  ]);

  const [disabledEditing, handleDisableEditing] =
    React.useState<boolean>(false);
  const [imgCols, updateImgCols] = React.useState<number>();
  const [windowLoaded, setWindowLoadingValue] = React.useState<boolean>(false);

  React.useEffect(() => {
    setWindowLoadingValue(true);
    updateImgCols(screen.orientation.type == "landscape-primary" ? 4 : 2);
  }, []);

  const [selectionModalState, handleSelectionModalState] =
    React.useState<boolean>(false);
  const [selectedImage, handleOnSelectedImage] = React.useState<number>(-1);
  const [currPage, handleCurrPage] = React.useState<number>(1);
  const [imageList, updateImageList] = React.useState<Image[]>([]);

  const prevCurrPage = React.useRef(0);

  React.useEffect(() => {
    if (currPage !== prevCurrPage.current) {
      getSignedUrls(
        getPaginatedChunk([...unSignedUrls], currPage),
        accessToken,
        idToken,
        endpoint
      ).then((res) => {
        updateImageList(res);
      });
      prevCurrPage.current = currPage;
    }
  }, [currPage]);

  const openImagePreview = selectedImage > -1;

  const previewSelectionItem = imageList?.[selectedImage];
  const previewSelectionItemIndex =
    previewSelectionItem && getIndex(selectedPics, previewSelectionItem.title);

  const submitImageSelection = React.useCallback(async () => {
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
          title: albumTitle,
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
      } else {
        window.open(
          `https://wa.me/+358444919193?text=I have made my selection. Thanks`
        );
      }
      updateAlreadySelectedPictures(selectedPics);
    } catch (e) {
      throw Error(e.message);
    }
  }, [selectedPics]);

  const isSelectedPicsExceeded = selectedPics.length > maxSelectedPics;

  const hideSelectionButton = React.useCallback(
    () =>
      Boolean(
        JSON.stringify(selectedPics) ===
          JSON.stringify(alreadySelectedPictures) ||
          selectedPics.length < maxSelectedPics
      ),
    [selectedPics, alreadySelectedPictures]
  );

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
          <Typography sx={{ typography: { sm: "h4", xs: "h6" } }}>
            {`Album: ${albumTitle?.replaceAll("_", " ")}`}
          </Typography>
          <Box sx={{ display: { xs: "block" } }}>
            {hideSelectionButton() ? (
              windowLoaded ? (
                <Typography sx={{ typography: "h6" }}>
                  Selection will be disabled in{" "}
                  <Countdown
                    date={albumExpiry}
                    onComplete={() => handleDisableEditing(false)}
                  />
                </Typography>
              ) : null
            ) : (
              <Button
                variant="contained"
                onClick={() => handleSelectionModalState(true)}
                color="secondary"
                disabled={disabledEditing}
              >
                {`Select ${selectedPics.length}/${maxSelectedPics}`}
                {isSelectedPicsExceeded && <PriorityHighIcon />}
              </Button>
            )}
          </Box>
        </Toolbar>
      </AppBar>
      {/* Image selection */}
      <Box sx={{ marginTop: "64px" }}>
        <RenderProgressStatus status={props.status} albumTitle={albumTitle} />
        <ImageList
          cols={imgCols}
          sx={{
            width: "100vw",
            transform: "translateZ(0)",
          }}
          gap={18}
          variant="masonry"
        >
          {imageList?.map((item, imageIndex) => {
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
                  actionIcon={
                    <RenderIconStar
                      item={item}
                      isSelected={isSelected}
                      selectedPics={[...selectedPics]}
                      previouslySelected={[...previouslySelected]}
                      updateSelectedPics={updateSelectedPics}
                      isSelectedIndex={isSelectedIndex}
                      disabledEditing={disabledEditing}
                    />
                  }
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
              <RenderIconStar
                item={previewSelectionItem}
                isSelected={previewSelectionItemIndex > -1}
                selectedPics={[...selectedPics]}
                previouslySelected={[...previouslySelected]}
                updateSelectedPics={updateSelectedPics}
                isSelectedIndex={previewSelectionItemIndex}
                disabledEditing={disabledEditing}
              />
            </Box>

            <ImgsViewer
              isOpen={openImagePreview}
              imgs={imageList.map((i) => ({
                src: i.url,
                srcSet: i.url,
                caption: i.title,
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
      </Box>
      <Pagination
        count={Math.ceil(unSignedUrls.length / 20)}
        color="secondary"
        onClick={(e) =>
          handleCurrPage(Number.parseInt((e.target as HTMLElement).innerText))
        }
        sx={{
          textAlign: "center",
          button: { color: "white !important" },
          ul: { justifyContent: "center" },
        }}
      />
    </React.Fragment>
  );
}

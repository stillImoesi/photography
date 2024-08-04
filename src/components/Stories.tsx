import { Box, Grid, Link, ListItem, Typography } from "@mui/material";
import React from "react";

import BirthdayCover from "../assets/stories/birthday.jpg";
import Halloween from "../assets/stories/halloween.jpg";
import Retreat from "../assets/stories/retreat.jpg";
import RenderListItemText from "./RenderHomeListItemText";
import { ArrowRightIcon } from "@mui/x-date-pickers";

const imageSty = {
  width: "100%",
  marginLeft: "auto",
};

const listItemSty = { color: "white", div: { flex: "initial" } };

const Stories = () => {
  return (
    <>
      <Box marginTop={"20px"}>
        <Typography variant="h4" component="h2" gutterBottom>
          Stories
        </Typography>
        <Grid container>
          <Grid item xs={12} sm={4}>
            <Link
              href="https://photos.app.goo.gl/boxMVN2eGN6w9Ne99"
              target="_blank"
            >
              <ListItem sx={listItemSty}>
                <RenderListItemText
                  primary="Birthday events for all ages"
                  // secondary="Book a session and get the best studio photos"
                />
                <ArrowRightIcon />
              </ListItem>
              <ListItem>
                <img
                  src={BirthdayCover.src}
                  alt="Studio photos service"
                  width="100%"
                  style={imageSty}
                />
              </ListItem>
            </Link>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Link
              href="https://photos.app.goo.gl/p9jaFATQHoSWzUiD8"
              target="_blank"
            >
              <ListItem sx={listItemSty}>
                <RenderListItemText
                  primary="Event and Party"
                  // secondary="Book a session and get the best studio photos"
                />
                <ArrowRightIcon />
              </ListItem>
              <ListItem>
                <img
                  src={Halloween.src}
                  alt="Studio photos service"
                  width="100%"
                  style={imageSty}
                />
              </ListItem>
            </Link>
          </Grid>
          <Grid item xs={12} sm={4}>
          <Link
              href="https://photos.app.goo.gl/Y4y2R16TKzd6BhAw5"
              target="_blank"
            >
            <ListItem sx={listItemSty}>
              <RenderListItemText
                primary="Company / team retreat"
                // secondary="Book a session and get the best studio photos"
              />
              <ArrowRightIcon />
            </ListItem>
            <ListItem>
              <img
                src={Retreat.src}
                alt="Studio photos service"
                width="100%"
                style={imageSty}
              />
            </ListItem>
            </Link>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default Stories;

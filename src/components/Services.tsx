import { Box, Grid, ListItem, Typography } from "@mui/material";
import * as React from "react";
import studioPic from "../assets/studio/4.jpg";
import sunsetPic from "../assets/sunset.jpg";
import high from "../assets/resolutionGuide/high3*2.jpg";
import RenderListItemText from "./RenderHomeListItemText";

const imageSty = {
  width: "100%",
  marginLeft: "auto",
};

const Services = () => {
  return (
    <Box sx={{ margin: "20px 0" }} id="services">
      <Typography variant="h4" component="h4">
        Services
      </Typography>
      <Grid container>
        <Grid item xs={12} sm={3}>
          <ListItem>
            <RenderListItemText
              primary="Studio Photos"
              secondary="Book a session and get the best studio photos"
            />
          </ListItem>
          <ListItem>
            <img
              src={studioPic.src}
              alt="Studio photos service"
              width="100%"
              style={{...imageSty, maxHeight: "320px", objectFit: "cover"}}
            />
          </ListItem>
        </Grid>
        <Grid item xs={12} sm={6}>
          <ListItem>
            <RenderListItemText
              primary="On location"
              secondary="Take creative photos on exotic location"
            />
          </ListItem>
          <ListItem>
            <img
              src={sunsetPic.src}
              alt="On location"
              width="100%"
              style={imageSty}
            />
          </ListItem>
        </Grid>
        <Grid item xs={12} sm={3}>
          <ListItem>
            <RenderListItemText
              primary="Print services"
              secondary="Pictures should not be buried in your phone gallery"
            />
          </ListItem>
          <ListItem>
            <img
              src={high.src}
              alt="On location"
              width="100%"
              style={{...imageSty, maxHeight: "320px", objectFit: "cover"}}
            />
          </ListItem>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Services;

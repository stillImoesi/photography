import { Box, Grid, ListItem, ListItemText, Typography } from "@mui/material";
import * as React from "react";
import studioPic from "../assets/studio/20240511-DSC06083.jpg";
import sunsetPic from "../assets/sunset.jpg";
import high from "../assets/resolutionGuide/high3*2.jpg";

const imageSty = {
  width: "100%",
  marginLeft: "auto",
};

const renderListItemTest = (primary: string, secondary: string) => (
  <ListItemText
    primary={primary}
    secondary={
      <Typography
        variant="subtitle2"
        style={{
          color: "#c7c7c7",
        }}
      >
        {secondary}
      </Typography>
    }
  />
);

const Services = () => {
  return (
    <Box sx={{ margin: "20px 0" }} id="services">
      <Typography variant="h4" component="h4">
        Services
      </Typography>
      <Grid container>
          <Grid item xs={12} sm={3}>
            <ListItem>
              {renderListItemTest(
                "Studio Photos",
                "Book a session and get the best studio photos"
              )}
            </ListItem>
            <ListItem>
              <img
                src={studioPic.src}
                alt="Studio photos service"
                width="100%"
                style={imageSty}
              />
            </ListItem>
          </Grid>
          <Grid item xs={12} sm={6}>
            <ListItem>
              {renderListItemTest(
                "On location",
                "Take creative photos on exotic location"
              )}
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
              {renderListItemTest(
                "Print services",
                "Pictures should not be buried in your phone gallery"
              )}
            </ListItem>
            <ListItem>
              <img
                src={high.src}
                alt="On location"
                width="100%"
                style={imageSty}
              />
            </ListItem>
          </Grid>
        </Grid>
    </Box>
  );
};

export default Services;

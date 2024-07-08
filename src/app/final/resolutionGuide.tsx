// src/components/Guide.js
import React from "react";
import {
  Box,
  Typography,
  Drawer,
  ListItem,
  ListItemText,
  Grid,
  Button,
} from "@mui/material";
import normal from "../../assets/resolutionGuide/normal.webp";
import high from "../../assets/resolutionGuide/high.webp";
import max from "../../assets/resolutionGuide/max.webp";
import DownloadIcon from "@mui/icons-material/DownloadOutlined";

interface GuideProps {
  open: boolean;
  onClose: () => void;
  image: {
    url: string;
    title: string;
  };
}

const imageSty = { filter: "grayscale(100)", width: "80%", marginLeft: "auto" };

const Guide = ({ open, onClose, image }: GuideProps) => {
  return (
    <Drawer
      anchor="bottom"
      open={open}
      onClose={onClose}
      sx={{ zIndex: 2003 }}
    >
      <Box
        sx={{
          width: "auto",
          padding: 2,
          textAlign: "center",
          margin: "auto",
          height: { xs: "70vh", sm: "60vh" }
        }}
      >
        <Typography variant="h6" gutterBottom>
          Choose preferred download resolution
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={4}>
            <ListItem>
              <ListItemText
                primary="Normal Resolution (2.9 MP)"
                secondary="Print Size at 300 PPI: 6.83 x 4.55 inches"
              />
              <a download={"test"} href={image?.url}>
                <Button
                  variant="contained"
                  aria-label="download normal resolution"
                  startIcon={<DownloadIcon />}
                  color="success"
                >
                  Normal
                </Button>
              </a>
            </ListItem>
            <ListItem>
              <img
                src={normal.src}
                alt="Normal Resolution"
                width="100%"
                style={imageSty}
              />
            </ListItem>
          </Grid>

          <Grid item xs={12} sm={4}>
            <ListItem>
              <ListItemText
                primary="High Resolution (33 MP)"
                secondary="Print Size at 300 PPI: 23.36 x 15.57 inches"
              />

              <Button
                variant="outlined"
                aria-label="download high resolution"
                color="secondary"
                startIcon={<DownloadIcon />}
                onClick={() =>
                  window.open(
                    `https://wa.me/+358444919193?text=I will like to have the high (33mp) resolution for this image ${image?.title}`,
                    "_blank"
                  )
                }
              >
                High {"€14.99"}
              </Button>
            </ListItem>
            <ListItem>
              <img
                src={high.src}
                alt="High Resolution"
                width="100%"
                style={imageSty}
              />
            </ListItem>
          </Grid>

          <Grid item xs={12} sm={4}>
            <ListItem>
              <ListItemText
                primary="Max Resolution (131 MP)"
                secondary="Print Size at 300 PPI: 46.72 x 31.15 inches"
              />

              <Button
                variant="outlined"
                color="warning"
                aria-label="download max resolution"
                startIcon={<DownloadIcon />}
                onClick={() =>
                  window.open(
                    `https://wa.me/+358444919193?text=I will like to have the max resolution (131mp) for this image ${image?.title}`,
                    "_blank"
                  )
                }
              >
                Max {"€19.99"}
              </Button>
            </ListItem>
            <ListItem>
              <img src={max.src} alt="Max Resolution" style={imageSty} />
            </ListItem>
          </Grid>
        </Grid>
      </Box>
    </Drawer>
  );
};

export default Guide;

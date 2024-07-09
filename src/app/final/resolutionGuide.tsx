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
import PrintIcon from "@mui/icons-material/Print";

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
    <Drawer anchor="bottom" open={open} onClose={onClose} sx={{ zIndex: 2003 }}>
      <Box
        sx={{
          width: "auto",
          padding: 2,
          textAlign: "center",
          margin: "auto",
          height: { xs: "70vh", sm: "60vh" },
        }}
      >
        <Box>
          <Typography variant="h6" gutterBottom>
            Choose preferred print sizes
          </Typography>
          <Typography variant="caption" gutterBottom>
            Prints let you see an enlarged perspective of your picture and
            appreciate the minor details and overall beauty of the image. They
            can also act as fine deco for your home.
          </Typography>
        </Box>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={4}>
            <ListItem>
              <ListItemText
                primary="15cm x 20cm"
                secondary="Perfect for your work table or shelf. Excellent deco items"
              />
              <Button
                variant="outlined"
                aria-label="Print normal photo"
                startIcon={<PrintIcon />}
                color="success"
              >
                Normal {"€24.99"}
              </Button>
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
                primary="50cm x 70cm"
                secondary="Comes in black, white or silver frame. Perfect for wall mounting"
              />

              <Button
                variant="outlined"
                aria-label="print large photo"
                color="secondary"
                startIcon={<PrintIcon />}
                onClick={() =>
                  window.open(
                    `https://wa.me/+358444919193?text=I will like to have the high (33mp) resolution for this image ${image?.title}`,
                    "_blank"
                  )
                }
              >
                Large {"€64.99"}
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
                primary="70cm x 100xm"
                secondary="For photos you are in love with. Center of attaction in your home"
              />
              <Button
                variant="outlined"
                color="warning"
                aria-label="print extra large photo"
                startIcon={<PrintIcon />}
                onClick={() =>
                  window.open(
                    `https://wa.me/+358444919193?text=I will like to have the max resolution (131mp) for this image ${image?.title}`,
                    "_blank"
                  )
                }
              >
                Massive {"€149.99"}
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

"use client"

import React from "react";
import {
  Typography,
  Container,
  Box,
  Button,
  Grid,
  Link,
} from "@mui/material";
import Services from "src/components/Services";
import Contact from "src/components/Contact";
import Gallery from "src/components/Gallery";
import BackgroundCarousel from "src/components/BackgroundCarousel";
import TopMenu from "src/components/TopMenu";

export function ClientOnly(props) {

  return (
    <>
      <TopMenu />
      <Box
        sx={{
          position: "relative",
          overflow: "hidden",
          height: { xs: "100vh", md: "93vh" },
        }}
      >
        <Box
          sx={{
            top: 0,
            left: 0,
            width: { xs: "100%", md: "50%" },
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
            position: "absolute",
          }}
        >
          <Grid
            container
            spacing={2}
            sx={{
              color: { xs: "white", md: "black" },
              zIndex: 1,
              background: { xs: "#0000003b", md: "white" },
              padding: { xs: "40px 0", md: "40px" },
              marginLeft: { xs: "0", md: "20px" },
              height: { xs: "50%", md: "initial" },
              transform: { xs: "translateY(50%)", md: "initial" },
            }}
          >
            <Grid item xs={12} md={12}>
              <Typography variant="h4" gutterBottom>
                Peter Imoesi
              </Typography>
              <Typography variant="h3" gutterBottom>
                PHOTOGRAPHY STUDIO
              </Typography>
              <Button
                variant="outlined"
                sx={{
                  marginTop: 2,
                  color: { xs: "white", md: "black" },
                  borderColor: { xs: "white", md: "black" },
                }}
              >
                <Link
                  href="#contact"
                  variant="inherit"
                  sx={{ color: "black", textDecoration: "none" }}
                >
                  Book Now
                </Link>
              </Button>
            </Grid>
          </Grid>
        </Box>
        <Box
          sx={{
            position: "relative",
            float: "right",
            width: "100%",
            background: "black",
          }}
        >
          <BackgroundCarousel />
        </Box>
      </Box>

      <Container>
        <Box marginTop={"20px"}>
          <Typography variant="h4" component="h2" gutterBottom>
            Gallery
          </Typography>
        </Box>
        <Gallery images={props.location} />
        {/* <Studio images={props.studio} /> */}
        <Services />
        <Contact />
      </Container>

      <Box
        sx={{
          backgroundColor: "black",
          color: "white",
          textAlign: "center",
          padding: 2,
          marginTop: 4,
        }}
      >
        <Typography variant="body2">
          &copy; 2035 by Peter Imoesi. Powered and secured by Vercel
        </Typography>
        <Box sx={{ display: "flex", justifyContent: "center", marginTop: 1 }}>
          <Button color="inherit">Facebook</Button>
          <Button color="inherit">Instagram</Button>
          <Button color="inherit">Twitter</Button>
        </Box>
      </Box>
    </>
  );
}

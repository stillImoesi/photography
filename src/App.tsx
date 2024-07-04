import React from "react";
import InspirationGenerator from "./components/Contact";
import LocationPhotos from "./components/Location";
import Studio from "./components/Studio";
import BackgroundCarousel from "./components/BackgroundCarousel";
import MenuIcon from "@mui/icons-material/Menu";
import Drawer from "@mui/material/Drawer";

import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Box,
  Button,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";

interface Images {
  url: string;
  title: string;
}

interface StaticImages {
  studio: Images[];
  location: Images[];
}

const NavLinks = [
  {
    title: "Services",
    url: "#Services",
  },
  {
    title: "About",
    url: "#About",
  },
  {
    title: "Prices",
    url: "#Prices",
  },
  {
    title: "Contact",
    url: "/Contact",
  },
];

const App: React.FC = (props: StaticImages) => {
  const [drawerOpen, setDrawerState] = React.useState<boolean>(false);
  return (
    <div className="App">
      <Drawer
        open={drawerOpen}
        onClose={() => setDrawerState(false)}
        anchor="right"
      >
        <Box
          sx={{
            width: 250,
            height: "100%",
            background: "black",
            color: "#fff",
          }}
          role="presentation"
          onClick={() => setDrawerState(false)}
        >
          <List>
            {NavLinks.map((lk) => (
              <ListItem key={lk.url} disablePadding>
                <ListItemButton>
                  <ListItemText primary={lk.title} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
      <AppBar position="static" sx={{ backgroundColor: "black" }}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            PETER IMOESI
          </Typography>
          {NavLinks.map((lk) => (
            <Button
              key={lk.url}
              color="inherit"
              sx={{ display: { xs: "none", md: "block" } }}
            >
              {lk.title}
            </Button>
          ))}
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ display: { md: "none" } }}
            onClick={() => setDrawerState(true)}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

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
                Book Now
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
            Services
          </Typography>
        </Box>
        <LocationPhotos images={props.location} />
        <Studio images={props.studio} />
        <InspirationGenerator />
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
          &copy; 2035 by Peter Imoesi. Powered and secured by Wix
        </Typography>
        <Box sx={{ display: "flex", justifyContent: "center", marginTop: 1 }}>
          <Button color="inherit">Facebook</Button>
          <Button color="inherit">Instagram</Button>
          <Button color="inherit">Twitter</Button>
        </Box>
      </Box>
    </div>
  );
};

export default App;

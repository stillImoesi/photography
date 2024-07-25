import React from 'react';
import MenuIcon from "@mui/icons-material/Menu";
import Drawer from "@mui/material/Drawer";
import {
  AppBar,
  Toolbar,
  Box,
  Button,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Link,
  Typography,
} from "@mui/material";

const NavLinks = [
    // {
    //   title: "About",
    //   url: "#About",
    // },
    {
      title: "Services",
      url: "#services",
    },
    {
      title: "Contact",
      url: "#contact",
    },
    {
      title: "Login",
      url: "/login?redirect=/selection",
    },
  ];

export default function TopMenu() {
      const [drawerOpen, setDrawerState] = React.useState<boolean>(false);
    return (
        <>
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
                  <Link href={lk.url} variant="body2">
                    <ListItemText primary={lk.title} />
                  </Link>
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
              <Link href={lk.url} variant="inherit" sx={{ color: "#fff" }}>
                <ListItemText primary={lk.title} />
              </Link>
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
      </>
    )
}
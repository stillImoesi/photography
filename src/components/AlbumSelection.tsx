"use client"

import {
  SwipeableDrawer,
  Box,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import AlbumIcon from "@mui/icons-material/Album";
import * as React from "react";
import { Album } from "src/utils/type";
import { redirect } from "next/navigation";

const RenderAlbumSlider = ({ albums, target }: { albums: Album[], target: string }) => {
  const [isDrawerOpen, setDrawerOpen] = React.useState(false);
  return (
    <SwipeableDrawer
      anchor="left"
      open={isDrawerOpen}
      onClose={() => setDrawerOpen(false)}
      onOpen={() => setDrawerOpen(true)}
    >
      <Box
        sx={{ width: 250 }}
        role="presentation"
        onClick={() => setDrawerOpen(false)}
        onKeyDown={() => setDrawerOpen(false)}
      >
        <Typography variant="h6" sx={{ padding: 2 }}>
          Select an Album
        </Typography>
        <List>
          {albums?.map((album) => (
            <ListItem
              button
              key={album.title}
              onClick={() => redirect(`/${target}?album=${album.title}`)}
            >
              <AlbumIcon sx={{ marginRight: 2 }} />
              <ListItemText primary={album.title} />
            </ListItem>
          ))}
        </List>
      </Box>
    </SwipeableDrawer>
  );
};

export default RenderAlbumSlider

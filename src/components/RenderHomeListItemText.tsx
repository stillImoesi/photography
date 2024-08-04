import React from "react";
import { ListItemText, Typography } from "@mui/material";

interface Props {
  primary: string;
  secondary?: string;
}

const RenderListItemText = ({ primary, secondary }: Props) => (
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

export default RenderListItemText;

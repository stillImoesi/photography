"use client";

import { Box, Button } from "@mui/material";
import * as React from "react";

const Logout = React.memo(({ redirectUrl }: {
    redirectUrl: string;
}) => (
    <Box sx={{
        height: "100vh",
        width: "100vw",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    }}>
      <Button
        variant="contained"
        color="warning"
        onClick={() => {
          window.open(redirectUrl, "_self")
        }
    }
      >Logout</Button>
    </Box>
))

Logout.displayName = "Logout";

export default Logout;
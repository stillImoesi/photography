import { Typography } from "@mui/material";
import Link from "next/link";
import * as React from "react";

import whatsApp from "../assets/WhatsAppButtonGreenSmall.png";

interface WhatsAppErrorProps {
  error: string;
  message: string;
}

export const WhatsAppErrorMessage = React.memo(function WhatsAppErrorMessage({
  error,
  message,
}: WhatsAppErrorProps) {
  return (
    <div style={{ paddingTop: "30vh", textAlign: "center" }}>
      <Typography variant="h5" align="center" sx={{ marginBottom: "20px" }}>
        {error}
      </Typography>
      <Link
        type="button"
        href={`https://wa.me/+358444919193?text=${message}`}
        target="_blank"
      >
        <img
          src={whatsApp.src}
          alt="sent message via whatsapp"
          style={{ maxWidth: "250px" }}
        />
      </Link>
    </div>
  );
});

export default WhatsAppErrorMessage;

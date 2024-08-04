import React, { useState } from "react";
import { Box, Typography, Link } from "@mui/material";
import whatsApp from '../assets/WhatsAppButtonGreenSmall.png'
import Input from '@mui/joy/Input';
import Instragram from "../assets/instagram.jpg";

const InspirationGenerator: React.FC = () => {
  const [input, setInput] = useState<string>("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <Box
      id="contact"
      component="section"
      sx={{
        backgroundColor: "black",
        padding: 4,
        borderRadius: 2,
        boxShadow: 3,
        textAlign: "center",
        margin: "40px 0 0 0",
      }}
    >
      <Typography variant="h4" component="h2" gutterBottom>
        Contact me
      </Typography>
      <form onSubmit={handleSubmit}>
        <Input
          variant="soft"
          color="success"
          fullWidth
          value={input}
          onChange={handleInputChange}
          sx={{ marginBottom: 2 }}
        />
        <Link type="button" href={`https://wa.me/+358444919193?text=${input}`} target="_blank">
          <img src={whatsApp.src} alt="sent message via whatsapp" style={{ maxWidth: '250px' }}/>
        </Link>
      </form>
      <Box
        sx={{
          backgroundColor: "black",
          color: "white",
          textAlign: "center",
          padding: 2
        }}
      >
        <Box sx={{ display: "flex", justifyContent: "center", marginTop: 1 }}>
          <Link href="https://www.instagram.com/stillpeterstudio?igsh=aTR4MXgwOTh5Nnhx&utm_source=qr">
            <img
              src={Instragram.src}
              style={{ width: "200px", height: "200px", borderRadius: "12.5%" }}
            />
          </Link>
        </Box>
      </Box>
    </Box>
  );
};

export default InspirationGenerator;

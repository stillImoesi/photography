import React, { useState } from "react";
import { Box, Typography, Link } from "@mui/material";
import whatsApp from '../assets/WhatsAppButtonGreenSmall.png'
import Input from '@mui/joy/Input';

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
      component="section"
      sx={{
        backgroundColor: "black",
        padding: 4,
        borderRadius: 2,
        boxShadow: 3,
        textAlign: "center",
        margin: "40px 0",
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
    </Box>
  );
};

export default InspirationGenerator;

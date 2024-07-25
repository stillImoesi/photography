"use client";

import {
  Box,
  Button,
  Checkbox,
  Container,
  FormControlLabel,
  Grid,
  TextField,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import * as React from "react";
import "./styles.css";
import dayjs from "dayjs";

const CreateUserForm = () => {
  const keys = [
    { key: "title", type: "text" },
    { key: "email", type: "email" },
    { key: "createdAt", type: "date" },
    { key: "maxAllowedPictures", type: "number" },
  ];

  const [formData, setFormData] = React.useState({
    title: "",
    email: "",
    createdAt: "",
    maxAllowedPictures: "",
    changePassword: false,
    files: [],
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFormData((prev) => ({ ...prev, files: Array.from(e.target.files) }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formDataToSend = new FormData();

    formDataToSend.append("title", formData.title);
    formDataToSend.append("email", formData.email);
    formDataToSend.append("createdAt", formData.createdAt);
    formDataToSend.append("maxAllowedPictures", formData.maxAllowedPictures);
    formDataToSend.append("changePassword", `${formData.changePassword}`);

    formData.files.forEach((file) => {
      formDataToSend.append("files", file);
    });

    const response = await fetch("/create-user/api", {
      method: "POST",
      body: formDataToSend,
    });

    const { message } = await response.json();
    if (message === "Success") {
        alert("Success");
    } else {
      alert("Failed to create user");
    }
  };

  return (
    <Container
      sx={{
        backgroundColor: "black",
        padding: "2rem",
        borderRadius: "8px",
        boxShadow: 3,
        color: "white",
      }}
    >
      <h2>Upload Album for {formData.email}</h2>
      <Box
        component="form"
        sx={{
          "& .MuiTextField-root": { m: 1, width: "100%" },
          "& .MuiButton-root": { m: 1, width: "100%" },
        }}
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit}
        encType="multipart/form-data"
      >
        {keys.map(({ key, type }) => (
          <React.Fragment key={key}>
            {key === "createdAt" ? (
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  value={dayjs(formData[key]) || new Date()}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      createdAt: e?.toISOString() || new Date().toISOString(),
                    })
                  }
                  sx={{
                    "& .MuiOutlinedInput-input": {
                      color: "white",
                    },
                    "& .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#9c27b0",
                    },
                    svg: {
                      color: "#9c27b0",
                    },
                  }}
                />
              </LocalizationProvider>
            ) : (
              <TextField
                label={key.charAt(0).toUpperCase() + key.slice(1)}
                type={type}
                id={key}
                name={key}
                value={formData[key as keyof typeof formData]}
                onChange={handleChange}
                color="secondary"
                variant="outlined"
                InputLabelProps={{ style: { color: "white" } }}
                InputProps={{
                  style: { color: "white", borderColor: "white" },
                }}
                focused
              />
            )}
          </React.Fragment>
        ))}
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <FormControlLabel
              label="Change password"
              control={
                <Checkbox
                  name="Change password"
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      changePassword: e.target.checked,
                    }))
                  }
                  aria-label="generate new password"
                  sx={{ color: "white" }}
                />
              }
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Button
              variant="contained"
              component="label"
              size="large"
              color="secondary"
              fullWidth
            >
              File upload
              <input
                type="file"
                name={"file"}
                multiple
                hidden
                onChange={handleFileChange}
              />
            </Button>
          </Grid>
        </Grid>
        <Button
          type="submit"
          variant="contained"
          size="large"
          color="secondary"
          fullWidth
        >
          Submit
        </Button>
      </Box>
    </Container>
  );
};

export default CreateUserForm;

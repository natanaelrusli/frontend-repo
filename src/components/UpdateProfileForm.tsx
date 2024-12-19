"use client";

import React, { useEffect, useState } from "react";
import ReduxProvider from "@/store/reduxProvider";
import { Grid2, TextField, Typography, Button } from "@mui/material";
import { getUserData } from "@/apis/userApi";
import { redirect } from "next/navigation";
import { User } from "@/apis/user";

const UpdateProfileForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchUserData();
  }, [])

  async function fetchUserData() {
    const cookies = document.cookie.split(";").reduce((acc: Record<string, string>, cookie) => {
      const [key, value] = cookie.trim().split("=");
      acc[key] = value;
      return acc;
    }, {});
    
    const token = cookies.token;

    try {
      if (!token) {
        redirect('/login');
      }

      const resp = await getUserData(token);
      const data = resp.data as User;
      
      setName(data.name);
      setEmail(data.email);
    } catch (error) {
      console.error(error);
      redirect('/login');
    }
  }

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!name || !email) {
      setErrorMessage("Name and email are required.");
      return;
    }

    try {
      setLoading(true);
      setErrorMessage("");
      setSuccessMessage("");

      const token = localStorage.getItem("token"); // Get token from localStorage
      if (!token) {
        setErrorMessage("Token is missing. Please login again.");
        return;
      }

      const response = await fetch("http://localhost:8080/update-user-data", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ name, email }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccessMessage("Profile updated successfully!");
      } else {
        setErrorMessage(data.message || "Something went wrong. Please try again.");
      }
    } catch {
      setErrorMessage("An error occurred while updating your profile.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ReduxProvider>
      <div style={{ padding: "20px", width: "600px" }}>
        <Typography
          variant="h3"
          sx={{ fontSize: "2rem", fontWeight: "bold", marginBottom: "1.2rem" }}
          gutterBottom
        >
          Update Profile
        </Typography>

        {/* Display any error messages */}
        {errorMessage && (
          <Typography color="error" variant="body2" gutterBottom>
            {errorMessage}
          </Typography>
        )}

        {/* Display success message after successful update */}
        {successMessage && (
          <Typography color="success" variant="body2" gutterBottom>
            {successMessage}
          </Typography>
        )}

        <form onSubmit={handleSubmit}>
          <Grid2 container direction="column" spacing={2}>
            {/* Name Field */}
            <Grid2>
              <TextField
                size="small"
                label="Name"
                variant="outlined"
                fullWidth
                value={name}
                onChange={handleNameChange}
              />
            </Grid2>

            {/* Email Field */}
            <Grid2>
              <TextField
                size="small"
                label="Email"
                variant="outlined"
                fullWidth
                value={email}
                onChange={handleEmailChange}
              />
            </Grid2>

            {/* Submit Button */}
            <Grid2>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                disabled={loading}
              >
                {loading ? "Updating..." : "Update Profile"}
              </Button>
            </Grid2>
          </Grid2>
        </form>
      </div>
    </ReduxProvider>
  );
};

export default UpdateProfileForm;

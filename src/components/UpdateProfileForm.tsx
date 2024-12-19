"use client";

import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import { Alert, CircularProgress, Grid2, TextField, Typography } from "@mui/material";

import { useGetUser, useUpdateProfile } from "@/apis/userApi";
import UpdateButton from "@/components/UpdateButton";
import { setAuthState } from "@/store/actions";
import withReduxProvider from "@/hoc/withReduxProvider"; // Import the HOC
import { useAppSelector } from "@/store";

const UpdateProfileForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const dispatch = useDispatch();
  const progressState = useAppSelector((state) => state.progress.progressState);
  const { data: userData, isLoading } = useGetUser(Cookies.get("token"));
  const { mutate: updateProfile } = useUpdateProfile();

  useEffect(() => {
    if (userData) {
      setName(userData.name);
      setEmail(userData.email);
    }
  }, [userData]);

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
      dispatch(setAuthState("error"));
      return;
    }

    try {
      dispatch(setAuthState("loading"));
      updateProfile({
        name, email
      }, {
        onSuccess: () => {
          dispatch(setAuthState('success'));
        },
        onError: () => {
          dispatch(setAuthState('error'));
          setErrorMessage("Failed to update profile")
        }
      })
    } catch {
      setErrorMessage("An error occurred while updating your profile.");
      dispatch(setAuthState("error"));
    }
  };

  if (isLoading) return <CircularProgress />;

  return (
    <div style={{ padding: "20px", width: "600px" }}>
      <Typography
        variant="h3"
        sx={{ fontSize: "2rem", fontWeight: "bold", marginBottom: "1.2rem" }}
        gutterBottom
      >
        Update Profile
      </Typography>

      {progressState === 'error' && (
        <Alert sx={{ marginBottom: '12px' }} variant="filled" severity="error">
          <Typography variant="body2">
            {errorMessage}
          </Typography>
        </Alert>
      )}

      {progressState === 'success' && (
        <Alert sx={{ marginBottom: '12px' }} variant="filled" severity="success">
          <Typography variant="body2">
            Profile updated successfully!
          </Typography>
        </Alert>
      )}

      <form onSubmit={handleSubmit}>
        <Grid2 container direction="column" spacing={2}>
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

          <Grid2>
            <UpdateButton onClick={handleSubmit} />
          </Grid2>
        </Grid2>
      </form>
    </div>
  );
};

export default withReduxProvider(UpdateProfileForm);

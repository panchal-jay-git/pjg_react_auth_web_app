
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../features/auth/authSlice";
import {
  Container,
  Grid,
  Box,
  Typography,
  TextField,
  Button,
  Alert,
  CircularProgress,
} from "@mui/material";
// import LoginImage from "../assets/login-image.svg"; // Add an attractive image here

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth);

  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(login({ email, password }));
  };

  return (
    <Container maxWidth="lg" sx={{ minHeight: "100vh", display: "flex", alignItems: "center" }}>
      <Grid container spacing={4} alignItems="center">
        {/* Left Section: Image */}
        <Grid item xs={12} md={6}>
          <Box display="flex" justifyContent="center">
            <img
            //   src={LoginImage}
              alt="Login Illustration"
              style={{ maxWidth: "100%", height: "auto" }}
            />
          </Box>
        </Grid>

        {/* Right Section: Login Form */}
        <Grid item xs={12} md={6}>
          <Box
            sx={{
              boxShadow: 4,
              borderRadius: 3,
              p: 4,
              backgroundColor: "#fff",
            }}
          >
            <Typography
              variant="h4"
              component="h1"
              sx={{ fontWeight: "bold", color: "#1976d2", mb: 2 }}
              align="center"
            >
              Welcome Back!
            </Typography>
            <Typography variant="body1" align="center" color="text.secondary" mb={3}>
              Login to access your sales and marketing dashboard
            </Typography>
            <form onSubmit={handleLogin}>
              <TextField
                label="Email Address"
                type="email"
                variant="outlined"
                fullWidth
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                sx={{ mb: 2 }}
                required
              />
              <TextField
                label="Password"
                type="password"
                variant="outlined"
                fullWidth
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                sx={{ mb: 2 }}
                required
              />
              {error && (
                <Alert severity="error" sx={{ mb: 2 }}>
                  {error.message}
                </Alert>
              )}
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                sx={{
                  textTransform: "none",
                  fontWeight: "bold",
                  height: "48px",
                  mb: 2,
                }}
                disabled={loading}
              >
                {loading ? <CircularProgress size={24} color="inherit" /> : "Login"}
              </Button>
            </form>
            <Typography
              variant="body2"
              color="text.secondary"
              align="center"
              mt={2}
            >
              <Button href="/forgot-password" size="small" sx={{ textTransform: "none" }}>
              Forgot your password?{" "}
              </Button>
              <Button href="/reset-password" size="small" sx={{ textTransform: "none" }}>
                Reset it here
              </Button>
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Login;

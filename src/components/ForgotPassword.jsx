import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { forgotPassword } from "../features/auth/authSlice";
import {
  Container,
  Grid,
  Box,
  Typography,
  TextField,
  Button,
  Alert,
  CircularProgress,
  Snackbar,
} from "@mui/material";
// import ForgotPasswordImage from "../assets/forgot-password-image.svg"; // Add an illustration

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [timer, setTimer] = useState(60);  // Timer for 1 minute
  const [isEmailSent, setIsEmailSent] = useState(false);  // Flag to track email sent status
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);  // Disable the button during the waiting period
  const dispatch = useDispatch();
  const { loading, error, successMessage } = useSelector((state) => state.auth);

  // Timer countdown effect
  useEffect(() => {
    let interval;
    if (timer > 0 && isEmailSent) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else if (timer === 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [timer, isEmailSent]);

  const handleForgotPassword = (e) => {
    e.preventDefault();
    dispatch(forgotPassword(email)); // Dispatch the forgotPassword action
    setIsEmailSent(true);
    setIsButtonDisabled(true); // Disable the button
    setTimer(60); // Reset the timer to 60 seconds
  };

  return (
    <Container maxWidth="lg" sx={{ minHeight: "100vh", display: "flex", alignItems: "center" }}>
      <Grid container spacing={4} alignItems="center">
        {/* Left Section: Image */}
        <Grid item xs={12} md={6}>
          <Box display="flex" justifyContent="center">
            {/* <img
              src={ForgotPasswordImage}
              alt="Forgot Password Illustration"
              style={{ maxWidth: "100%", height: "auto" }}
            /> */}
          </Box>
        </Grid>

        {/* Right Section: Forgot Password Form */}
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
              Forgot Your Password?
            </Typography>
            <Typography variant="body1" align="center" color="text.secondary" mb={3}>
              Enter your email address and we'll send you instructions to reset your password.
            </Typography>
            <form onSubmit={handleForgotPassword}>
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
              {error && (
                <Alert severity="error" sx={{ mb: 2 }}>
                  {error}
                </Alert>
              )}
              {successMessage && !isEmailSent && (
                <Alert severity="success" sx={{ mb: 2 }}>
                  {successMessage}
                </Alert>
              )}
              {isEmailSent && timer > 0 ? (
                <Snackbar
                  open={true}
                  autoHideDuration={6000}
                  message={`We've sent the link to your email. Please wait ${timer}s.`}
                  anchorOrigin={{ vertical: "top", horizontal: "center" }}
                  sx={{
                    backgroundColor: "green",
                    color: "#fff",
                    fontWeight: "bold",
                  }}
                />
              ) : null}

              {timer === 0 && isEmailSent ? (
                <Typography variant="body2" color="text.secondary" align="center" mt={2}>
                  Still haven't received any email? Please check your spam or{" "}
                  <Button
                    onClick={handleForgotPassword}
                    size="small"
                    sx={{ textTransform: "none", color: "#1976d2" }}
                  >
                    Send email again
                  </Button>
                </Typography>
              ) : null}

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
                disabled={isButtonDisabled}
              >
                {loading ? <CircularProgress size={24} color="inherit" /> : "Send Email"}
              </Button>
            </form>
            <Typography
              variant="body2"
              color="text.secondary"
              align="center"
              mt={2}
            >
              Remembered your password?{" "}
              <Button href="/login" size="small" sx={{ textTransform: "none" }}>
                Login here
              </Button>
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ForgotPassword;

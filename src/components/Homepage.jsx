import React, { useState } from "react";
import { AppBar, Box, Toolbar, Typography, Menu, MenuItem, Button, IconButton, Container, Grid } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Line } from "react-chartjs-2";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, BarElement } from "chart.js";

// Registering chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, BarElement);

const HomePage = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [subMenuAnchorEl, setSubMenuAnchorEl] = useState(null);
  const [openSubMenu, setOpenSubMenu] = useState(false);

  const open = Boolean(anchorEl);
  const openSubMenuFlag = Boolean(subMenuAnchorEl);

  // Chart Data
  const lineChartData = {
    labels: ["January", "February", "March", "April", "May", "June", "July"],
    datasets: [
      {
        label: "Sales Over Time",
        data: [65, 59, 80, 81, 56, 55, 40],
        borderColor: "#1976d2",
        backgroundColor: "rgba(25, 118, 210, 0.2)",
        fill: true,
        tension: 0.4,
      },
    ],
  };

  const barChartData = {
    labels: ["January", "February", "March", "April", "May"],
    datasets: [
      {
        label: "Revenue by Month",
        data: [5000, 7000, 8000, 9000, 10000],
        backgroundColor: "#4caf50",
      },
    ],
  };

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleSubMenuClick = (event) => {
    setSubMenuAnchorEl(event.currentTarget);
    setOpenSubMenu(!openSubMenu);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleSubMenuClose = () => {
    setSubMenuAnchorEl(null);
    setOpenSubMenu(false);
  };

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleProfileMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      {/* Centered Header/Navbar */}
      <AppBar
        position="fixed"
        sx={{
          zIndex: 1300,
          backgroundColor: "#1976d2",
          height: "70px",
          borderRadius: "0 0 10px 10px", // Rounded corners
          width: "75%",
          padding: "0 20px",
        }}
      >
        <Toolbar sx={{ display: "flex", justifyContent: "center", height: "100%" }}>
          {/* Centered Navbar Content */}
          <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%", maxWidth: "1100px" }}>
            <Typography variant="h6" sx={{ flexGrow: 1, fontSize: "22px", fontWeight: "bold", color: "#fff" }}>
              Home Page
            </Typography>

            {/* Main Menu */}
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Button color="inherit" onClick={handleSubMenuClick} sx={{ fontSize: "16px", padding: "8px 16px" }}>
                Dashboard
              </Button>
              <Menu
                anchorEl={subMenuAnchorEl}
                open={openSubMenuFlag}
                onClose={handleSubMenuClose}
                MenuListProps={{
                  "aria-labelledby": "basic-button",
                }}
              >
                <MenuItem>Overview</MenuItem>
                <MenuItem>Analytics</MenuItem>
                <MenuItem>Reports</MenuItem>
              </Menu>

              <Button color="inherit" sx={{ fontSize: "16px", padding: "8px 16px" }}>
                Settings
              </Button>
            </Box>

            {/* Profile Icon with Dropdown */}
            <IconButton color="inherit" sx={{ fontSize: "30px" }} onClick={handleProfileMenuOpen}>
              <AccountCircleIcon />
            </IconButton>
            <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleProfileMenuClose}>
              <MenuItem onClick={handleProfileMenuClose}>My Profile</MenuItem>
              <MenuItem onClick={handleProfileMenuClose}>Logout</MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>

      <Box sx={{ flexGrow: 1, bgcolor: "background.default", paddingTop: "80px" }}>
        {/* Main Content */}
        <Container sx={{ mt: 8 }}>
          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              {/* Line Chart */}
              <Box sx={{ bgcolor: "#fff", p: 3, borderRadius: 2, boxShadow: 3 }}>
                <Typography variant="h6" gutterBottom>
                  Sales Over Time
                </Typography>
                <Line data={lineChartData} />
              </Box>
            </Grid>

            <Grid item xs={12} md={6}>
              {/* Bar Chart */}
              <Box sx={{ bgcolor: "#fff", p: 3, borderRadius: 2, boxShadow: 3 }}>
                <Typography variant="h6" gutterBottom>
                  Revenue by Month
                </Typography>
                <Bar data={barChartData} />
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
};

export default HomePage;
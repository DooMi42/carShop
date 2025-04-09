/**
 * Main Application Component
 * 
 * Provides the application layout with a header bar containing the logo
 * and title, and renders the CarList component that contains the main
 * functionality of the application.
 */
import React from "react";
import { AppBar, Toolbar, Typography, Box } from "@mui/material";
import CarList from "./components/CarList";
import carShopLogo from "../public/carshopimage.png";

function App() {
  return (
    <>
      {/* Application header with logo and title */}
      <AppBar position="static">
        <Toolbar>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <img
              src={carShopLogo}
              alt="Car Shop Logo"
              style={{
                height: '50px',
                marginRight: '10px'
              }}
            />
            <Typography variant="h6">
              Car Shop
            </Typography>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Main content area - Car listing and management */}
      <CarList />
    </>
  );
}

export default App;
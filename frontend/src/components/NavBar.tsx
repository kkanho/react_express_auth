import React, { useContext } from "react";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

const NavBar: React.FC = () => {
  const auth = useContext(AuthContext)!;
  const navigate = useNavigate();

  const handleProfile = () => {
    if (auth.userId) {
      navigate(`/profile/${auth.userId}`);
    }
  };

  const handleLogout = () => {
    auth.setToken(null);
    auth.setUserId(null);
    navigate("/login");
  };

  return (
    <AppBar position="static" sx={{ bgcolor: "primary.main" }}>
      <Toolbar>
        <Typography
          variant="h6"
          component="div"
          sx={{ flexGrow: 1, cursor: "pointer" }}
          onClick={handleProfile}
        >
          REA
        </Typography>

        <Box sx={{ display: "flex", gap: 2 }}>
          <Button color="inherit" onClick={handleProfile}>
            Your Profile
          </Button>
          <Button color="inherit" variant="outlined" onClick={handleLogout}>
            Logout
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;

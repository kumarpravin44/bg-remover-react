import React from "react";
import { AppBar, Toolbar, Typography, IconButton } from "@mui/material";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";


export default function TopBar({ mode, setMode }) {
    const toggleMode = () => setMode(mode === "light" ? "dark" : "light");


    return (
        <AppBar position="static" elevation={0}>
            <Toolbar>
                <Typography variant="h6" sx={{ flexGrow: 1 }}>
                    Background Remover
                </Typography>
                <IconButton color="inherit" onClick={toggleMode} aria-label="toggle theme">
                    {mode === "light" ? <DarkModeIcon /> : <LightModeIcon />}
                </IconButton>
            </Toolbar>
        </AppBar>
    );
}
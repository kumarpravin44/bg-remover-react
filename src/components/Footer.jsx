import React from "react";
import { Box, Typography, Link } from "@mui/material";

export default function Footer() {
    return (
        <Box sx={{ py: 3, textAlign: "center", color: "text.secondary" }}>
            <Typography variant="body2">
                © {new Date().getFullYear()} Background Remover · Built with React & MUI
            </Typography>
        </Box>
    );
}
import React from "react";
import { Card, CardContent, Typography, Stack, Button, Box } from "@mui/material";

function Checkerboard({ children }) {
    return (
        <Box
            sx={{
                position: "relative",
                borderRadius: 1,
                overflow: "hidden",
                // Subtle checkerboard to show transparency
                backgroundImage:
                    "linear-gradient(45deg, #eee 25%, transparent 25%), linear-gradient(-45deg, #eee 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #eee 75%), linear-gradient(-45deg, transparent 75%, #eee 75%)",
                backgroundSize: "20px 20px",
                backgroundPosition: "0 0, 0 10px, 10px -10px, -10px 0px",
            }}
        >
            {children}
        </Box>
    );
}

export default function ResultCard({ title, imageUrl, actions }) {
    return (
        <Card sx={{ boxShadow: 4 }}>
            <CardContent>
                <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
                    <Typography variant="h6">{title}</Typography>
                    {actions}
                </Stack>

                <Checkerboard>
                    {imageUrl ? (
                        <Box
                            component="img"
                            src={imageUrl}
                            alt={title}
                            sx={{ width: "100%", display: "block" }}
                        />
                    ) : (
                        <Box sx={{ p: 4, textAlign: "center" }}>
                            <Typography variant="body2" color="text.secondary">
                                No image
                            </Typography>
                        </Box>
                    )}
                </Checkerboard>
            </CardContent>
        </Card>
    );
}
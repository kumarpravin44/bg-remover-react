import React from "react";
import { useDropzone } from "react-dropzone";
import { Box, Typography } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";


export default function UploadZone({ onFileSelected }) {
    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        accept: { "image/*": [] },
        maxFiles: 1,
        onDrop: (files) => {
            if (files && files[0]) onFileSelected(files[0]);
        },
    });



    return (

        <Box
            {...getRootProps()}
            sx={{
                border: "2px dashed",
                borderColor: isDragActive ? "primary.main" : "divider",
                p: 6,
                borderRadius: 3,
                textAlign: "center",
                bgcolor: isDragActive ? "action.hover" : "background.paper",
                cursor: "pointer",
                transition: "0.2s",
                "&:hover": { bgcolor: "action.hover" },
            }}
        >
            <input {...getInputProps()} />
            <CloudUploadIcon sx={{ fontSize: 48, color: "primary.main", mb: 2 }} />
            <Typography variant="h6">
                {isDragActive ? "Drop your image here…" : "Drag & drop or click to upload"}
            </Typography>
            <Typography variant="body2" color="text.secondary">
                Supported formats: JPG, PNG
            </Typography>
        </Box>

    );
}
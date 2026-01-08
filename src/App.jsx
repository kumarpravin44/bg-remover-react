import React, { useEffect, useState } from "react";
import {
  Container,
  Grid,
  Stack,
  Button,
  Alert,
  LinearProgress,
  Skeleton,
} from "@mui/material";
import TopBar from "./components/TopBar";
import UploadZone from "./components/UploadZone";
import ResultCard from "./components/ResultCard";
import Footer from "./components/Footer";

export default function App({ mode, setMode }) {
  const [file, setFile] = useState(null);
  const [originalUrl, setOriginalUrl] = useState(null);
  const [resultUrl, setResultUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Clean up object URLs when they change or on unmount
  useEffect(() => {
    return () => {
      if (originalUrl) URL.revokeObjectURL(originalUrl);
      if (resultUrl) URL.revokeObjectURL(resultUrl);
    };
  }, [originalUrl, resultUrl]);

  const onFileSelected = (f) => {
    // Revoke previous URLs
    if (originalUrl) URL.revokeObjectURL(originalUrl);
    if (resultUrl) URL.revokeObjectURL(resultUrl);

    setFile(f);
    setOriginalUrl(URL.createObjectURL(f));
    setResultUrl(null);
    setError("");
  };

  const removeBg = async () => {
    if (!file) {
      setError("Please select an image first.");
      return;
    }
    setLoading(true);
    setError("");

    const formData = new FormData();
    formData.append("image_file", file);
    formData.append("size", "auto");

    try {
      const res = await fetch("https://api.remove.bg/v1.0/removebg", {
        method: "POST",
        headers: {
          "X-Api-Key": import.meta.env.VITE_REMOVE_BG_KEY,
        },
        body: formData,
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || "Background removal failed.");
      }

      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      setResultUrl(url);
    } catch (e) {
      setError(e.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const downloadBtn =
    resultUrl && (
      <Button variant="outlined" color="success" href={resultUrl} download="output.png">
        Download PNG
      </Button>
    );

  return (
    <>
      <TopBar mode={mode} setMode={setMode} />
      {loading && <LinearProgress color="primary" />}
      {error && <Alert severity="error">{error}</Alert>}





      <Container maxWidth="md" sx={{ py: 4 }}>





        <Stack spacing={3}>
          {error && <Alert severity="error">{error}</Alert>}
          {loading && !resultUrl && (
            <Skeleton variant="rectangular" height={300} sx={{ borderRadius: 2 }} />
          )}

          <UploadZone onFileSelected={onFileSelected} />

          <Stack direction="row" spacing={2} justifyContent="center">
            <Button
              variant="contained"
              color="primary"
              onClick={removeBg}
              disabled={loading || !file}
            >
              {loading ? "Processing…" : "Remove Background"}
            </Button>
            {resultUrl && (
              <Button
                variant="outlined"
                color="success"
                href={resultUrl}
                download="output.png"
              >
                Download PNG
              </Button>
            )}
          </Stack>

          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <ResultCard title="Original" imageUrl={originalUrl} />
            </Grid>
            <Grid item xs={12} md={6}>
              {loading && !resultUrl ? (
                <Skeleton variant="rectangular" height={300} sx={{ borderRadius: 2 }} />
              ) : (
                <ResultCard title="Result" imageUrl={resultUrl} actions={downloadBtn} />
              )}
            </Grid>
          </Grid>
        </Stack>
      </Container>

      <Footer />
    </>
  );
}
'use client';
import React, { useState } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Button,
  Box,
} from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import ReportTable from './ReportTable';
import CircularProgress from '@mui/material/CircularProgress';
import ReportChart from './ReportCharts';

const previousReports = [
  {
    Name: "Akshay Jadhav",
    Date: "2024-10-01",
    data: {
      "Hemoglobin (Hb)": { value: "12.5 g/dL", range: "13.0 - 17.0 g/dL" },
      "LDL": { value: "120 mg/dL", range: "< 130 mg/dL" },
      "HDL": { value: "42 mg/dL", range: "> 40 mg/dL" },
    },
  },
  {
    Name: "Akshay Jadhav",
    Date: "2024-08-01",
    data: {
      "Hemoglobin (Hb)": { value: "11.8 g/dL", range: "13.0 - 17.0 g/dL" },
      "LDL": { value: "130 mg/dL", range: "< 130 mg/dL" },
      "HDL": { value: "38 mg/dL", range: "> 40 mg/dL" },
    },
  },
];



export default function UploadBox() {
  const [file, setFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [parsedData, setParsedData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const allReports = parsedData ? [...previousReports, parsedData] : previousReports;
  const uploadToAPI = async () => {
    setLoading(true);
    if (!file) return;
    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch('http://127.0.0.1:8000/upload', {
        method: 'POST',
        body: formData,
      });

      if (!res.ok) throw new Error('Failed to upload file');

      const data = await res.json();
      const parsed = {
        Name: data.Name,
        Date: data.Date,
        data: data.values,
      };
      setParsedData(parsed);
      console.log('API Response:', data);
    } catch (err) {
      console.error('Upload error:', err);
    }
    setLoading(false);
  };

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (selected) {
      setFile(selected);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFile = e.dataTransfer.files?.[0];
    if (droppedFile) {
      setFile(droppedFile);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  return (

    <Box sx={{ maxWidth: 700, mx: 'auto', mt: 6 }}>
      <Card
        variant="outlined"
        sx={{
          borderRadius: 4,
          background: 'linear-gradient(135deg, #ffffff 0%, #f1f5f9 100%)',
          boxShadow: isDragging
            ? '0 0 0 3px #1976d2 inset'
            : '0 4px 20px rgba(0, 0, 0, 0.05)',
          border: isDragging ? '2px dashed #1976d2' : '2px dashed #ccc',
          transition: '0.3s ease',
        }}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        onDragEnter={() => setIsDragging(true)}
        onDragLeave={() => setIsDragging(false)}
      >
        <CardContent
          sx={{
            textAlign: 'center',
            p: 4,
            minHeight: 250,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            gap: 2,
          }}
        >
          <Typography variant="h5" fontWeight={600}>
            Upload Your File
          </Typography>

          <Typography variant="body2" color="text.secondary">
            Drag & drop a file here, or click to select
          </Typography>

          <input
            hidden
            type="file"
            accept=".pdf,.png,.jpg,.jpeg"
            id="upload-input"
            onChange={handleUpload}
          />
          <label htmlFor="upload-input">
            <Button
              variant="contained"
              component="span"
              startIcon={<CloudUploadIcon />}
              sx={{
                borderRadius: 8,
                textTransform: 'none',
                fontWeight: 500,
                px: 3,
                py: 1.5,
              }}
            >
              Choose File
            </Button>
          </label>

          {file && (
            <>
              <Typography variant="body2" color="text.secondary">
                📎 {file.name}
              </Typography>

              {loading ? (
                <CircularProgress sx={{ mt: 2 }} />
              ) : (
                <Button
                  variant="outlined"
                  onClick={uploadToAPI}
                  startIcon={<UploadFileIcon />}
                  sx={{ mt: 2 }}
                >
                  Get Data
                </Button>
              )}
            </>
          )}
        </CardContent>
      </Card>
      {parsedData && (
        <>
          <ReportTable report={parsedData} />

          <ReportChart reports={allReports} parameter="Hemoglobin (Hb)" />
          <ReportChart reports={allReports} parameter="LDL" />
          <ReportChart reports={allReports} parameter="HDL" />
        </>
      )}

    </Box>

  );
}

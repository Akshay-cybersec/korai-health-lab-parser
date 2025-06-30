'use client';
import React, { useState } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Button,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

export default function UploadBox() {
  const [file, setFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [textData, setTextData] = useState<string[]>([]); 

  const simulateExtractedText = () => {
    return [
      'Name: Akshay Jadhav',
      'Age: 21',
      'Hemoglobin: 13.5 g/dL',
      'Cholesterol: 180 mg/dL',
    ];
  };

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (selected) {
      setFile(selected);

      const extracted = simulateExtractedText();
      setTextData(extracted);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFile = e.dataTransfer.files?.[0];
    if (droppedFile) {
      setFile(droppedFile);
      const extracted = simulateExtractedText();
      setTextData(extracted);
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
          }}
        >
          <Typography variant="h5" fontWeight={600} gutterBottom>
            Upload Your File
          </Typography>

          <Typography variant="body2" color="text.secondary" mb={2}>
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
            <Typography mt={3} variant="body2" color="text.secondary">
              📎 {file.name}
            </Typography>
          )}
        </CardContent>
      </Card>

      {textData.length > 0 && (
        <TableContainer component={Paper} sx={{ mt: 4 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: 600 }}>Line No.</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Extracted Text</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {textData.map((line, idx) => (
                <TableRow key={idx}>
                  <TableCell>{idx + 1}</TableCell>
                  <TableCell>{line}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
}

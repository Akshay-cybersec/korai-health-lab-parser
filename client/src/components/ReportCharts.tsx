'use client';
import React from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import { Box, Typography } from '@mui/material';

type Report = {
  Date: string;
  data: {
    [key: string]: {
      value: string;
      range: string;
    };
  };
};

function ReportChart(props: { reports: Report[]; parameter: string }) {
  const { reports, parameter } = props;

  const chartData = reports.map((report) => {
    const rawValue = report.data?.[parameter]?.value || '';
    const numericValue = parseFloat(rawValue.replace(/[^\d.]/g, ''));
    return {
      date: report.Date,
      value: isNaN(numericValue) ? null : numericValue,
    };
  }).filter((item) => item.value !== null);

  if (chartData.length === 0) return null;

  return (
    <Box mt={4}>
      <Typography variant="h6" gutterBottom>
        {parameter} Trend
      </Typography>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="value"
            stroke="#1976d2"
            strokeWidth={2}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </Box>
  );
}

export default ReportChart;

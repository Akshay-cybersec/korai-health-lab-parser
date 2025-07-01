'use client';
import React from 'react';
import {
    Typography,
    Box,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
} from '@mui/material';

function isAbnormal(valueStr: any, rangeStr: any) {
    const value = parseFloat(valueStr.replace(/[^\d.]/g, ''));

    if (rangeStr.includes('-')) {
        const [min, max] = rangeStr
            .split('-')
            .map((s: any) => parseFloat(s.replace(/[^\d.]/g, '')));
        return value < min || value > max;
    }

    if (rangeStr.includes('<')) {
        const limit = parseFloat(rangeStr.replace(/[^\d.]/g, ''));
        return value >= limit;
    }

    if (rangeStr.includes('>')) {
        const limit = parseFloat(rangeStr.replace(/[^\d.]/g, ''));
        return value <= limit;
    }

    return false;
}


function ReportTable(props: any) {
    const report = props.report;

    if (!report || !report.data) return null;

    const entries = Object.entries(report.data);

    return (
        <Box sx={{ mt: 6 }}>
            <Typography variant="h6" fontWeight={600} gutterBottom>
                Extracted Report
            </Typography>

            <Typography variant="body2" mb={1}><strong>Name:</strong> {report.Name}</Typography>
            <Typography variant="body2" mb={2}><strong>Date:</strong> {report.Date}</Typography>

            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{ fontWeight: 600 }}>Parameter</TableCell>
                            <TableCell sx={{ fontWeight: 600 }}>Value</TableCell>
                            <TableCell sx={{ fontWeight: 600 }}>Normal Range</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {entries.map(function ([key, val], index) {
                            const metric = val as { value: string; range: string };
                            const isAbnormalVal = isAbnormal(metric.value, metric.range);

                            return (
                                <TableRow key={index}>
                                    <TableCell>{key}</TableCell>
                                    <TableCell sx={{ color: isAbnormalVal ? 'red' : 'inherit' }}>
                                        {metric.value}
                                    </TableCell>
                                    <TableCell>{metric.range}</TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
            
        </Box>
    );
}

export default ReportTable;

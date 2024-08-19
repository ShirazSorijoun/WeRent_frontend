/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import './documents.css';
import {
  Container,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Typography,
} from '@mui/material';

// Define the data type for each document
interface Document {
  authority: 'שוכר' | 'משכיר';
  address: string;
}

// Sample data
const documents: Document[] = [
  { authority: 'שוכר', address: 'רחוב הדוגמה 1, תל אביב' },
  { authority: 'משכיר', address: 'רחוב ההדגמה 2, ירושלים' },
  { authority: 'שוכר', address: 'רחוב הניסיון 3, חיפה' },
];

export const DocumentsPage: React.FC = () => {
  return (
    <Container maxWidth="xl" class="documents-container">
      <Stack direction="row" spacing={3} justifyContent="space-between">
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="documents table" id="documents-table">
            <TableHead>
              <TableRow>
                <TableCell align="right"><Typography variant="h6">סמכות</Typography></TableCell>
                <TableCell align="right"><Typography variant="h6">כתובת הנכס</Typography></TableCell>
                <TableCell align="right"><Typography variant="h6">פעולה</Typography></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {documents.map((doc, index) => (
                <TableRow key={index}>
                  <TableCell align="right">{doc.authority}</TableCell>
                  <TableCell align="right">{doc.address}</TableCell>
                  <TableCell align="right">
                    <Button variant="contained" color="primary">
                      לצפייה בחוזה
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Stack>
    </Container>
  );
};

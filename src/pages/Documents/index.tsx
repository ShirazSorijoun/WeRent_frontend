/* eslint-disable @typescript-eslint/no-explicit-any */
import React, {
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
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
  Typography,
} from '@mui/material';
import { ILeaseAgreement } from '@/models/leaseAgreement';
import { api } from '@/api';
import { DocumentsListItem } from './components';

export const DocumentsPage: React.FC = () => {
  const [leasesData, setLeasesData] = useState<ILeaseAgreement[]>();

  const fetchLeaseData = useCallback(async (): Promise<void> => {
    try {
      const res = await api.leaseAgreement.getLeaseAgreementList();
      setLeasesData(res);
    } catch (error) {
      console.error('Error fetching tenant data for lease form', error);
    }
  }, []);

  useEffect(() => {
    fetchLeaseData();
  }, [fetchLeaseData]);

  const leasesDisplay: ReactNode = useMemo(
    () =>
      leasesData?.map((lease) => (
        <DocumentsListItem lease={lease} refreshList={fetchLeaseData} />
      )) ?? <></>,
    [fetchLeaseData, leasesData],
  );

  return (
    <Container maxWidth="xl" sx={{ padding: '25px' }}>
      <Stack direction="row" spacing={3} justifyContent="space-between">
        <TableContainer component={Paper}>
          <Table
            sx={{ minWidth: 650, direction: 'rtl' }}
            aria-label="documents table"
            id="documents-table"
          >
            <TableHead>
              <TableRow>
                <TableCell align="right">
                  <Typography variant="h6">סמכות</Typography>
                </TableCell>
                <TableCell align="right">
                  <Typography variant="h6">כתובת הנכס</Typography>
                </TableCell>
                <TableCell align="right">
                  <Typography variant="h6">פעולה</Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>{leasesDisplay}</TableBody>
          </Table>
        </TableContainer>
      </Stack>
    </Container>
  );
};

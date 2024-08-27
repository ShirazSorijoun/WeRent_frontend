import { api } from '@/api';
import React, { useCallback, useEffect, useState } from 'react';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import {
  IconButton,
  Card,
  CardHeader,
  Collapse,
  CardContent,
  Badge,
  Stack,
} from '@mui/material';
import { IMatch } from '@/models/match.model';
import { ApartmentMatchItem } from '@@/apartmentMatchItem';
interface IApartmentDataProps {
  apartmentId: string;
}
export const ApartmentMatches: React.FC<IApartmentDataProps> = ({
  apartmentId,
}) => {
  const [matchingList, setMatchingList] = useState<IMatch[]>([]);
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const fetchMatchingList = useCallback(async () => {
    const matchingListFromBE =
      await api.match.getMatchingListByApartment(apartmentId);
    setMatchingList(matchingListFromBE);
  }, [apartmentId]);

  useEffect(() => {
    fetchMatchingList();
  }, [fetchMatchingList]);

  return (
    <>
      <Card sx={{ direction: 'rtl', margin: 2 }} raised>
        <CardHeader
          action={
            <IconButton onClick={handleExpandClick}>
              {expanded ? <ExpandLess /> : <ExpandMore />}
            </IconButton>
          }
          title={
            <Badge
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              slotProps={{
                badge: {
                  style: { left: '-10px' },
                },
              }}
              badgeContent={matchingList.length}
              color="primary"
            >
              לקוחות שהתעניינו בדירה
            </Badge>
          }
        />
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <Stack spacing={3}>
              {matchingList.map((match) => (
                <ApartmentMatchItem
                  key={match._id}
                  match={match}
                  fetchMatchingList={fetchMatchingList}
                />
              ))}
            </Stack>
          </CardContent>
        </Collapse>
      </Card>
    </>
  );
};

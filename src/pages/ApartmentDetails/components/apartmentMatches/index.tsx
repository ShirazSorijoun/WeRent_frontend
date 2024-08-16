import { api } from '@/api';
import { IMatch } from '@/types/types';
import React, { useEffect, useState } from 'react';
import { Button } from '@mui/material';

interface IApartmentDataProps {
  apartmentId: string;
}
export const ApartmentMatches: React.FC<IApartmentDataProps> = ({
  apartmentId,
}) => {
  const [matchingList, setMatchingList] = useState<IMatch[]>([]);

  const fetchMatchingList = async () => {
    const matchingListFromBE = await api.apartment.getMatchingList(apartmentId);
    setMatchingList(matchingListFromBE);
  };

  const acceptMatch = async (matchId: string) => {
    await api.apartment.acceptMatch(matchId);
    fetchMatchingList();
  };

  useEffect(() => {
    fetchMatchingList();
  }, []);

  return (
    <>
      <h3> Interested Clients</h3>
      {matchingList.map((matching) => (
        <div
          key={matching._id}
          data-auto="leads-form"
          className="css-rlze51 e1g5ext0"
        >
          <div className="css-1p5re2e e1g5ext2">
            <div className="css-17hovo1 e1siqbpd0">
              <div
                data-auto="poc-image-container"
                className="css-1jql4ni e1siqbpd1"
              >
                <div data-auto="poc-agent-logo">
                  <svg
                    width="48"
                    height="48"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g fill="#018489" fillRule="evenodd">
                      <circle opacity=".07" cx="24" cy="24" r="24"></circle>
                      <path
                        d="M20.026 23.63c1 .846 2.4 1.37 3.949 1.37s2.949-.524 3.948-1.368a6.454 6.454 0 015.052 5.118l.321 1.689A3 3 0 0130.35 34H17.6a3 3 0 01-2.947-3.561l.322-1.689a6.46 6.46 0 015.051-5.12zm-.23 1.086l-.223.07a5.461 5.461 0 00-3.616 4.151l-.322 1.689A2 2 0 0017.6 33h12.75a2 2 0 001.964-2.374l-.322-1.689a5.456 5.456 0 00-3.838-4.22c-1.16.823-2.63 1.283-4.18 1.283-1.446 0-2.823-.4-3.942-1.124l-.236-.16zM23.975 13a4.5 4.5 0 014.5 4.5V19a4.5 4.5 0 11-9 0v-1.5a4.5 4.5 0 014.5-4.5zm0 1a3.5 3.5 0 00-3.5 3.5V19a3.5 3.5 0 007 0v-1.5a3.5 3.5 0 00-3.5-3.5z"
                        fillRule="nonzero"
                      ></path>
                    </g>
                  </svg>
                </div>
              </div>
              <div className="css-1cmihl8 e1siqbpd2">
                <div
                  data-auto="poc-name"
                  className="css-ixpw6d e1siqbpd3"
                  style={{ marginLeft: '10px' }}
                >
                  {`${matching.user.firstName} ${matching.user.lastName}`}
                </div>
              </div>
            </div>
            <div className="css-17hovo1 e1siqbpd0">
              <div className="css-1cmihl8 e1siqbpd2">
                <div
                  data-auto="poc-name"
                  className="css-ixpw6d e1siqbpd3"
                  style={{ marginLeft: '10px' }}
                >
                  {!matching.accepted ? (
                    <Button onClick={() => acceptMatch(matching._id!)}>
                      Continue With Client
                    </Button>
                  ) : (
                    'Accepted'
                  )}
                </div>
              </div>
            </div>
            <a data-auto="phone-number-button" className="css-qa186o e1g5ext4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path d="M0 3v18h24v-18h-24zm6.623 7.929l-4.623 5.712v-9.458l4.623 3.746zm-4.141-5.929h19.035l-9.517 7.713-9.518-7.713zm5.694 7.188l3.824 3.099 3.83-3.104 5.612 6.817h-18.779l5.513-6.812zm9.208-1.264l4.616-3.741v9.348l-4.616-5.607z" />
              </svg>
              {' ' + matching.user.phoneNumber}
            </a>
          </div>
        </div>
      ))}
    </>
  );
};

import React from 'react';
import { Card } from 'react-bootstrap';

interface IProps {
  children: React.ReactNode;
  title: string;
  isLoading?: boolean;
}

export const BasicUserApartmentsContainer: React.FC<IProps> = ({
  children,
  title,
  isLoading,
}) => {
  return (
    <Card
      style={{
        width: '700px',
        display: 'flex',
        margin: 'auto',
      }}
    >
      <Card.Header
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <h5 style={{ fontWeight: 'bold' }}>{title}</h5>
      </Card.Header>

      <Card.Body
        style={{ overflowX: 'auto', display: 'flex', direction: 'rtl' }}
      >
        <div
          className="card-body"
          style={{
            overflow: 'auto',
            display: 'flex',
            marginRight: '10px',
          }}
        >
          {!isLoading ? children : <h3>טוען...</h3>}
        </div>
      </Card.Body>
    </Card>
  );
};

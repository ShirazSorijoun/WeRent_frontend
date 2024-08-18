import React from 'react';
import { Card } from 'react-bootstrap';
import { useGetImageUrlFromName } from '@/hooks';
import { UserEditButton } from '../editUser';
import { useAppSelector } from '@/hooks/store';
import { selectUser } from '@/stores/user';

export const UserDetails: React.FC = () => {
  const userData = useAppSelector(selectUser);

  const profileImage = useGetImageUrlFromName(userData?.profile_image);

  return (
    <Card
      style={{
        width: '500px',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        margin: 'auto',
        marginTop: '30px',
        marginBottom: '20px',
      }}
    >
      <Card.Header
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-start',
        }}
      >
        <UserEditButton userData={userData} />
        <h5 style={{ fontWeight: 'bold', marginLeft: '90px' }}>
          Account details
        </h5>
      </Card.Header>

      <Card.Body style={{ overflow: 'auto' }}>
        <div
          className="row g-3"
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '50px',
          }}
        >
          <img
            src={profileImage}
            alt="Profile"
            style={{
              maxWidth: '300px',
              maxHeight: '300px',
              alignItems: 'center',
            }}
          />
        </div>
        <div className="col-lg-6">
          <label className="form-label" htmlFor="AccountInput_Name">
            First Name
          </label>
          <input
            className="form-control"
            id="AccountInput_Name"
            value={userData.firstName}
            readOnly
          ></input>
        </div>
        <div className="col-lg-6">
          <label className="form-label" htmlFor="AccountInput_Name">
            Last Name
          </label>
          <input
            className="form-control"
            id="AccountInput_Name"
            value={userData.lastName}
            readOnly
          ></input>
        </div>
        <div className="col-lg-6">
          <label className="form-label" htmlFor="AccountInput_Email">
            Email
          </label>
          <input
            className="form-control"
            id="AccountInput_Email"
            value={userData.email}
            readOnly
          ></input>
        </div>
      </Card.Body>
    </Card>
  );
};

/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import './userProfile.css';
import { TenantFormDialog } from '@/components/TenantForm';
import { LeaseAgreementFormDialog } from '@@/CreateLeaseAgreement';
import {
  UserApartmentsContainer,
  UserChangePassword,
  UserDetails,
} from './components';

const UserProfile: React.FC = () => {
  const [tenantDialogOpen, setTenantDialogOpen] = useState(false);
  const openTenantDialog = () => {
    setTenantDialogOpen(true);
  };

  const closeTenantDialog = () => {
    setTenantDialogOpen(false);
  };

  const [leaseDialogOpen, setLeaseDialogOpen] = useState(false);
  const openLeaseDialog = () => {
    setLeaseDialogOpen(true);
  };

  const closeLeaseDialog = () => {
    setLeaseDialogOpen(false);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <div
        style={{
          position: 'relative',
          marginLeft: '10px',
          marginBottom: '20px',
          alignSelf: 'flex-end',
        }}
      >
        <Button
          style={{
            backgroundColor: '#6C757D',
            borderColor: '#6C757D',
            padding: '5px 30px',
            fontSize: '18px',
          }}
          onClick={() => (window.location.href = '/addreview')}
        >
          Add Review
        </Button>
      </div>
      <div>
        {/* Button to trigger the TenantForm dialog */}
        <Button onClick={openTenantDialog}>Open Tenant Form</Button>
        <TenantFormDialog
          isOpen={tenantDialogOpen}
          handleCancel={closeTenantDialog}
          completeSave={() => {
            closeTenantDialog();
          }}
        />
      </div>
      <div>
        {/* Button to trigger the LeaseAgreementForm dialog */}
        <Button onClick={openLeaseDialog}>Open Lease Agreement Form</Button>
        <LeaseAgreementFormDialog
          isOpen={leaseDialogOpen}
          handleCancel={closeLeaseDialog}
          completeSave={() => {
            closeLeaseDialog();
          }}
        />
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <UserDetails />

        <div style={{ marginTop: '30px', marginBottom: '20px' }}>
          <UserChangePassword />

          <UserApartmentsContainer />
        </div>
      </div>
    </div>
  );
};

export default UserProfile;

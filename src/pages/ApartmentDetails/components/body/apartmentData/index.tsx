import { api } from '@/api';
import { ApartmentProps } from '@/types/types';
import React, { useCallback, useEffect, useState } from 'react';

interface IApartmentDataProps {
  apartment: ApartmentProps;
}
export const ApartmentData: React.FC<IApartmentDataProps> = ({ apartment }) => {
  const [ownerName, setOwnerName] = useState<string>('');

  const fetchOwnerData = useCallback(async (ownerId?: string) => {
    if (ownerId) {
      try {
        const ownerData = await api.user.getUserById(ownerId);
        setOwnerName(ownerData.name);
      } catch (error) {
        console.error('Error fetching user data', error);
      }
    }
  }, []);

  useEffect(() => {
    if (apartment?.owner) fetchOwnerData(apartment.owner);
  }, [apartment.owner, fetchOwnerData]);

  return (
    <>
      <div className="css-19n8dai e142rc1o9">
        <div className="css-1p8obn8 e142rc1o14">
          <section className="css-1vx031w e10pmpfq0">
            <div className="css-lpl311 e10pmpfq1">
              <div
                data-auto="primary_address"
                className="css-1rijosd e10pmpfq3"
              >
                <h1
                  data-auto="primary_address_text"
                  className="css-fgboif e10pmpfq4"
                >
                  {apartment.city}
                </h1>
              </div>
              <div
                data-auto="secondary_address"
                className="css-k008qs e10pmpfq5"
              >
                <div
                  data-auto="secondary_address_text"
                  className="css-1ig8ip8 e10pmpfq6"
                >
                  {apartment.address}
                </div>
              </div>
            </div>
            <div className="css-cihju5 e10pmpfq8">
              <div data-auto="price" className="css-4boxdp e10pmpfq16">
                <div data-auto="current-price" className="css-nfbknm e10pmpfq9">
                  <div className="css-1x3r91k e10pmpfq10">
                    {' '}
                    {apartment.price} ₪
                  </div>
                </div>
              </div>
            </div>
          </section>
          <div data-auto="offer-details" className="css-1v7m7jq e10pmpfq14">
            <div data-auto="business-class" className="css-ojkpqy e10pmpfq15">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 16 16"
                className="icon-svg"
              >
                <path
                  d="M9 1c1.105 0 2 .895 2 2v2h2c1.105 0 2 .895 2 2v8H1V3c0-1.105.895-2 2-2h6zm0 1H3c-.552 0-1 .448-1 1v11h2v-2c0-.552.448-1 1-1h2c.552 0 1 .448 1 1v2h2V3c0-.552-.448-1-1-1zm4 4h-2v8h3V7c0-.552-.448-1-1-1zm-6 6H5v2h2v-2zM5 7v2H4V7h1zm3 0v2H7V7h1zM5 4v2H4V4h1zm3 0v2H7V4h1z"
                  fill="#303030"
                  fillRule="evenodd"
                ></path>
              </svg>
              <div className="css-ixartp e3vrfmg5"> {apartment.type}</div>
            </div>
            <div data-auto="beds-count" className="css-ojkpqy e10pmpfq15">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 16 16"
                className="icon-svg"
              >
                <path
                  fill="#303030"
                  fillRule="evenodd"
                  d="M2 6V3a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v3l1 4v4.5a.5.5 0 1 1-1 0V13H2v1.5a.5.5 0 1 1-1 0V10l1-4zm0 5v1h12v-1H2zm10-5h1V3a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v3h1V5a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v1zm1.18 1H2.82L2 10h12l-.82-3zM5 5v1h6V5H5z"
                ></path>
              </svg>
              <div className="css-ixartp e3vrfmg5">{apartment.rooms} rooms</div>
            </div>
            <div data-auto="floor" className="css-ojkpqy e10pmpfq15">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 16 16"
                className="icon-svg"
              >
                <path
                  fill="#303030"
                  fillRule="evenodd"
                  d="M7.696 13.504L11.2 10H9.5a.5.5 0 0 1 0-1H13v3.5a.5.5 0 1 1-1 0v-1.886l-3.597 3.597a.5.5 0 0 1-.707-.707zM5 10V7a1 1 0 0 1 1-1h3V3a1 1 0 0 1 1-1h4.5a.5.5 0 1 1 0 1H10v4H6v4H2v3.5a.5.5 0 1 1-1 0V11a1 1 0 0 1 1-1h3z"
                ></path>
              </svg>
              <div className="css-ixartp e3vrfmg5">
                <div>
                  floor {apartment.floor} from {apartment.numberOfFloors} floors
                </div>
              </div>
            </div>
            <div data-auto="area" className="css-ojkpqy e10pmpfq15">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 16 16"
                className="icon-svg"
              >
                <path
                  fill="#303030"
                  fillRule="evenodd"
                  d="M3 12.3l4.296-4.296L3 3.707V5.5a.5.5 0 0 1-1 0V2h3.5a.5.5 0 0 1 0 1H3.707l4.297 4.296L12.3 3h-1.8a.5.5 0 1 1 0-1H14v3.5a.5.5 0 1 1-1 0V3.714l-4.29 4.29L13 12.293V10.5a.5.5 0 1 1 1 0V14h-3.5a.5.5 0 1 1 0-1h1.793l-4.29-4.29L3.715 13H5.5a.5.5 0 1 1 0 1H2v-3.5a.5.5 0 1 1 1 0v1.8z"
                ></path>
              </svg>
              <div className="css-ixartp e3vrfmg5">
                {apartment.sizeInSqMeters} Sq
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="css-14k6wqd ebqee3y0">
        <h3 className="css-rxq69m ebqee3y1">Description</h3>
        <div className="css-v1qjdi ebqee3y2">{apartment.description}</div>
      </div>
      <div className="css-1p8obn8 e142rc1o14">
        <div className="css-1xpewq4 ep8uhrb0">
          <div data-auto="amenities-block">
            <h3 className="css-mq615 e125ttrt1">What is in the apartment?</h3>
            <div className="css-1cl74ws e125ttrt0">
              <div className="css-1a3g4s e125ttrt2">
                <div className="css-1wpv10e e125ttrt3">
                  <div
                    className={
                      apartment.features.elevators
                        ? 'css-1p1vgp0 elkstcv0'
                        : 'css-tc23vv elkstcv0'
                    }
                  >
                    <div className="css-1acq1dr elkstcv1">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        className="icon-svg"
                      >
                        <path
                          fill="#303030"
                          fillRule="evenodd"
                          d="M3 5a1 1 0 0 0-1 1v14a1 1 0 0 0 1 1h13a1 1 0 0 0 1-1V6a1 1 0 0 0-1-1H3zm0-1h13a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2zm6 1v16h1V5H9zM7 2h5v1H7V2zm14.012 14.621l-2.005-2.615h4.01l-2.005 2.615zm-.006-7.204l2.005 2.591H19l2.006-2.59z"
                        ></path>
                      </svg>
                    </div>
                    <div className="css-stb5t9 elkstcv2">
                      {' '}
                      {apartment.features.elevators
                        ? 'There is an elevator'
                        : 'No elevator'}
                    </div>
                  </div>
                </div>
                <div className="css-1wpv10e e125ttrt3">
                  <div
                    className={
                      apartment.features.airConditioning
                        ? 'css-1p1vgp0 elkstcv0'
                        : 'css-tc23vv elkstcv0'
                    }
                  >
                    <div className="css-1acq1dr elkstcv1">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        className="icon-svg"
                      >
                        <path
                          fill="#303030"
                          fillRule="evenodd"
                          d="M12 12.866v5.423l3.397 1.961a.5.5 0 0 1-.5.866L12 19.443V22.5a.5.5 0 1 1-1 0v-3.097l-2.967 1.713a.5.5 0 1 1-.5-.866l3.464-2a.508.508 0 0 1 .003-.002v-5.382l-5 2.887V19.5a.5.5 0 1 1-1 0v-3.17l-2.343 1.353a.5.5 0 1 1-.5-.866l2.3-1.328-2.724-1.573a.5.5 0 0 1 .5-.866l3.224 1.861L10.5 12 5.601 9.172l-3.368 1.944a.5.5 0 1 1-.5-.866l2.868-1.656-2.444-1.411a.5.5 0 1 1 .5-.866L5 7.67V4.5a.5.5 0 0 1 1 0v3.747l5 2.887V5.118a.508.508 0 0 1-.003-.002l-3.464-2a.5.5 0 1 1 .5-.866L11 3.963V1.5a.5.5 0 1 1 1 0v2.423l2.897-1.673a.5.5 0 0 1 .5.866L12 5.077v6.057l5-2.887V4.5a.5.5 0 1 1 1 0v3.17l2.343-1.353a.5.5 0 1 1 .5.866l-2.379 1.374 2.933 1.693a.5.5 0 0 1-.5.866l-3.433-1.982L12.5 12l5.108 2.949 3.29-1.899a.5.5 0 0 1 .5.866l-2.79 1.61 2.235 1.291a.5.5 0 1 1-.5.866L18 16.33v3.17a.5.5 0 1 1-1 0v-3.747l-5-2.887z"
                        ></path>
                      </svg>
                    </div>
                    <div className="css-stb5t9 elkstcv2">
                      {apartment.features.airConditioning
                        ? 'There is air conditioning'
                        : 'No air conditioning'}
                    </div>
                  </div>
                </div>
                <div className="css-1wpv10e e125ttrt3">
                  <div
                    className={
                      apartment.features.parking
                        ? 'css-1p1vgp0 elkstcv0'
                        : 'css-tc23vv elkstcv0'
                    }
                  >
                    <div className="css-1acq1dr elkstcv1">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        className="icon-svg"
                      >
                        <path
                          fill="#303030"
                          fillRule="evenodd"
                          d="M6 3a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3h12a3 3 0 0 0 3-3V6a3 3 0 0 0-3-3H6zm0-1h12a4 4 0 0 1 4 4v12a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V6a4 4 0 0 1 4-4zm3 5v10h1v-4h3a3 3 0 0 0 0-6H9zm1 1h3a2 2 0 1 1 0 4h-3V8z"
                        ></path>
                      </svg>
                    </div>
                    <div className="css-stb5t9 elkstcv2">
                      {apartment.features.parking
                        ? 'There is parking'
                        : 'No parking'}
                    </div>
                  </div>
                </div>
                <div className="css-1wpv10e e125ttrt3">
                  <div
                    className={
                      apartment.features.terrace
                        ? 'css-1p1vgp0 elkstcv0'
                        : 'css-tc23vv elkstcv0'
                    }
                  >
                    <div className="css-1acq1dr elkstcv1">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        className="icon-svg"
                      >
                        <path
                          fill="#303030"
                          fillRule="evenodd"
                          d="M7 13v2h14.5a.5.5 0 1 1 0 1H20v4h.5a.5.5 0 1 1 0 1h-17a.5.5 0 1 1 0-1H4v-4H2.5a.5.5 0 1 1 0-1H6v-2.064c-1.27-.182-2-.767-2-1.936 0-1.452.55-2.822 2-5 .44-.137 1.057.003 1 0 1.45 2.178 2 3.548 2 5 0 1.448-1.12 2-2 2zm9-8.97C14.432 4.22 13 5.3 13 7v3h7V7c0-1.701-1.432-2.78-3-2.97V10h-1V4.03zM16 16h-2v4h2v-4zm1 0v4h2v-4h-2zM5 16v4h2v-4H5zm3 0v4h2v-4H8zm3 0v4h2v-4h-2zm5.5-13C19 3 21 4.567 21 7v4h-9V7c0-2.433 2-4 4.5-4zM7 12c.587 0 1-.337 1-1 0-.822-.5-2.156-1.5-4-1 1.844-1.5 3.178-1.5 4 0 .663.413 1 2 1z"
                        ></path>
                      </svg>
                    </div>
                    <div className="css-stb5t9 elkstcv2">
                      {apartment.features.terrace
                        ? 'There is a terrace'
                        : 'No terrace'}
                    </div>
                  </div>
                </div>
                <div className="css-1wpv10e e125ttrt3">
                  <div
                    className={
                      apartment.features.garden
                        ? 'css-1p1vgp0 elkstcv0'
                        : 'css-tc23vv elkstcv0'
                    }
                  >
                    <div className="css-1acq1dr elkstcv1">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        className="icon-svg"
                      >
                        <path
                          fill="#303030"
                          fillRule="evenodd"
                          d="M6 12a2 2 0 0 1-2-2 2 2 0 1 1 4 0 2 2 0 0 1-4 0zm2-8a1 1 0 1 1 2 0 1 1 0 0 1-2 0zm4 8a2 2 0 0 1-4 0 2 2 0 1 1 4 0zm2-8a1 1 0 1 1 2 0 1 1 0 0 1-2 0zm4 8a2 2 0 0 1-4 0 2 2 0 1 1 4 0zm2-8a1 1 0 1 1 2 0 1 1 0 0 1-2 0z"
                        ></path>
                      </svg>
                    </div>
                    <div className="css-stb5t9 elkstcv2">
                      {apartment.features.garden
                        ? 'There is a garden'
                        : 'No garden'}
                    </div>
                  </div>
                </div>
                <div className="css-1wpv10e e125ttrt3">
                  <div
                    className={
                      apartment.features.dimension
                        ? 'css-1p1vgp0 elkstcv0'
                        : 'css-tc23vv elkstcv0'
                    }
                  >
                    <div className="css-1acq1dr elkstcv1">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        className="icon-svg"
                      >
                        <path
                          fill="#303030"
                          d="M7.5 13.437V2.299c-1.721.73-2.985 1.192-3.859 1.398-.418 2.69-.383 4.688.074 5.967.108.302.381.71.8 1.178.388.437.884.907 1.461 1.397A27.78 27.78 0 0 0 7.5 13.437zm1-.019a27.71 27.71 0 0 0 1.499-1.18 14.84 14.84 0 0 0 1.462-1.396c.417-.468.69-.876.799-1.178.215-.601.32-1.501.319-2.602a24.463 24.463 0 0 0-.182-2.791 29.787 29.787 0 0 0-.074-.578c-.866-.206-2.118-.665-3.823-1.385v11.11zM2.773 2.82c.695 0 2.434-.606 5.214-1.82 2.79 1.214 4.528 1.82 5.215 1.82 0 0 .848 4.803 0 7.18-.738 2.065-5.215 5-5.215 5s-4.476-2.935-5.214-5c-.566-1.585-.566-3.978 0-7.18z"
                        ></path>
                      </svg>
                    </div>
                    <div className="css-stb5t9 elkstcv2">
                      {apartment.features.dimension
                        ? 'There is a dimension'
                        : 'No dimension'}
                    </div>
                  </div>
                </div>
                <div className="css-1wpv10e e125ttrt3">
                  <div
                    className={
                      apartment.features.storage
                        ? 'css-1p1vgp0 elkstcv0'
                        : 'css-tc23vv elkstcv0'
                    }
                  >
                    <div className="css-1acq1dr elkstcv1">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        className="icon-svg"
                      >
                        <path
                          fill="#303030"
                          fillRule="evenodd"
                          d="M12 8v6h2V7.46L8 2.317 2 7.46V14h2V8h8zm-7 4h6v-1H5v1zm0 1v1h6v-1H5zm0-3h6V9H5v1zM1.35 6.7L8 1l6.65 5.7a1 1 0 0 1 .35.76V14a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V7.46a1 1 0 0 1 .35-.76z"
                        ></path>
                      </svg>
                    </div>
                    <div className="css-stb5t9 elkstcv2">
                      {apartment.features.storage
                        ? 'There is a storage'
                        : 'No storage'}
                    </div>
                  </div>
                </div>
                <div className="css-1wpv10e e125ttrt3">
                  <div
                    className={
                      apartment.features.accessForDisabled
                        ? 'css-1p1vgp0 elkstcv0'
                        : 'css-tc23vv elkstcv0'
                    }
                  >
                    <div className="css-1acq1dr elkstcv1">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        className="icon-svg"
                      >
                        <path
                          fill="#303030"
                          fillRule="evenodd"
                          d="M4 18l2-4h5.153a1 1 0 0 0 .986-.836L12.5 11h-6a.5.5 0 1 1 0-1h6.167L13 8a.592.592 0 0 1 .852.608l-.62 4.656A2 2 0 0 1 11.248 15H6.56l-2.14 4H2v-1h2zm3.465-.496a.374.374 0 0 1 .35-.504c.312 0 .593.184.717.47.03.066.056.124.08.172a6 6 0 1 0 7.345-8.316 5.607 5.607 0 0 0-.474-.134.633.633 0 0 1-.483-.615.417.417 0 0 1 .503-.408c.212.045.382.086.511.125a7 7 0 1 1-8.55 9.21zM12 3a1 1 0 0 0-1 1v1a1 1 0 0 0 2 0V4a1 1 0 0 0-1-1zm0-1a2 2 0 0 1 2 2v1a2 2 0 1 1-4 0V4a2 2 0 0 1 2-2z"
                        ></path>
                      </svg>
                    </div>
                    <div className="css-stb5t9 elkstcv2">
                      {apartment.features.accessForDisabled
                        ? 'There is access for the disabled'
                        : 'There is no access for the disabled'}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="margin-between-sections"></div>

          <div
            data-auto="apartment-details-block"
            className="css-10v65p4 e178eu6k0"
          >
            <div className="css-ltdyfs e178eu6k1">
              <div className="css-l238jx e178eu6k2">Entry date:</div>
              <div
                data-auto="unit-availability-value"
                className="css-ee94a4 e178eu6k3"
              >
                {apartment.entryDate.toString().split('T')[0]}
              </div>
            </div>

            <div className="css-ltdyfs e178eu6k1">
              <div className="css-l238jx e178eu6k2">Furniture:</div>
              <div
                data-auto="unit-furniture-details-value"
                className="css-ee94a4 e178eu6k3"
              >
                {apartment.furniture}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="margin-between-sections"></div>

      <div data-auto="leads-form" className="css-rlze51 e1g5ext0">
        <div className="css-1p5re2e e1g5ext2">
          <div className="css-17hovo1 e1siqbpd0">
            <div
              data-auto="poc-image-container"
              className="css-1jql4ni e1siqbpd1"
            >
              <div data-auto="poc-agent-logo">
                <svg width="48" height="48" xmlns="http://www.w3.org/2000/svg">
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
                {ownerName}
              </div>
            </div>
          </div>
          <a data-auto="phone-number-button" className="css-qa186o e1g5ext4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 16 16"
            >
              <path
                fill="#303030"
                fillRule="evenodd"
                d="M4.869 2.834l1.292 1.292a1 1 0 0 1 0 1.414L5.126 6.575c.342.93.923 1.801 1.742 2.612.819.81 1.69 1.417 2.612 1.821l1.086-1.183a1 1 0 0 1 1.39-.08l1.147.989a1 1 0 0 1 .128 1.382l-.545.682a2 2 0 0 1-1.65.749c-2.295-.102-4.265-.974-5.91-2.619C3.463 9.264 2.59 7.155 2.505 4.601a2 2 0 0 1 .798-1.666l.259-.194a1 1 0 0 1 1.307.093z"
              ></path>
            </svg>
            {apartment.phone}
          </a>
        </div>
      </div>
    </>
  );
};

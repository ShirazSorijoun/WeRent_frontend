import apartmentService from '../../services/apartments-service';
import { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ApartmentCard from '../../components/ApartmentCard/ApartmentCard';
import { ApartmentProps } from '../../types/types';

const RentPropertiesPage = () => {
  // Define state to store the apartments
  const [apartments, setApartments] = useState<ApartmentProps[]>([]);

  // Define a useEffect hook to fetch apartments when the component mounts
  useEffect(() => {
    // Fetch apartments
    const { req, abort } = apartmentService.getAllApartments();
    
    req.then(response => {
      setApartments(response.data);
    }).catch(error => {
      console.error('Error fetching apartments:', error);
    });

    // Cleanup function to abort the request if the component unmounts
    return () => abort();
  }, []); // Run only once when the component mounts

  return (
    <Container fluid style={{ marginTop: '70px', marginBottom: '10px', marginLeft: 'auto', marginRight: 'auto'  }}>
      <Row>
        {apartments.map(apartment => (
          <Col key={apartment._id} style={{ width: '382px', height: '431px', marginBottom: '70px', paddingLeft: '5px', paddingRight: '5px' }}>
            <ApartmentCard apartment={apartment} />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default RentPropertiesPage;
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import AddApartment from '../../components/AddApartment/addApartment';

const AddApartmentPage = () => {
  return (
    <>
      <Container style={{ marginTop: '30px', marginBottom: '200px' }}>
        <Row>
          <Col>
            <AddApartment />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default AddApartmentPage;

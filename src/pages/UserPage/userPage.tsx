import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import UserProfile from '../../components/UserProfile/userProfile';

const UserPage = () => {
  return (
    <>
      <Container style={{ marginTop: '30px', marginBottom: '200px' }}>
        <Row>
          <Col>
            <UserProfile />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default UserPage;

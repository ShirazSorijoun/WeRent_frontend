import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import UserProfile from "../../components/UserProfile/userProfile.tsx";
import Navbar from "../../components/Navbar/Navbar.tsx";
import Footer from "../../components/Footer/Footer.tsx";
//import Footer from "../../components/Footer/Footer.tsx";

const UserPage = () => {
  return (
    <>
      <Navbar />
      <Container style={{ marginTop: "30px" ,marginBottom: "200px"}}>
        <Row>
          <Col>
            <UserProfile />
          </Col>
        </Row>
      </Container>
      <Footer/>
    </>
  );
};

export default UserPage;

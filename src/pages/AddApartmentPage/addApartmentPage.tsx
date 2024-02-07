import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Navbar from "../../components/Navbar/Navbar.tsx";
import Footer from "../../components/Footer/Footer.tsx";
import AddApartment from "../../components/AddApartment/addApartment.tsx";
//import Footer from "../../components/Footer/Footer.tsx";

const AddApartmentPage = () => {
  return (
    <>
      <Navbar />
      <Container style={{ marginTop: "30px" ,marginBottom: "200px"}}>
        <Row>
          <Col>
            <AddApartment />
          </Col>
        </Row>
      </Container>
      <Footer/>
    </>
  );
};

export default AddApartmentPage;
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect, ChangeEvent } from "react";
import { Card, Button, Modal, Form, Spinner, Alert } from "react-bootstrap";
import EditIcon from "@material-ui/icons/Edit";
import {
  checkOldPassword,
  getUserById,
  updateOwnProfile,
} from "../../services/user-service";
import { handleRequestWithToken } from "../../services/handleRequestWithToken";
import { uploadImg } from "../../services/file-service";
import "./userProfile.css";
import { ApartmentProps } from "../../types/types";
import { Link } from "react-router-dom";
//import { faAlignRight } from "@fortawesome/free-solid-svg-icons";

const UserProfile: React.FC = () => {
  const [userProfile, setUserProfile] = useState({
    name: "",
    email: "",
    password: "",
    roles: "",
    profile_image: "",
  });

  const [apartments, setApartments] = useState<any[]>([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [tempUserProfile, setTempUserProfile] = useState({ ...userProfile });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [passwordError2, setPasswordError2] = useState<string | null>(null);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);

  const fetchUserProfile = async () => {
    const userId = localStorage.getItem("userId");

    if (!userId) {
      console.error("User ID not found in local storage");
      return;
    }

    const tokenRefreshed = await handleRequestWithToken();

    if (!tokenRefreshed) {
      console.log("Token refresh failed");
      return;
    }

    const token = localStorage.getItem("accessToken");

    try {
      setLoading(true);
      const response = await getUserById(userId, token || "");
      const { name, email, password, roles, profile_image } = response;
      setUserProfile((prev) => ({
        ...prev,
        name,
        email,
        password,
        roles,
        profile_image,
      }));
      setTempUserProfile((prev) => ({
        ...prev,
        name,
        email,
        password,
        roles,
        profile_image,
      }));
      setApartments(
        response.advertisedApartments.map((apartment: ApartmentProps) => ({
          ...apartment,
        }))
      );
    } catch (error) {
      console.error("Error fetching user profile:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const handleEditProfile = () => {
    setShowEditModal(true);
  };

  const handleCloseEditModal = () => {
    setShowEditModal(false);
  };

  const handleSubmit = async () => {
    const tokenRefreshed = await handleRequestWithToken();

    if (!tokenRefreshed) {
      console.log("Token refresh failed");
      return;
    }

    const token = localStorage.getItem("accessToken");

    try {
      setLoading(true);
      let photoUrl = userProfile.profile_image;

      if (selectedFile) {
        const imageResponse = await uploadImg(selectedFile);
        photoUrl = imageResponse.replace(/\\/g, "/");
        console.log(photoUrl);
      }

      await updateOwnProfile(
        { ...tempUserProfile, profile_image: photoUrl },
        token || ""
      );
      setUserProfile({ ...tempUserProfile });
      handleCloseEditModal();
      fetchUserProfile();
    } catch (error) {
      console.error("Error updating profile:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setTempUserProfile({ ...tempUserProfile, [e.target.id]: e.target.value });
  };

  const imageSelected = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
      console.log(e.target.files[0]);
    } else {
      setSelectedFile(null);
    }
  };

  const handleChangePassword = async () => {
    const tokenRefreshed = await handleRequestWithToken();

    if (!tokenRefreshed) {
      console.log("Token refresh failed");
      return;
    }

    const token = localStorage.getItem("accessToken");
    try {
      // Check if the new password has at least 6 characters
      if (newPassword.length < 6) {
        setPasswordError("Password must be at least 6 characters");
        return;
      } else {
        setPasswordError(null);
      }
      const isValid = await checkOldPassword(oldPassword, token || "");
      //console.log(isValid)
      if (isValid) {
        await updateOwnProfile(
          { ...tempUserProfile, password: newPassword },
          token || ""
        );
        setUserProfile({ ...tempUserProfile });
        fetchUserProfile();
        setPasswordError2(null);
        setShowSuccessAlert(true);
        setTimeout(() => setShowSuccessAlert(false), 3000);
        console.log("Password updated successfully!");
      } else {
        setPasswordError2("Not valid password");
        console.log("not valid password");
      }
    } catch (error) {
      console.log("fail chnge password");
    }
  };

  return (
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <Card
        style={{
          width: "500px",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          margin: "auto",
          marginTop: "30px",
        }}
      >
        <Card.Header
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-start",
          }}
        >
          <Button
            onClick={handleEditProfile}
            variant="light"
            style={{ marginRight: "15px" }}
          >
            <EditIcon />
          </Button>
          <h5 style={{ fontWeight: "bold", marginLeft: "90px" }}>
            Account details
          </h5>
        </Card.Header>

        <Card.Body style={{ overflow: "auto" }}>
          <div
            className="row g-3"
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              padding: "50px",
            }}
          >
            <img
              src={userProfile.profile_image}
              alt="Profile"
              style={{
                maxWidth: "300px",
                maxHeight: "300px",
                alignItems: "center",
              }}
            />
          </div>
          <div className="col-lg-6">
            <label className="form-label" htmlFor="AccountInput_Name">
              Name
            </label>
            <input
              className="form-control"
              id="AccountInput_Name"
              value={userProfile.name}
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
              value={userProfile.email}
              readOnly
            ></input>
          </div>
        </Card.Body>
        <Modal show={showEditModal} onHide={handleCloseEditModal}>
          <Modal.Header closeButton>
            <Modal.Title>Edit Profile</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group controlId="profile_image">
                <Form.Label>Profile Photo</Form.Label>
                <Form.Control
                  type="file"
                  accept="image/*"
                  onChange={imageSelected}
                />
              </Form.Group>
              <Form.Group controlId="name">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  value={tempUserProfile.name}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group controlId="email">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="text"
                  value={tempUserProfile.email}
                  onChange={handleChange}
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseEditModal}>
              Cancel
            </Button>
            <Button variant="primary" onClick={handleSubmit}>
              Save
            </Button>
          </Modal.Footer>
        </Modal>
      </Card>

      <div style={{ marginTop: "30px" }}>
        <Card
          style={{
            width: "700px",
            height: "50%",
            display: "flex",
            flexDirection: "column",
            margin: "auto",
          }}
        >
          <Card.Header
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <h5 style={{ fontWeight: "bold" }}>Change Password</h5>
          </Card.Header>

          <Card.Body style={{ overflow: "auto" }}>
            <div className="col-lg-6">
              <label className="form-label" htmlFor="OldPassword">
                Old password
              </label>
              <input
                type="password"
                className="form-control"
                id="OldPassword"
                onChange={(e) => setOldPassword(e.target.value)}
              ></input>
              {passwordError2 && (
                <p className="text-danger">{passwordError2}</p>
              )}
            </div>
            <div className="col-lg-6">
              <label className="form-label" htmlFor="NewPassword">
                New password
              </label>
              <input
                type="password"
                className="form-control"
                id="NewPassword"
                onChange={(e) => setNewPassword(e.target.value)}
              ></input>
              {passwordError && <p className="text-danger">{passwordError}</p>}
            </div>
            <div style={{ marginTop: "20px" }}></div>
            <Button variant="primary" onClick={handleChangePassword}>
              {loading ? <Spinner animation="border" size="sm" /> : "Save"}
            </Button>
          </Card.Body>
        </Card>
        {userProfile.roles === "owner" && (
          <Card
            style={{
              width: "700px",
              height: "45%",
              display: "flex",
              margin: "auto",
              marginTop: "30px",
            }}
          >
            <Card.Header
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <h5 style={{ fontWeight: "bold" }}>My apartments</h5>
            </Card.Header>

            <Card.Body style={{  overflowX: "auto",display: "flex"}}>
              <div className="card-body" style={{ overflow: "auto",display: "flex",marginRight: "10px", }}>
                {apartments ? (
                  apartments.length > 0 ? (
                    <>
                      {apartments.map((apartment) => (
                        <Card
                          as={Link}
                          to={`/apartment-details/${apartment._id}`}
                          key={apartment._id}
                          style={{
                            marginRight: "10px",
                            height: "180px",
                            width: "200px",
                            position: "relative",
                            flexShrink: 0,
                          }}
                        >
                          <Card.Img
                            variant="top"
                            src={apartment.apartment_image}
                            style={{ width: "100%", height: "80%" }}
                          />
                          <Card.Body style={{padding:"4px"}}>
                            <Card.Text style={{color:"#344050"}}>{apartment.city}</Card.Text>
                          </Card.Body>
                        </Card>
                      ))}
                    </>
                  ) : (
                    <h3>No posts found</h3>
                  )
                ) : (
                  <h3>Loading...</h3>
                )}
              </div>
            </Card.Body>
          </Card>
        )}
      </div>
      {/* Alert for success */}
      <Alert
        variant="success"
        show={showSuccessAlert}
        onClose={() => setShowSuccessAlert(false)}
        dismissible
        style={{ position: "fixed", top: 0, right: 0, left: 0, zIndex: 9999 }}
      >
        Password changed successfully!
      </Alert>
    </div>
  );
};

export default UserProfile;

import React, { useState, useEffect, ChangeEvent } from "react";
import { Card, Button, Modal, Form, Spinner } from "react-bootstrap";
import EditIcon from "@material-ui/icons/Edit";
import {
  checkOldPassword,
  getUserById,
  updateOwnProfile,
} from "../../services/user-service";
import { handleRequestWithToken } from "../../services/handleRequestWithToken";
import { uploadImg } from "../../services/file-service";
import "./userProfile.css";
//import { faAlignRight } from "@fortawesome/free-solid-svg-icons";

const UserProfile: React.FC = () => {
  const [userProfile, setUserProfile] = useState({
    name: "",
    email: "",
    password: "",
    profile_image: "",
  });

  const [showEditModal, setShowEditModal] = useState(false);
  const [tempUserProfile, setTempUserProfile] = useState({ ...userProfile });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);

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
      const { name, email, password, profile_image } = response;
      setUserProfile((prev) => ({
        ...prev,
        name,
        email,
        password,
        profile_image,
      }));
      setTempUserProfile((prev) => ({
        ...prev,
        name,
        email,
        password,
        profile_image,
      }));
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
      const isValid = await checkOldPassword(oldPassword, token || "");
      //console.log(isValid)
      if (isValid) {
        await updateOwnProfile(
          { ...tempUserProfile, password: newPassword },
          token || ""
        );
        setUserProfile({ ...tempUserProfile });
        fetchUserProfile();
        console.log("Password updated successfully!");
      } else {
        console.log("not valid password");
      }
    } catch (error) {
      console.log("fail chnge password");
    }
  };

  return (
    <div style={{ display: "flex", justifyContent: "space-between"}}>
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
            }}
          >
            <img
              src={userProfile.profile_image}
              alt="Profile"
              style={{
                maxWidth: "200px",
                maxHeight: "200px",
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
            justifyContent: "center",
          }}
        >
          <h5 style={{ fontWeight: "bold" }}>change Password</h5>
        </Card.Header>

        <Card.Body style={{ overflow: "auto" }}>
          <div className="col-lg-6">
            <label className="form-label" htmlFor="OldPassword">
              Old password
            </label>
            <input
              className="form-control"
              id="OldPassword"
              onChange={(e) => setOldPassword(e.target.value)}
            ></input>
          </div>
          <div className="col-lg-6">
            <label className="form-label" htmlFor="NewPassword">
              New Password
            </label>
            <input
              className="form-control"
              id="NewPassword"
              onChange={(e) => setNewPassword(e.target.value)}
            ></input>
          </div>
          <div style={{marginTop: "20px"}}></div>
          <Button variant="primary" onClick={handleChangePassword}>
            {loading ? <Spinner animation="border" size="sm" /> : "Save"}
          </Button>
        </Card.Body>
      </Card>
    </div>
  );
};

export default UserProfile;
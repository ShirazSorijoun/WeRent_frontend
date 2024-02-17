import { useState } from "react";
import { handleRequestWithToken } from "../../services/handleRequestWithToken";
import {
  changeRole,
  updateOwnProfile,
} from "../../services/user-service";
import { Alert, Button, Card, Dropdown } from "react-bootstrap";
import { useNavigate } from "react-router";
import { useAuth } from "../Navbar/authContext";

function ChangePassword() {
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);

  const handleChangePassword = async () => {
    const tokenRefreshed = await handleRequestWithToken();

    if (!tokenRefreshed) {
      console.log("Token refresh failed");
      return;
    }

    const token = localStorage.getItem("accessToken");
    try {
      // Check if the new password has at least 6 characters
      if (password.length < 6) {
        setPasswordError("Password must be at least 6 characters");
        return;
      } else {
        setPasswordError(null);
      }

      await updateOwnProfile({ password: password }, token || "");
      await changeRole(role, token || "");
      localStorage.setItem("roles", role);

      setShowSuccessAlert(true);
      setTimeout(() => setShowSuccessAlert(false), 3000);
      console.log("Password updated successfully!");
      login();
      navigate("/");
    } catch (error) {
      console.log("fail chnge password");
    }
  };

  const handleRoleChange = (item: string) => {
    setRole(item);
    console.log(item);
  };

  return (
    <div style={{ marginTop: "30px", marginBottom: "200px" }}>
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
            <h5 style={{ fontWeight: "bold" }}>Choose Password and Role</h5>
          </Card.Header>

          <Card.Body style={{ overflow: "auto" }}>
            <div className="col-lg-6" style={{ marginBottom: "20px" }}>
              <label className="form-label" htmlFor="NewPassword">
                Please choose a new password
              </label>
              <input
                type="password"
                className="form-control"
                id="NewPassword"
                onChange={(e) => setPassword(e.target.value)}
              ></input>
              {passwordError && <p className="text-danger">{passwordError}</p>}
            </div>

            {/* Dropdown for selecting role */}
            <div className="col-lg-6" style={{ marginBottom: "20px" }}>
              <Dropdown>
                <Dropdown.Toggle variant="light" id="dropdown-basic">
                  {role || "Select Role"}
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item
                    onClick={() => handleRoleChange("owner")}
                    href="#"
                  >
                    Owner
                  </Dropdown.Item>
                  <Dropdown.Item
                    onClick={() => handleRoleChange("tenant")}
                    href="#"
                  >
                    Tenant
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>
            <div style={{ marginTop: "20px" }}></div>
            <Button style={{ backgroundColor: '#6C757D', borderColor: '#6C757D' , color:"#FFFFFF" }} variant="primary1" onClick={handleChangePassword}>
              Save
            </Button>
          </Card.Body>
        </Card>
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
}

export default ChangePassword;

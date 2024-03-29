/* eslint-disable @typescript-eslint/no-explicit-any */
import "./Registration.css";
import { ChangeEvent, useRef, useState } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import img from "../../assets/img.jpg";
import UserVactor from "../../assets/user_vector.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage } from "@fortawesome/free-solid-svg-icons";
import { uploadImg } from "../../services/file-service";
import {
  registerUser,
  UserRole,
  ILogin,
  loginUser,
  googleSignin,
  IUser,
} from "../../services/user-service";
import { z } from "zod";
import { CredentialResponse, GoogleLogin } from "@react-oauth/google";
import "./Registration.css";
import { useAuth } from "../Navbar/authContext";
import { useNavigate } from "react-router";
import { Alert } from "react-bootstrap";

const schema = z.object({
  name: z.string().min(3, { message: "Name must contain at least 3 letters" }),
  email: z.string().email({ message: "Invalid email format" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" }),
});

function Registration() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [imgSrc, setImgSrc] = useState<File>();
  const [selectedItem, setSelectedItem] = useState<string>("User type");
  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});
  const [showAlert, setShowAlert] = useState(false);
  const [formData, setFormData] = useState<ILogin>({
    name: "",
    email: "",
    password: "",
  });

  const handleItemClick = (item: string) => {
    setSelectedItem(item);
    console.log(item);
  };

  let newSelectedItem: UserRole;
  const fileInputRef = useRef<HTMLInputElement>(null);
  const nameInputRef = useRef<HTMLInputElement>(null);
  const emailInputRef = useRef<HTMLInputElement>(null);
  const passwordInputRef = useRef<HTMLInputElement>(null);

  const handleChange =
    (prop: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setFormErrors({ ...formErrors, [prop]: "" });
      setFormData({ ...formData, [prop]: event.target.value });
    };

  const onImgSelected = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newUrl = e.target.files[0];
      setImgSrc(newUrl);
    }
  };

  const selectImg = () => {
    console.log("Selecting image...");
    fileInputRef.current?.click();
  };

  const onRegister = async () => {
    console.log("Registering...");
    // Check if the user selected a role
    if (selectedItem === "User type") {
      setFormErrors({
        role: "Please choose a role (Owner or Tenant)",
      });
      return;
    }

    try {
      schema.parse(formData);
    } catch (error) {
      if (error instanceof z.ZodError) {
        const errors: { [key: string]: string } = {};
        error.errors.forEach((err) => {
          errors[err.path[0]] = err.message;
        });
        setFormErrors(errors);
        return;
      }
    }

    let url: string | undefined;
    if (imgSrc) {
      try {
        url = await uploadImg(imgSrc);
      } catch (error) {
        setFormErrors({
          image: "Failed to upload the image. Please try again.",
        });
        return;
      }
    }

    if (
      nameInputRef.current?.value &&
      emailInputRef.current?.value &&
      passwordInputRef.current?.value
    ) {
      if (selectedItem === "Owner") newSelectedItem = UserRole.Owner;
      if (selectedItem === "Tenant") newSelectedItem = UserRole.Tenant;
      console.log(url);

      const user: IUser = {
        name: nameInputRef.current?.value,
        email: emailInputRef.current?.value,
        password: passwordInputRef.current?.value,
        roles: newSelectedItem,
        profile_image: url,
        tokens: [],
      };

      try {
        const registrationResponse = await registerUser(user);
        console.log("User registered:", registrationResponse);

        // Log in the user immediately after successful registration
        const loginResponse = await loginUser(formData);
        console.log("User logged in");
        //console.log(loginResponse)

        localStorage.setItem("accessToken", loginResponse?.tokens.accessToken);
        localStorage.setItem(
          "refreshToken",
          loginResponse?.tokens.refreshToken
        );
        localStorage.setItem("userId", loginResponse?.userId);
        localStorage.setItem("roles", loginResponse?.userRole);

        login();
        navigate("/");
      } catch (error: any) {
        console.error("Login failed:", error);
        //console.log(error.response.status);
        if (error.response.status === 406) {
          setShowAlert(true);
          setTimeout(() => setShowAlert(false), 3000);
        }
      }
    }

    setFormErrors({});
  };


  const onGoogleLoginSuccess = async (
    credentialResponse: CredentialResponse
  ) => {
    console.log(credentialResponse);
    try {
      const res = await googleSignin(credentialResponse);
      console.log(res);
      localStorage.setItem("accessToken", res?.accessToken);
      localStorage.setItem("refreshToken", res?.refreshToken);
      localStorage.setItem("userId", res?._id);
      navigate("/changePassword");
    } catch (e) {
      console.log(e);
    }
  };

  const onGoogleLoginFailure = () => {
    console.log("Google login failed");
  };

  return (
    <div className="container">
      <div className="row" style={{ marginBottom: "120px", marginTop: "50px" }}>
        <div className="col-md-5 d-flex align-items-center justify-content-center">
          <img
            src={img}
            className="img-fluid"
            alt="Preview"
            style={{ height: "730px", width: "700px" }}
          ></img>
        </div>

        <div className="col-md-7 d-flex">
          <div className="vstack gap-3 col-md-7 mx-auto">
            <h1 className="register-title d-flex justify-content-center position-relative">
              Registration
            </h1>
            <p className="register d-flex justify-content-center position-relative">
              Glad you came! Just a few details to get to know you
            </p>

            <div className="d-flex justify-content-center position-relative">
              <div style={{ height: "230px", width: "230px" }}>
                {imgSrc ? (
                  <img
                    src={imgSrc ? URL.createObjectURL(imgSrc) : UserVactor}
                    className="img-fluid"
                    alt="Preview"
                    style={{ height: "230px", width: "230px" }}
                  />
                ) : (
                  <img src={UserVactor} className="img-fluid" alt="Preview" />
                )}

                <button
                  type="button"
                  className="btn position-absolute bottom-0 end-0"
                  onClick={selectImg}
                >
                  <FontAwesomeIcon icon={faImage} className="fa-xl" />
                </button>
              </div>
            </div>

            <input
              style={{ display: "none" }}
              ref={fileInputRef}
              type="file"
              className="form-control"
              placeholder="Profile Picture"
              onChange={onImgSelected}
            />

            <Dropdown>
              <Dropdown.Toggle variant="light" id="dropdown-basic">
                {selectedItem}
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item
                  onClick={() => handleItemClick("Owner")}
                  href="#"
                >
                  Owner
                </Dropdown.Item>
                <Dropdown.Item
                  onClick={() => handleItemClick("Tenant")}
                  href="#"
                >
                  Tenant
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>

            {formErrors["role"] && (
              <p className="text-danger">{formErrors["role"]}</p>
            )}

            <input
              ref={nameInputRef}
              type="text"
              className="form-control"
              placeholder="Name"
              onChange={handleChange("name")}
            />
            {formErrors["name"] && (
              <p className="text-danger">{formErrors["name"]}</p>
            )}
            <input
              ref={emailInputRef}
              type="text"
              className="form-control"
              placeholder="Email"
              onChange={handleChange("email")}
            />
            {formErrors["email"] && (
              <p className="text-danger">{formErrors["email"]}</p>
            )}
            <input
              ref={passwordInputRef}
              type="password"
              className="form-control"
              placeholder="Password"
              onChange={handleChange("password")}
            />
            {formErrors["password"] && (
              <p className="text-danger">{formErrors["password"]}</p>
            )}
            <button type="button" className="button-71" onClick={onRegister}>
              Register
            </button>

            <div className="access-panel__social-divider">
              <hr className="Le0O55_iMmJJKvEaCRdN access-panel__social-divider-line" />
              <span className="access-panel__social-divider-text">
                or use with this option
              </span>
              <hr className="Le0O55_iMmJJKvEaCRdN access-panel__social-divider-line" />
            </div>
            <div className="googleLogin">
              <GoogleLogin
                onSuccess={onGoogleLoginSuccess}
                onError={onGoogleLoginFailure}
                shape="circle"
                type="standard"
                width="100px"
                text="signup_with"
                logo_alignment="center"
                locale="en_CN"
              />
            </div>
          </div>
        </div>
      </div>
      <Alert
        show={showAlert}
        onClose={() => setShowAlert(false)}
        dismissible
        style={{
          position: "fixed",
          top: 0,
          right: 0,
          left: 0,
          zIndex: 9999,
          backgroundColor: "red",
          color: "white",
        }}
      >
        User already exists!
      </Alert>
    </div>
  );
}

export default Registration;

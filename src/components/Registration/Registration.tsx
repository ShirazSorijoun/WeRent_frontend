//import "./Registration.css";
import { ChangeEvent, useRef, useState } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import img from "../../assets/img.jpg";
import loginIcon from "../../assets/icon.webp";
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

const schema = z.object({
  name: z.string().min(3, { message: "Name must contain at least 3 letters" }),
  email: z.string().email({ message: "Invalid email format" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" }),
});

function Registration() {
  const [imgSrc, setImgSrc] = useState<File>();
  const [selectedItem, setSelectedItem] = useState<string>("User type");
  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});
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
      } catch (error) {
        console.error("Login failed:", error);
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
    } catch (e) {
      console.log(e);
    }
  };

  const onGoogleLoginFailure = () => {
    console.log("Google login failed");
  };


  return (
    <div className="container">
      <div className="row">
        <div className="col-md-5">
          <img
            src={img}
            className="img-fluid"
            alt="Preview"
            style={{ height: "730px", width: "700px" }}
          ></img>
        </div>

        <div className="col-md-7">
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
                    src={imgSrc ? URL.createObjectURL(imgSrc) : loginIcon}
                    className="img-fluid"
                    alt="Preview"
                    style={{ height: "230px", width: "230px" }}
                  />
                ) : (
                  <img src={loginIcon} className="img-fluid" alt="Preview" />
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
            <button
              type="button"
              className="btn btn-primary"
              onClick={onRegister}
            >
              Register
            </button>

            <div className="access-panel__social-divider">
              <hr className="Le0O55_iMmJJKvEaCRdN access-panel__social-divider-line" />
              <span className="access-panel__social-divider-text">
                or use with this option
              </span>
              <hr className="Le0O55_iMmJJKvEaCRdN access-panel__social-divider-line" />
            </div>

            <button className="gsi-material-button">
              
              <div className="gsi-material-button-state"></div>
              <div className="gsi-material-button-content-wrapper">
                <div className="gsi-material-button-icon">
                  <svg
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 48 48"
                  >
                    <path
                      fill="#EA4335"
                      d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
                    ></path>
                    <path
                      fill="#4285F4"
                      d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
                    ></path>
                    <path
                      fill="#FBBC05"
                      d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"
                    ></path>
                    <path
                      fill="#34A853"
                      d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
                    ></path>
                    <path fill="none" d="M0 0h48v48H0z"></path>
                  </svg>
                </div>
                <span className="gsi-material-button-contents">
                  Sign up with Google
                </span>
              </div>
            </button>

            <GoogleLogin
                  onSuccess={onGoogleLoginSuccess}
                  onError={onGoogleLoginFailure}
                />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Registration;

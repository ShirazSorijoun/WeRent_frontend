//import "./Registration.css";
import { ChangeEvent, useRef, useState } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import userVector from "../../assets/user_vector.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage } from "@fortawesome/free-solid-svg-icons";
import { uploadImg } from "../../services/file-service";
import {
  registerUser,
  IUser,
  UserRole,
  ILogin,
  loginUser,
} from "../../services/user-service";

function Registration() {
  const [imgSrc, setImgSrc] = useState<File>();
  const [selectedItem, setSelectedItem] = useState<string>("User type");
  //const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});
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
      setFormData({ ...formData, [prop]: event.target.value });
    };

  const onImgSelected = (e: ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
    if (e.target.files && e.target.files.length > 0) {
      const newUrl = e.target.files[0];
      setImgSrc(newUrl);
      console.log(newUrl);
    }
  };

  const selectImg = () => {
    console.log("Selecting image...");
    fileInputRef.current?.click();
  };

  const onRegister = async () => {
    console.log("Registering...");
    const url = await uploadImg(imgSrc!);
    console.log("upload returend:" + url);

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
  
        localStorage.setItem("accessToken", loginResponse?.accessToken);
        localStorage.setItem("refreshToken", loginResponse?.refreshToken);
        localStorage.setItem("userId", loginResponse?.userId);
      } catch (error) {
        console.error("Login failed:", error);
      }
    }
  };

  return (
    <div className="vstack gap-3 col-md-7 mx-auto">
      <h1 className="d-flex justify-content-center position-relative">
        Registration
      </h1>
      <p className="d-flex justify-content-center position-relative">
        Fill in the from below to create an account.
      </p>

      <div className="d-flex justify-content-center position-relative">
        <div style={{ height: "230px", width: "230px" }}>
          {imgSrc ? (
            <img
              src={imgSrc ? URL.createObjectURL(imgSrc) : userVector}
              className="img-fluid"
              alt="Preview"
              style={{ height: "230px", width: "230px" }}
            />
          ) : (
            <img src={userVector} className="img-fluid" alt="Preview" />
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
        <Dropdown.Toggle variant="danger" id="dropdown-basic">
          {selectedItem}
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item onClick={() => handleItemClick("Owner")} href="#">
            Owner
          </Dropdown.Item>
          <Dropdown.Item onClick={() => handleItemClick("Tenant")} href="#">
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
      <input
        ref={emailInputRef}
        type="text"
        className="form-control"
        placeholder="Email"
        onChange={handleChange("email")}
      />
      <input
        ref={passwordInputRef}
        type="password"
        className="form-control"
        placeholder="Password"
        onChange={handleChange("password")}
      />
      <button type="button" className="btn btn-primary" onClick={onRegister}>
        Register
      </button>
    </div>
  );
}

export default Registration;

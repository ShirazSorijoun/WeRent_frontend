/* eslint-disable @typescript-eslint/no-explicit-any */
import './Registration.css';
import { ChangeEvent, useRef, useState } from 'react';
import img from '../../assets/img.jpg';
import UserVactor from '../../assets/user_vector.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImage } from '@fortawesome/free-solid-svg-icons';
import { z } from 'zod';
import { CredentialResponse, GoogleLogin } from '@react-oauth/google';
import './Registration.css';
import { useNavigate } from 'react-router';
import { Alert } from 'react-bootstrap';
import { IUser, IRegister } from '@/models';
import { api } from '@/api';
import { ILoginResponse } from '@/models/login';
import { useAppDispatch } from '@/hooks/store';
import { userLogin } from '@/stores/user';
import { handleLocalStorageLogin } from '@/utils/auth';

const schema = z.object({
  firstName: z.string().min(2, { message: 'First Name must contain at least 2 letters' }),
  lastName: z.string().min(2, { message: 'Last Name must contain at least 2 letters' }),
  email: z.string().email({ message: 'Invalid email format' }),
  password: z
    .string()
    .min(6, { message: 'Password must be at least 6 characters' }),
});

export const RegistrationPage = () => {
  const navigate = useNavigate();
  const [imgSrc, setImgSrc] = useState<File>();
  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});
  const [showAlert, setShowAlert] = useState(false);
  const [formData, setFormData] = useState<IRegister>({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });

  const dispatch = useAppDispatch();

  const fileInputRef = useRef<HTMLInputElement>(null);
  const firstNameInputRef = useRef<HTMLInputElement>(null);
  const lastNameInputRef = useRef<HTMLInputElement>(null);
  const emailInputRef = useRef<HTMLInputElement>(null);
  const passwordInputRef = useRef<HTMLInputElement>(null);
  const personalIdInputRef = useRef<HTMLInputElement>(null);
  const phoneNumberInputRef = useRef<HTMLInputElement>(null);
  const cityAddressInputRef = useRef<HTMLInputElement>(null);
  const streetAddressInputRef = useRef<HTMLInputElement>(null);

  const handleChange =
    (prop: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setFormErrors({ ...formErrors, [prop]: '' });
      setFormData({ ...formData, [prop]: event.target.value });
    };

  const onImgSelected = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newUrl = e.target.files[0];
      setImgSrc(newUrl);
    }
  };

  const selectImg = () => {
    console.log('Selecting image...');
    fileInputRef.current?.click();
  };

  const logUserAfterRegister = async (data: ILoginResponse) => {
    handleLocalStorageLogin(data);

    if (!data.isNeedPass) {
      navigate('/changePassword');
    } else {
      await dispatch(userLogin(data.userId));
      navigate('/');
    }
  };

  const onRegister = async () => {
    console.log('Registering...');

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
        url = await api.file.uploadImage(imgSrc);
      } catch (error) {
        setFormErrors({
          image: 'Failed to upload the image. Please try again.',
        });
        return;
      }
    }

    if (
      firstNameInputRef.current?.value &&
      lastNameInputRef.current?.value &&
      personalIdInputRef.current?.value &&
      phoneNumberInputRef.current?.value &&
      cityAddressInputRef.current?.value &&
      streetAddressInputRef.current?.value &&
      emailInputRef.current?.value &&
      passwordInputRef.current?.value
    ) {
      const user: IUser = {
        firstName: firstNameInputRef.current?.value,
        lastName: lastNameInputRef.current?.value,
        email: emailInputRef.current?.value,
        password: passwordInputRef.current?.value,
        personalId: personalIdInputRef.current?.value,
        phoneNumber: phoneNumberInputRef.current?.value,
        cityAddress: cityAddressInputRef.current?.value,
        streetAddress: streetAddressInputRef.current?.value,
        profile_image: url,
        tokens: [],
      };

      try {
        const registrationResponse = await api.auth.registerUser(user);
        console.log('User registered:', registrationResponse);

        // Log in the user immediately after successful registration
        const loginResponse = await api.auth.loginUser({email: formData.email, password: formData.password});
        logUserAfterRegister(loginResponse);
      } catch (error: any) {
        console.error('Login failed:', error);
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
    credentialResponse: CredentialResponse,
  ) => {
    console.log(credentialResponse);
    try {
      const res = await api.auth.googleLogin(credentialResponse);
      logUserAfterRegister(res);
    } catch (e) {
      console.log(e);
    }
  };

  const onGoogleLoginFailure = () => {
    console.log('Google login failed');
  };

  return (
    <div className="container">
      <div className="row" style={{ marginBottom: '120px', marginTop: '50px' }}>
        <div className="col-md-5 d-flex align-items-center justify-content-center">
          <img
            src={img}
            className="img-fluid"
            alt="Preview"
            style={{ height: '730px', width: '700px' }}
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
              <div style={{ height: '230px', width: '230px' }}>
                {imgSrc ? (
                  <img
                    src={imgSrc ? URL.createObjectURL(imgSrc) : UserVactor}
                    className="img-fluid"
                    alt="Preview"
                    style={{ height: '230px', width: '230px' }}
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
              style={{ display: 'none' }}
              ref={fileInputRef}
              type="file"
              className="form-control"
              placeholder="Profile Picture"
              onChange={onImgSelected}
            />
            <input
              ref={firstNameInputRef}
              type="text"
              className="form-control"
              placeholder="First Name"
              onChange={handleChange('firstName')}
            />
            {formErrors.firstName && (
              <p className="text-danger">{formErrors.firstName}</p>
            )}
            <input
              ref={lastNameInputRef}
              type="text"
              className="form-control"
              placeholder="Last Name"
              onChange={handleChange('lastName')}
            />
            {formErrors.lastName && (
              <p className="text-danger">{formErrors.lastName}</p>
            )}
            <input
              ref={personalIdInputRef}
              type="text"
              className="form-control"
              placeholder="Personal Id"
              onChange={handleChange('personalId')}
            />
            {formErrors.personalId && (
              <p className="text-danger">{formErrors.personalId}</p>
            )}
            <input
              ref={emailInputRef}
              type="text"
              className="form-control"
              placeholder="Email"
              onChange={handleChange('email')}
            />
            {formErrors.email && (
              <p className="text-danger">{formErrors.email}</p>
            )}
            <input
              ref={phoneNumberInputRef}
              type="text"
              className="form-control"
              placeholder="Phone Number"
              onChange={handleChange('phoneNumber')}
            />
            {formErrors.phoneNumber && (
              <p className="text-danger">{formErrors.phoneNumber}</p>
            )}
            <input
              ref={streetAddressInputRef}
              type="text"
              className="form-control"
              placeholder="Street Address"
              onChange={handleChange('streetAddress')}
            />
            {formErrors.streetAddress && (
              <p className="text-danger">{formErrors.streetAddress}</p>
            )}
            <input
              ref={cityAddressInputRef}
              type="text"
              className="form-control"
              placeholder="City Address"
              onChange={handleChange('cityAddress')}
            />
            {formErrors.cityAddress && (
              <p className="text-danger">{formErrors.cityAddress}</p>
            )}
            <input
              ref={passwordInputRef}
              type="password"
              className="form-control"
              placeholder="Password"
              onChange={handleChange('password')}
            />
            {formErrors.password && (
              <p className="text-danger">{formErrors.password}</p>
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
          position: 'fixed',
          top: 0,
          right: 0,
          left: 0,
          zIndex: 9999,
          backgroundColor: 'red',
          color: 'white',
        }}
      >
        User already exists!
      </Alert>
    </div>
  );
};

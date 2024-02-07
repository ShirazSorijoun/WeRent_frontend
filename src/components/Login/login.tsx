import React, { useState } from "react";
import { ILogin, loginUser } from "../../services/user-service";

const Login: React.FC = () => {
  const [formData, setFormData] = useState<ILogin>({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: "name" | "email" | "password"
  ) => {
    setFormData({
      ...formData,
      [field]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const loginResponse = await loginUser(formData);

      console.log("User logged in");

      localStorage.setItem("accessToken", loginResponse?.tokens.accessToken);
      localStorage.setItem("refreshToken", loginResponse?.tokens.refreshToken);
      localStorage.setItem("userId", loginResponse?.userId);
      
      setError(null);

    } catch (error) {
      console.error("Login failed", error);
      setError("Invalid username or password");
    }
  };

  return (
    <div className="container mt-5">
      <div className="col-sm-6 offset-sm-3">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Name:
            </label>
            <input
              type="text"
              className="form-control"
              id="name"
              name="name"
              value={formData.name}
              onChange={(e) => handleChange(e, "name")}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              email:
            </label>
            <input
              type="text"
              className="form-control"
              id="email"
              name="email"
              value={formData.email}
              onChange={(e) => handleChange(e, "email")}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password:
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              value={formData.password}
              onChange={(e) => handleChange(e, "password")}
            />
          </div>
          {error && <p className="text-danger">{error}</p>}
          <button type="submit" className="btn btn-primary">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;

import React, { useContext, useState, useEffect } from "react";
import { MdError } from "react-icons/md";
import { FaCircleCheck } from "react-icons/fa6";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/authentication.css";
import { AuthContext } from "../context/AuthContext";

export default function Authentication() {
  const [formState, setFormState] = useState(1); //default signup
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (message || error) {
      const timer = setTimeout(() => {
        setMessage("");
        setError("");
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [message, error]);

  const { handleRegister, handleLogin } = useContext(AuthContext);
  const handleAuth = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    //SIGNUP VALIDATION
    if (formState === 1) {
      if (!name || !username || !password) {
        setError("All fields are required.");
        return;
      }
    }

    if (name.trim() && username.trim() && password.trim()) {
      if (password.length < 8) {
        setError("Your password must contain 8 or more characters.");
        return;
      }
    }

    try {
      //Login
      if (formState === 0) {
        let result = await handleLogin(username, password);
        console.log("user logged in", { result });
      }

      //signup
      if (formState === 1) {
        const result = await handleRegister(name, username, password);
        console.log("Registration success", result.message);
        setName("");
        setUsername("");
        setPassword("");
        setMessage(result.message);
        setFormState(0); //go for login
      }
    } catch (err) {
      console.error(err);
      let message = err.message;
      setError(message);
    }
  };

  return (
    <div className="signup-page d-flex align-items-center justify-content-center">
      <div className="signup-card p-4 p-md-5 rounded-4 shadow-sm">
        <div className="text-center mb-3">
          <img
            src="https://mui.com/static/logo.png"
            alt="Logo"
            width="35"
            className="mb-2"
          />
          {formState === 1 ? (
            <h3 className="fw-bold mb-4">Create your account</h3>
          ) : (
            <>
              <h3 className="fw-bold ">Sign in to MeetSphere</h3>
              <p className="SignIn-Welcome mb-4">
                Welcome back! Please sign in to continue
              </p>
            </>
          )}
        </div>

        {formState === 1 && (
          <div className="mb-3 input-fields">
            <label className="form-label fw-semibold">Full name</label>
            <input
              type="text"
              className="form-control p-2"
              placeholder="Jon Snow"
              required
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
        )}

        <div className="mb-3">
          <label className="form-label fw-semibold">Username</label>
          <input
            type="text"
            className="form-control p-2 "
            placeholder="jon@2004"
            required
            name="username"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label className="form-label fw-semibold">Password</label>
          <input
            type="password"
            className="form-control p-2"
            placeholder="••••••••"
            name="password"
            required
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && (
            <p className="input-error">
              <MdError /> {error}
            </p>
          )}
          {message && (
            <p className="login-success">
              <FaCircleCheck /> {message}
            </p>
          )}
        </div>

        <div className="form-check mb-3">
          <input
            type="checkbox"
            className="form-check-input"
            name="updates"
            id="updatesCheck"
          />
          <label htmlFor="updatesCheck" className="form-check-label">
            Remember me.
          </label>
        </div>

        {formState === 1 ? (
          <button
            className="btn btn-dark w-100 py-2 rounded-3 fw-semibold"
            type="button"
            onClick={handleAuth}
          >
            Sign up
          </button>
        ) : (
          <button
            className="btn btn-dark w-100 py-2 rounded-3 fw-semibold"
            type="button"
            onClick={handleAuth}
          >
            Sign in
          </button>
        )}

        {formState === 1 ? (
          <p className="text-center mt-3 mb-0">
            Already have an account?{" "}
            <a className="fw-semibold" onClick={() => setFormState(0)}>
              Sign in
            </a>
          </p>
        ) : (
          <p className="text-center mt-3 mb-0">
            New user?{" "}
            <a className="fw-semibold" onClick={() => setFormState(1)}>
              Sign up
            </a>
          </p>
        )}
      </div>
    </div>
  );
}

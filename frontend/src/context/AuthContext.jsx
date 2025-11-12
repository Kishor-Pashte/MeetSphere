import axios from "axios";
import { createContext, useContext, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import httpStatus from "http-status";
import server from "../environment";

export const AuthContext = createContext({});

const client = axios.create({
  baseURL: `${server}/api/v1/users`,
});

export const AuthProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);
  const router = useNavigate();

  const handleRegister = async (name, username, password) => {
    try {
      const request = await client.post("/register", {
        name,
        username,
        password,
      });

      if (request.status === httpStatus.CREATED) {
        return request.data;
      }
    } catch (err) {
      console.error("Registration error:", err);
      const message = err.response?.data?.message || err.message;
      throw new Error(message);
    }
  };

  const handleLogin = async (username, password) => {
    try {
      const request = await client.post("/login", {
        username,
        password,
      });

      if (request.status === httpStatus.OK) {
        localStorage.setItem("token", request.data.token);
        localStorage.setItem("username", request.data.username);
        router("/home");
      }
    } catch (err) {
      console.error("Login error", err);
      const message = err.response?.data?.message || "Login failed";
      throw new Error(message);
    }
  };

  const getHistoryOfUser = async () => {
    try {
      let request = await client.get("/get_all_activity", {
        params: {
          token: localStorage.getItem("token"),
        },
      });

      return request.data;
    } catch (e) {
      console.log(e);
      throw e;
    }
  };

  const addToUserHistory = async (meetingCode) => {
    try {
      let request = await client.post("/add_to_activity", {
        token: localStorage.getItem("token"),
        meeting_code: meetingCode,
      });

      return request;
    } catch (e) {
      console.log(e);
      throw e;
    }
  };

  const data = useMemo(
    () => ({
      userData,
      setUserData,
      handleRegister,
      handleLogin,
      getHistoryOfUser,
      addToUserHistory,
    }),
    [userData]
  );

  return <AuthContext.Provider value={data}>{children}</AuthContext.Provider>;
};

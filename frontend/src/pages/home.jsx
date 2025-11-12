import React, { useContext, useState } from "react";
import withAuth from "../utils/withAuth";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { IconButton, Button, TextField } from "@mui/material";
import Fab from "@mui/material/Fab";
import NavigationIcon from "@mui/icons-material/Navigation";
import LogoutIcon from "@mui/icons-material/Logout";
import HistoryIcon from "@mui/icons-material/History";

import "../styles/home.css";

function HomeComponent() {
  let navigate = useNavigate();
  const [meetingCode, setMeetingCode] = useState("");

  const { addToUserHistory } = useContext(AuthContext);
  let handleJoinVideoCall = async () => {
    await addToUserHistory(meetingCode);
    navigate(`/${meetingCode}`);
  };

  return (
    <>
      <div className="home-component">
        <div className="nav-bar">
          <div
            style={{ display: "flex", alignItems: "center" }}
            className="nav-left"
          >
            <img
              src="https://mui.com/static/logo.png"
              alt="Logo"
              width="35"
              className="mb-2"
            />
            <h3>MeetSphere</h3>
          </div>
          <div
            style={{ display: "flex", alignItems: "center" }}
            className="nav-right"
          >
            <HistoryIcon
              onClick={() => navigate("/history")}
              className="history-icon"
              style={{ marginRight: "18px", fontSize: "33px" }}
            />
            <Fab
              onClick={() => {
                localStorage.removeItem("token");
                navigate("/");
              }}
              variant="extended"
            >
              LogOut
              <LogoutIcon style={{ margin: "0 0 3px 8px", fontSize: "20px" }} />
            </Fab>
          </div>
        </div>

        <div className="meet-container">
          <div className="left-panel">
            <div>
              <h2>
                From anywhere in the world, it feels like your're right here.
              </h2>
              &nbsp;
              <div style={{ display: "flex", gap: "10px" }}>
                <input
                  onChange={(e) => setMeetingCode(e.target.value)}
                  placeholder="Meeting Code"
                />

                <Button onClick={handleJoinVideoCall} variant="contained">
                  Join
                </Button>
              </div>
            </div>
          </div>
          <div className="right-panel">
            <img src="/logo.svg" />
          </div>
        </div>
      </div>
    </>
  );
}

export default withAuth(HomeComponent);

//MY CODE

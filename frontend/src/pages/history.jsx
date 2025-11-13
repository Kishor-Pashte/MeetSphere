import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { IconButton } from "@mui/material";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import HomeIcon from "@mui/icons-material/Home";
import "../styles/history.css";

export default function History() {
  const { getHistoryOfUser } = useContext(AuthContext);
  const [meetings, setMeetings] = useState([]);
  const routeTo = useNavigate();

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const history = await getHistoryOfUser();
        setMeetings(history);
      } catch (e) {
        console.log(`Fetch history error ${e}`);
      }
    };

    fetchHistory();
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);

    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();

    return `${day} / ${month} / ${year}`;
  };

  const formatTime = (dateString) => {
    const date = new Date(dateString);

    let hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    // const seconds = date.getSeconds().toString().padStart(2, "0");
    const ampm = date.getHours() >= 12 ? "PM" : "AM";

    return `${hours}:${minutes} ${ampm}`;
  };

  const handleDeleteHistory = async (meetingId) => {
    try {
      const token = localStorage.getItem("token");
      // const res = await fetch(
      //   `${process.env.REACT_APP_SERVER_URL}/api/v1/users/delete_activity/${meetingId}?token=${token}`,
      //   {
      //     method: "DELETE",
      //   }
      // );

      const res = await fetch(
        `https://meetsphere-4fdu.onrender.com/api/v1/users/delete_activity/${meetingId}?token=${token}`,
        {
          method: "DELETE",
        }
      );

      const data = await res.json();

      if (res.ok) {
        console.log("Meeting deleted successfully");
        setMeetings((prevMeetings) =>
          prevMeetings.filter((meeting) => meeting._id !== meetingId)
        );
      } else {
        console.log("Error deleteting meeting" || data.message);
      }
    } catch (e) {
      console.error("Delete error:", e);
    }
  };
  return (
    <>
      <div className="history-container ">
        <div className="history-nav">
          <IconButton onClick={() => routeTo("/home")}>
            <HomeIcon
              className="history-icons"
              style={{ color: "white", fontSize: "35px" }}
            />
          </IconButton>
        </div>

        {meetings.length > 0 ? (
          meetings.map((ele, id) => {
            return (
              <>
                <div key={id}>
                  <div className="history-content ">
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      Meeting Code : {ele.meetingCode}{" "}
                      <DeleteForeverIcon
                        className="history-icons"
                        onClick={() => handleDeleteHistory(ele._id)}
                      />
                    </div>
                    <div sx={{ color: "text-secondary", mb: 1 }}>
                      Date : {formatDate(ele.date)}
                    </div>
                    <div sx={{ color: "text-secondary", mb: 1.5 }}>
                      Time : {formatTime(ele.date)}
                    </div>
                  </div>
                </div>
              </>
            );
          })
        ) : (
          <p className="fallback-text">You'll find your history here</p>
        )}
      </div>
    </>
  );
}

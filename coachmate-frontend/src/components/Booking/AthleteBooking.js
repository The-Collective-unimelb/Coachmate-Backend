import { Link } from "react-router-dom";
import classes from "./AthleteBooking.module.css";
import axios from "axios";
import { useEffect, useState } from "react";

var baseUrl = process.env.BASE_URL || "http://localhost:5000";

if (
  process.env.NODE_ENV === "production" ||
  process.env.NODE_ENV === "staging"
) {
  baseUrl = "https://coachmate-2022.herokuapp.com";
}

function AthleteBooking() {
  const [users, setUsers] = useState([]);

  const getData = () => {
    axios
      .get(baseUrl + "/athlete/viewBookings", { withCredentials: true })
      .then((response) => {
        //console.log(response.data);
        return response.data;
      })
      .then((data) => {
        setUsers(data);
        console.log(data);
        console.log("Data has been received!!");
      })
      .catch(() => {
        alert("Error retrieving data!!");
      });
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className={classes["vertical-flex"]}>
      <h1>BOOKING HISTORY</h1>
      <div className={classes["history-header"]}>
        <div>DATE</div>
        <div>|</div>
        <div>TIME</div>
        <div>|</div>
        <div>COACH</div>
        <div>|</div>
        <div>LOCATION</div>
        <div>|</div>
        <div>TYPE</div>
        <div>|</div>
        <div>STATUS</div>
      </div>

      {users.map((data) => {
        return (
          <div className={classes["history-row"]}>
            <div>{data.sessionDate.slice(0, -12)}</div>
            <div>{data.sessionTime}</div>
            <div>{data.coachName}</div>
            <div>{data.location}</div>
            <div>{data.sessionType}</div>
            <div>{data.status}</div>
          </div>
        );
      })}
    </div>
  );
}

export default AthleteBooking;

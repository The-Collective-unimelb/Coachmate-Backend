import classes from "./EditProfile.module.css";
import pfp from "../../assets/pfp-blue.jpg";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import Button from "../UI/Button";

var baseUrl = process.env.BASE_URL || "http://localhost:5000";

if (
  process.env.NODE_ENV === "production" ||
  process.env.NODE_ENV === "staging"
) {
  baseUrl = "https://coachmate-2022.herokuapp.com";
}

function EditProfile() {
  const navigate = useNavigate();
  const [state, setState] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    gender: "Male",
    age: "",
    address: "",
    email: "",
    password: "",
    aboutMe: "",
    skills: "",
    qualifications: "",
    contactInfo: "",
    privatePrice: "",
    groupPrice: "",
  });
  useEffect(() => {
    axios
      .get(baseUrl + `/coaches/getDetails`, {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res);
        setState({
          firstName: res.data.firstName,
          lastName: res.data.lastName,
          phone: res.data.phone,
          gender: res.data.gender,
          age: res.data.age,
          address: res.data.address,
          email: res.data.email,
          password: "",
          aboutMe: res.data.aboutMe,
          skills: res.data.skills,
          qualifications: res.data.qualifications,
          contactInfo: res.data.contactInfo,
          privatePrice: res.data.privatePrice,
          groupPrice: res.data.groupPrice,
        });
        initState();
      })
      .catch((err) => {
        console.log(err);
        console.log("WTF");
      });
  }, []);

  const initState = () => {
    // change all undefined fields in state to empty string
    for (var field in state) {
      if (typeof field == "undefined") {
        setState((prevState) => ({ ...prevState, field: "" }));
      }
    }
    console.log(state);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = {
      firstName: state.firstName,
      lastName: state.lastName,
      phone: state.phone,
      gender: state.gender,
      age: state.age,
      address: state.address,
      email: state.email,
      password: state.password,
      aboutMe: state.aboutMe,
      skills: state.skills,
      qualifications: state.qualifications,
      contactInfo: state.contactInfo,
      privatePrice: state.privatePrice,
      groupPrice: state.groupPrice,
    };

    axios({
      url: baseUrl + "/coaches/update",
      method: "POST",
      data: payload,
    })
      .then((res) => {
        console.log("updated", res);
        Swal.fire({
          title: "Success!",
          text: "Your details have been sucessfully updated.",
          icon: "success",
          showCancelButton: true,
          confirmButtonText: "Back to home page",
          cancelButtonText: "Close",
        }).then((result) => {
          if (result.isConfirmed) {
            navigate("/");
          }
        });
      })
      .catch((e) => {
        console.log(e);
        alert("Error updating details! Try again");
      });
  };

  console.log(state);

  return (
    <div className={classes["vertical-flex"]}>
      <div className={classes.topbar}>
        <Link to="/coach-dashboard" className={classes["topbar-text"]}>
          DASHBOARD
        </Link>
        <div>&nbsp; {">"} &nbsp;</div>
        <Link to="#" className={classes["topbar-text"]}>
          EDIT PROFILE
        </Link>
      </div>
      <h1 className={classes["heading"]}>EDIT PROFILE</h1>
      <div className={classes["horizontal-flex"]}>
        <div className={classes["profile-pic-column"]}>
          <h2 className={classes["coach-name"]}>NAME</h2>
          <img
            src={pfp}
            className={classes["profile-pic"]}
            alt="profile pic"
          ></img>
          <h3 className={classes["edit-pfp"]}>EDIT PROFILE PHOTO</h3>
        </div>
        <div className={classes["input-column"]}>
          <label>FIRST NAME</label>
          <input
            className={classes["name"]}
            name="firstName"
            type="text"
            value={state.firstName}
            onChange={handleChange}
          />
          <label>LAST NAME</label>
          <input
            className={classes["name"]}
            name="lastName"
            type="text"
            value={state.lastName}
            onChange={handleChange}
          />
          <label>PASSWORD</label>
          <input
            className={classes["name"]}
            name="password"
            type="text"
            value={state.password}
            onChange={handleChange}
          />
          <label>EMAIL</label>
          <input
            className={classes["name"]}
            name="email"
            type="email"
            value={state.email}
            onChange={handleChange}
          />
          <label>PHONE NO.</label>
          <input
            className={classes["name"]}
            name="phone"
            type="text"
            value={state.phone}
            onChange={handleChange}
          />
          <label>GENDER</label>
          <br />
          <br />
          <select
            className={classes["name"]}
            name="gender"
            type="text"
            value={state.gender}
            onChange={handleChange}
          >
            <option value="Male">MALE</option>
            <option value="Female">FEMALE</option>
          </select>
          <br />
          <br />
          <label>AGE</label>
          <input
            className={classes["name"]}
            name="age"
            type="number"
            value={state.age}
            onChange={handleChange}
          />
          <label>ADDRESS</label>
          <input
            className={classes["name"]}
            name="address"
            type="text"
            value={state.address}
            onChange={handleChange}
          />
          <label>SOCIALS</label>
          <textarea
            className={classes["name"]}
            name="contactInfo"
            rows="3"
            cols="100"
            value={state.contactInfo}
            onChange={handleChange}
          />
          <label>ABOUT ME</label>
          <textarea
            className={classes["name"]}
            name="aboutMe"
            rows="10"
            cols="100"
            value={state.aboutMe}
            onChange={handleChange}
          />
          <label>SKILLS</label>
          <textarea
            className={classes["name"]}
            name="skills"
            rows="10"
            cols="100"
            value={state.skills}
            onChange={handleChange}
          />
          <label>QUALIFICATIONS</label>
          <textarea
            className={classes["name"]}
            name="qualifications"
            rows="10"
            cols="100"
            value={state.qualifications}
            onChange={handleChange}
          />
          <label>PRICE FOR PRIVATE SESSIONS</label>
          <input
            className={classes["name"]}
            name="privatePrice"
            type="number"
            value={state.privatePrice}
            onChange={handleChange}
          />
          <label>PRICE FOR GROUP SESSIONS</label>
          <input
            className={classes["name"]}
            name="groupPrice"
            type="number"
            value={state.groupPrice}
            onChange={handleChange}
          />
        </div>
      </div>
      <Button onClick={handleSubmit}>Save Changes</Button>
    </div>
  );
}

export default EditProfile;

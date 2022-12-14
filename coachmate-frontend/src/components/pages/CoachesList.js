import CoachCard from "../UI/CoachCard";
import axios from "axios";
import classes from "./CoachesList.module.css";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import CoachSearch from "../Coach/CoachSearch";
import CoachSearchFilter from "../Coach/CoachSearchFilter";

var baseUrl = process.env.BASE_URL || "http://localhost:5000";

if (
  process.env.NODE_ENV === "production" ||
  process.env.NODE_ENV === "staging"
) {
  baseUrl = "https://coachmate-2022.herokuapp.com";
}

const initialFilterFormData = {
  name: "",
  location: "",
  priceRange: [20, 100],
  sessionType: {
    private: true,
    group: true,
  },
};

function CoachesList() {
  const navigate = useNavigate();
  const location = useLocation();
  const [openFilter, setOpenFilter] = useState(false);
  const [searchVal, setSearchVal] = useState("");
  const [filterFormData, setFilterFormData] = useState(initialFilterFormData);
  const [users, setUsers] = useState([]);
  const [initialUsers, setInitialUsers] = useState([]);
  const [usersFetched, setUsersFetched] = useState(false);

  const getData = () => {
    axios
      .get(baseUrl + "/coaches", { withCredentials: true })
      .then((response) => {
        return response.data;
      })
      .then((data) => {
        if (!usersFetched) setInitialUsers(data);
        setUsers(data);

        setUsersFetched(true);
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

  useEffect(() => {
    if (
      location.state !== null &&
      location.state.searchLocation !== "" &&
      usersFetched
    ) {
      // Filter address from welcome page
      setUsers(
        users.filter((user) => {
          if (
            user.hasOwnProperty("address") &&
            user.address
              .toLowerCase()
              .includes(location.state.searchLocation.toLowerCase())
          ) {
            return true;
          }
          return false;
        })
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [usersFetched]);

  useEffect(() => {}, [searchVal]);

  const minDistance = 10;
  const maxPrice = 100;
  function handlePriceSlider(event, newValue, activeThumb) {
    if (!Array.isArray(newValue)) {
      return;
    }

    if (newValue[1] - newValue[0] < minDistance) {
      if (activeThumb === 0) {
        const clamped = Math.min(newValue[0], maxPrice - minDistance);
        setFilterFormData({
          ...filterFormData,
          priceRange: [clamped, clamped + minDistance],
        });
      } else {
        const clamped = Math.max(newValue[1], minDistance);
        setFilterFormData({
          ...filterFormData,
          priceRange: [clamped - minDistance, clamped],
        });
      }
    } else {
      setFilterFormData({
        ...filterFormData,
        priceRange: newValue,
      });
    }
  }

  function handleSearchVal(event) {
    if (openFilter) {
      if (event.target.id === "name") {
        setFilterFormData({
          ...filterFormData,
          name: event.target.value.trim(),
        });
      }
      if (event.target.id === "location") {
        setFilterFormData({
          ...filterFormData,
          location: event.target.value.trim(),
        });
      }
    } else {
      setSearchVal(event.target.value);
    }
  }

  function handleCheckbox(event) {
    if (event.target.id === "private") {
      setFilterFormData({
        ...filterFormData,
        sessionType: {
          ...filterFormData.sessionType,
          private: !filterFormData.sessionType.private,
        },
      });
    }
    if (event.target.id === "group") {
      setFilterFormData({
        ...filterFormData,
        sessionType: {
          ...filterFormData.sessionType,
          group: !filterFormData.sessionType.group,
        },
      });
    }
  }

  function handleOpenFilter() {
    setOpenFilter(!openFilter);
  }

  function handleFormSubmit(event) {
    event.preventDefault();

    setUsers(initialUsers);
    if (searchVal !== "") {
      setUsers(
        users.filter((user) => {
          if (
            user.address.toLowerCase().includes(searchVal.toLowerCase()) ||
            user.firstName.toLowerCase().includes(searchVal.toLowerCase()) ||
            user.lastName.toLowerCase().includes(searchVal.toLowerCase())
          ) {
            return true;
          }
          return false;
        })
      );
    }

    setSearchVal("");
    setFilterFormData(initialFilterFormData);
  }

  return (
    <div className={classes["coach-list"]}>
      <CoachSearch
        id={"search"}
        onButtonClick={handleOpenFilter}
        onSubmit={handleFormSubmit}
        onInput={handleSearchVal}
        value={searchVal}
      />
      {/* {openFilter && (
        <CoachSearchFilter
          sliderVal={filterFormData.priceRange}
          onSliderChange={handlePriceSlider}
          onButtonClick={handleOpenFilter}
          maxSliderVal={maxPrice}
          onSubmit={handleFormSubmit}
          onInput={handleSearchVal}
          onCheckboxChange={handleCheckbox}
        />
      )} */}
      <section className={classes["coach-cards"]}>
        {users.map((coach, index) => {
          return (
            <CoachCard
              key={index}
              name={coach.firstName}
              avail={coach.avail}
              location={coach.address}
              onClick={() => {
                navigate("/coach-profile", { state: { coach: coach } });
              }}
            />
          );
        })}
      </section>
    </div>
  );
}

export default CoachesList;

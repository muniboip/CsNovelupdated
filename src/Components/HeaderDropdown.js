import React, { useState } from "react";
import StarRatings from "react-star-ratings";
import CSGO from "../Assets/Images/Go.png";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../store/actions/actions";
import { baseUrl } from "../config";

function HeaderDropdown({ closeDropDown, logout, authReducer }) {
  const navigate = useNavigate();

  const options = [
    {
      id: 1,
      name: "my profile",
      link: "profile#1",
    },
    {
      id: 2,
      name: "subscription",
      link: "subscription",
    },
    {
      id: 3,
      name: "favorites",
      link: "profile#2",
    },
    {
      id: 4,
      name: "bookmarks",
      link: "profile#3",
    },
    {
      id: 5,
      name: "contact support",
      link: "",
    },
    {
      id: 6,
      name: "sign out",
      link: "",
    },
  ];
  return (
    <div className="header-dropdown" onMouseLeave={() => closeDropDown(false)}>
      <div className="dropdown-pointer" />
      {/* User Logged In Div  */}
      <div className="image-and-info-div">
        {authReducer?.userData?.profile_img ? (
          <img
            style={{
              width: "60px",
              height: "60px",
              borderRadius: 50,
            }}
            onClick={() => closeDropDown(false)}
            src={`${baseUrl}/public/${authReducer?.userData?.profile_img?.name}`}
          />
        ) : (
          <div
            className="user-acc-circle-dropdown"
            onClick={() => closeDropDown(false)}
          >
            <p className="user-acc-label-dropdown">
              {authReducer?.userData?.firstName?.substring(0, 1)}
            </p>
          </div>
        )}

        <div className="user-acc-info-div">
          <p className="username-dropdown">
            {authReducer?.userData?.username ||
              authReducer?.userData?.firstName}
          </p>
          <p className="user-email-dropdown">{authReducer?.userData?.email}</p>
          {authReducer?.userData?.subscription && (
            <div className="d-flex flex-row align-items-center">
              <StarRatings
                starDimension={"12"}
                rating={1}
                starRatedColor="orange"
                numberOfStars={1}
                name="rating"
              />
              <p className="user-acc-type-dropdown">CS PRO</p>
            </div>
          )}
        </div>
      </div>

      {/* CS+ Advertisment  */}
      {/* <div className="cs-plus-image-div">
        <img src={CSGO} />
      </div> */}

      {/* Drop Down Menu Items  */}
      {options.map((ele, idx) => {
        return (
          <p
            className="dropdown-options-label"
            onClick={() => {
              if (ele?.name === "sign out") {
                logout();
                navigate("/", { replace: true });
              } else if (ele?.link !== "") {
                navigate(`/${ele?.link}`, { replace: true });
              }
            }}
          >
            {ele.name}
          </p>
        );
      })}
    </div>
  );
}

const mapStateToProps = ({ authReducer }) => {
  return { authReducer };
};

export default connect(mapStateToProps, actions)(HeaderDropdown);

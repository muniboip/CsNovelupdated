import React, { useEffect, useState } from "react";
import Logo from "../Assets/Images/csnovels-logo.svg";
import CS from "../Assets/Images/cs.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {  faSortDown } from "@fortawesome/free-solid-svg-icons";
import HeaderSearch from "./HeaderSearch";
import HeaderDropdown from "./HeaderDropdown";
import { useNavigate } from "react-router-dom";
import { connect, useSelector } from "react-redux";
import SignInSignUpModal from "./SignInSignUpModal";
import AuthModal from "./AuthModal";
import ForgetPasswordModal from "./ForgetPasswordModal";
import profile from "../Assets/Images/dp-placeholder.jpg"
function Header({ authReducer }) {
  const [text, setText] = useState("");
  const [mode, setMode] = useState("login");
  useEffect(() => {

  }, [text])
  const [showDropdown, setShowDropdown] = useState("");
  const navigate = useNavigate();
  const isLogin = useSelector((state) => state?.authReducer?.isLogin);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showSignInSignUpModal, setShowSignInSignUpModal] = useState(false);
  const [showForgetPasswordModal, setShowForgetPasswordModal] = useState(false);

  return (
    <div className="my_prof_header">
      <div className="container-fluid header-bg">
        <div className="container">
          <div className="row header-items ">
            <div className="myitem col-md-3" onClick={() => navigate("/")}>
              <img src={Logo} className="header-logo" alt="header-logo" />
              <img src={CS} className="small-logo" alt="small-logo" />
            </div>

            <div className="myitem col-md-3 mt-2">
              <div className="cat-label">
                <svg
                  className="svg-inline-header-cat-icon"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24px 24px"
                >
                  <path
                    className="st0"
                    d="M3,0h4.2c1.7,0,3.1,1.5,3.1,3.1v4.2c0,1.7-1.5,3.1-3.1,3.1H3c-1.6,0.1-3.1-1.2-3.1-2.9V3.1C-0.1,1.5,1.4,0,3,0 z"
                  />
                  <path
                    className="st0"
                    d="M16.7,0h4.2c1.7,0,3.2,1.5,3.2,3.1v4.2c0,1.7-1.5,3.1-3.1,3.1h-4.2c-1.7,0-3.1-1.5-3.1-3.1V3.1 C13.6,1.5,14.9,0,16.7,0z"
                  />
                  <path
                    className="st0"
                    d="M3,13.7h4.2c1.7,0,3.1,1.5,3.1,3.1v4.2c0,1.7-1.5,3.1-3.1,3.1H3c-1.6,0.1-3.1-1.3-3.1-2.9v-4.2 C-0.1,15,1.4,13.7,3,13.7z"
                  />
                  <path
                    className="st0"
                    d="M16.7,13.7h4.2c1.7,0,3.1,1.5,3.1,3.1v4.2c0,1.7-1.5,3.1-3.1,3.1h-4.2c-1.7,0-3.1-1.5-3.1-3.1v-4.2 C13.6,15,14.9,13.7,16.7,13.7z"
                  />
                </svg>

                <h5
                  className="cat-label-text"
                  type="button"
                  id="dropdownMenuButton"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  {" "}
                  Categories{" "}
                </h5>
                <FontAwesomeIcon className="mb-1" icon={faSortDown} />
                <div
                  className="category dropdown-menu"
                  aria-labelledby="dropdownMenuButton"
                >
                  <a
                    className="dropdown-item"
                    
                    onClick={(e) => {
                      e.preventDefault();
                      navigate("/search", { state: { genre: "urban" } });
                    }}
                  >
                    Urban
                  </a>
                  <a
                    className="dropdown-item"
                    
                    onClick={(e) => {
                      e.preventDefault();
                      navigate("/search", { state: { genre: "eastern" } });
                    }}
                  >
                    Eastern
                  </a>
                  <a
                    className="dropdown-item"
                    
                    onClick={(e) => {
                      e.preventDefault();
                      navigate("/search", { state: { genre: "sci-fi" } });
                    }}
                  >
                    Sci-Fi
                  </a>
                  <a
                    className="dropdown-item"
                    
                    onClick={(e) => {
                      e.preventDefault();
                      navigate("/search", { state: { genre: "all" } });
                    }}
                  >
                    View All
                  </a>
                </div>
              </div>
            </div>
            <div className="myitem col-md-4">
              <HeaderSearch setText={setText} text={text} />
            </div>
            {isLogin ? (
              <div className="myitem col-md-2 comunity-and-user-icon">
                <a
                  href="https://discord.gg/HwMzcdJ"
                  
                  className="community-link"
                >
                  community
                </a>
                <div
            className="user-acc-circle-dropdown"
            onClick={() => setShowDropdown(true)}

          >
            <p className="user-acc-label-dropdown">
              {authReducer?.userData?.firstName?.substring(0, 1)}
            </p>
          </div>
                {/* {authReducer?.userData?.profilePic ? (
          <img
            style={{
              width: "60px",
              height: "60px",
              borderRadius: 50,
            }}
            alt="user-dp"
            onClick={() => closeDropDown(false)}
            src={`${authReducer?.userData?.profilePic.url ? authReducer?.userData?.profilePic.url : profile}`}


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
                <img
                  style={{
                    width: "45px",
                    height: "45px",
                    borderRadius: 50,
                  }}
                  alt="user-dp"
                  onClick={() => setShowDropdown(true)}
                  src={`${authReducer?.userData?.profilePic.url ? authReducer?.userData?.profilePic.url : profile}`}
                /> */}
                {/* {authReducer?.userData?.profile_img!=null ? (
                ) : (
                  <div
                    className="user-acc-circle"
                    onClick={() => {
                      
                      setShowDropdown(true)}}
                  >
                    <p className="user-acc-label">
                      
                      
                    </p>
                  </div>
                )} */}
                {showDropdown && (
                  <HeaderDropdown closeDropDown={setShowDropdown} />
                )}
              </div>
            ) : (
              <button
                className="header-sign-in-btn"
                onClick={() => setShowAuthModal(true)}
              >
                SIGN IN
              </button>
            )}
            <div className="col-sm-12 col-12 tabs-header">
              <ul className="nav nav-pills nav-fill">
                <li className="nav-item">
                  <a className="nav-link" href="/#">
                    Categories
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/#" >
                    Ongoing
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/#" >
                    Finished
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/#">New</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      {showSignInSignUpModal && (
        <SignInSignUpModal
          mode={mode}
          setMode={setMode}
          isVisibleModal={showSignInSignUpModal}
          setShowForgetPasswordModal={setShowForgetPasswordModal}
          setIsVisibleModal={setShowSignInSignUpModal}
          setIsVisibleAuthModal={setShowAuthModal}
        />
      )}

      {showAuthModal && (
        <AuthModal
          isVisibleModal={showAuthModal}
          setIsVisibleModal={setShowAuthModal}
          setIsVisibleSignInSignUpModal={setShowSignInSignUpModal}
          setMode={setMode}
        />
      )}

      {showForgetPasswordModal && (
        <ForgetPasswordModal
          isVisibleModal={showForgetPasswordModal}
          setIsVisibleModal={setShowForgetPasswordModal}
        />
      )}
    </div>
  );
}

const mapStateToProps = ({ authReducer }) => {
  return { authReducer };
};

export default connect(mapStateToProps, null)(Header);

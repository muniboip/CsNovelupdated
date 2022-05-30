import moment from "moment";
import React, { useEffect, useRef } from "react";
import { useState } from "react";
import USER_IMG from "../../Assets/Images/dp-placeholder.jpg";
import FavoritesComp from "../../Components/FavoritesComp";
import BookmarksComp from "../../Components/BookmarksComp";
import BOOK_CARD from "../../Assets/Images/book-card.png";
import CS_PRO from "../../Assets/Images/cs-pro.png";
import CS_PLUS from "../../Assets/Images/cs-plus.png";
import Footer from "../../Components/Footer";
import Header from "../../Components/Header";
import FreeBookComp from "../../Components/FreeBookComp";
import MostWantedNovelsMapper from "../../Components/MostWantedNovelsMapper";

import BillingComponent from "./BillingComponent";
import * as actions from "../../store/actions/actions";
import { connect } from "react-redux";
import { toast } from "react-toastify";


import { useNavigate } from "react-router-dom";
import lock from "../../Assets/lock2.PNG";
function ProfilePage({
  favoriteThisBook,
  getFavoriteBooks,
  authReducer,
  booksReducer,
  uploadImage,
  profileChanges,
  updatePassword,
  updateFeatures,
  getBookmarks,
}) {
  const [headerSelection, setHeaderSelection] = useState(
    window.location.href.split("/#")[1]
  );
  const [isLoading, setIsLoading] = useState(false);
  const accessToken = authReducer?.accessToken;
  const [favoriteBooks, setFavoriteBooks] = useState([
    booksReducer.favoritedBooks,
  ]);
  const imageRef = useRef();
  var navigate = useNavigate();

  // Edit Profile States
  const [email, setEmail] = useState("");
  const DISPLAY_USER_IMAGE = authReducer?.userData?.profilePic?.url;
  const [username, setUsername] = useState(authReducer?.userData?.username);
  const [lastName, setLastName] = useState(authReducer?.userData?.lastName);
  const [firstName, setFirstName] = useState(authReducer?.userData?.firstName);
  const [changePassword, setChangePassword] = useState("");
  const [isSavingProfileChanges, setIsSavingProfileChanges] = useState(false);

  //Change Password
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isSavingPasswordChanges, setIsSavingPasswordChanges] = useState(false);

  // Account Features States
  const [onsiteAds, setOnsiteAds] = useState(
    authReducer?.userData?.feature?.ads
  );
  const [readingStyle, setReadingStyle] = useState(
    authReducer?.userData?.feature?.readingStyle
  );
  const [betaChapters, setBetaChapters] = useState(
    authReducer?.userData?.feature?.betaChapter
  );
  const [emailNotifications, setEmailNotifications] = useState(
    authReducer?.userData?.feature?.emailNotification
  );
  const [isSavingFeaturesChanges, setIsSavingFeaturesChanges] = useState(false);

  //Subscription States
  const [toggleAutomaticRenewel, setToggleAutomaticRenewel] = useState(false);

  // Edit Profile Save Button
  const _onPressSaveChangesEditProfile = () => {
    const data = {
      username: username,
      lastName: lastName,
      firstName: firstName,
    };
    setIsSavingProfileChanges(true);
    profileChanges(data, accessToken).then(() => {
      setIsSavingProfileChanges(false);
    });
  };

  const _onPressSaveChangesChangePassword = () => {
    if (
      oldPassword.length === 0 ||
      newPassword.length === 0 ||
      confirmPassword.length === 0
    ) {
      toast.info("One of Change Password fields left empty.");
    } else if (newPassword?.length < 8 || confirmPassword?.length < 8) {
      toast.info("Password should be more than 8 characters.");
    } else if (newPassword !== confirmPassword) {
      toast.info("Passwords Mismatch!");
    } else {
      const data = {
        oldPassword: oldPassword,
        newPassword: newPassword,
        confirmPassword: confirmPassword,
      };
      setIsSavingPasswordChanges(true);
      updatePassword(data, accessToken).then(() => {
        setIsSavingPasswordChanges(false);
      });
    }
  };

  // Edit Profile Account Button
  const _onPressSaveChangesAccountFeatures = () => {
    const data = {
      ads: onsiteAds,
      betaChapter: betaChapters,
      emailNotification: emailNotifications,
      readingStyle: readingStyle,
    };
    setIsSavingFeaturesChanges(true);
    updateFeatures(data, accessToken).then(() => {
      setIsSavingFeaturesChanges(false);
    });
  };

  const favoriteBookHandler = (_id) => {
    const data = {
      bookId: _id,
    };

    favoriteThisBook(data, accessToken, "favoritedBooks");
  };

  useEffect(() => {
    setIsLoading(true);

    getFavoriteBooks(accessToken).then(() => {
      getBookmarks(accessToken);
      setIsLoading(false);
    });
  }, []);

  useEffect(() => {
    setFavoriteBooks(booksReducer?.favoritedBooks);
  }, [booksReducer?.favoritedBooks]);

  const handleImageUpload = (e) => {
    const IMAGE = e.target.files[0];
    const IMAGE_NAME = e.target.files[0].name;
    const EXTENSION = IMAGE_NAME.replace(/^.*\./, "");
    const IMAGE_SIZE = IMAGE.size;
    const FIXED_UPLOAD_SIZE = 2097152;

    if (EXTENSION !== "jpg" && EXTENSION !== "png" && EXTENSION !== "jpeg") {
      toast.error("Only JPG, JPEG & PNG files allowed.");
    } else if (IMAGE_SIZE > FIXED_UPLOAD_SIZE) {
      toast.error("Images can't be more than 2MBs");
    } else {
      const formData = new FormData();
      formData.append("profileImage", IMAGE);
      uploadImage(formData, accessToken);
    }
  };

  useEffect(() => {
    setHeaderSelection(parseInt(window.location.href.split("/#")[1]));
  }, [window.location.href]);

  return (
    <div>
      <Header />
      <div className="header my_profile_header">
        <div className="container">
          <div className="row">
            <div className="col-lg-8">
              <div className="user-record">
                <img
                  src={
                    DISPLAY_USER_IMAGE
                      ? `${authReducer?.userData?.profilePic?.url}`
                      : USER_IMG
                  }
                  alt="user-image"
                  className="prof-img"
                />
                {/* <div
                  onClick={() => imageRef.current.click()}
                  className="choose-image-div"
                >
                  <i className="fas fa-camera"></i>
                  <input
                    type={"file"}
                    hidden={true}
                    ref={imageRef}
                    onChange={(e) => {
                      handleImageUpload(e);
                    }}
                  />
                </div> */}
                <div className="user-edit">
                  <h3>
                    {authReducer?.userData?.username}{" "}
                    <span className="HEADING">{`${firstName} ${lastName}`}</span>
                  </h3>
                  <div className="email-record">
                    <h6>{authReducer?.userData?.email}</h6>
                    <p>{`ID: ${authReducer?.userData?._id?.substring(
                      0,
                      5
                    )}`}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4 mt-auto text-right">
              <div className="cs-pro">
                {authReducer?.userData?.subscription && (
                  <span className="span-star">
                    <i className="fas fa-star"></i> CS-PRO
                  </span>
                )}
                <p>{`MEMBER SINCE ${moment(
                  authReducer?.userData?.createdAt
                ).format("MM/DD/YYYY")}`}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <AdSense.Google
        client="ca-pub-7292810486004926"
        slot="7806394673"
        style={{ width: 500, height: 300, float: "left", backgroundColor:'red' }}
        format=""
      /> */}
      <div className="container">
        <ul className="navbar-nav ml-auto header-bar my_prof_nav">
          <li className="nav-item ">
            <a
              className={`nav-link hover-effect ${
                headerSelection === 1 && "active"
              }`}
              href="#1"
            >
              Dashboard
            </a>
          </li>
          <li className="nav-item">
            <a
              className={`nav-link hover-effect ${
                headerSelection === 2 && "active"
              }`}
              href="#2"
            >
              Favorites
            </a>
          </li>
          <li className="nav-item">
            <a
              className={`nav-link hover-effect ${
                headerSelection === 3 && "active"
              }`}
              href="#3"
            >
              Bookmarks
            </a>
          </li>
          <li className="nav-item">
            <a
              className={`nav-link hover-effect ${
                headerSelection === 4 && "active"
              }`}
              href="#4"
            >
              Billing
            </a>
          </li>
          <li className="nav-item">
            <a
              className={`nav-link hover-effect ${
                headerSelection === 5 && "active"
              }`}
              href="#5"
            >
              Settings
            </a>
          </li>
        </ul>
        <div className="my_prof_div">
          {headerSelection === 1 && (
            <>
              <FreeBookComp />
              <div className="package-info-div">
                <img src={CS_PRO} style={{ marginRight: "50px" }} />
                <img src={CS_PLUS} />
              </div>
              <FavoritesComp
                title="RECENTLY READ"
                accessToken={authReducer.accessToken}
              />
              <div className="section-div most_popular">
                <div className="mp-books-header">
                  <p className="mp-books-header-title">LAST FAVORITED</p>
                </div>

                <div className="row center-most-popular-in-mobile spacing-adjust">
                  {favoriteBooks?.map((item, idx) => (
                    <MostWantedNovelsMapper
                      key={idx}
                      item={item}
                      favoriteBookHandler={favoriteBookHandler}
                    />
                  ))}
                </div>
              </div>
            </>
          )}

          {headerSelection === 2 &&
            (favoriteBooks?.length > 0 ? (
              <FavoritesComp
                books={favoriteBooks}
                favoriteBookHandler={favoriteBookHandler}
              />
            ) : (
              <div className="m-5">
                <h2>No Favorites</h2>
              </div>
            ))}

          {headerSelection === 3 && <BookmarksComp />}

          {headerSelection === 4 && <BillingComponent />}

          {headerSelection === 5 && (
            <>
              <div className="my_edit_component sec-1">
                <h1>Edit Profile</h1>

                <div className="profile-edit">
                  <form action="">
                    <div className="row profile-sec">
                      <div className="col-lg-3 my-auto">
                        <div className="profile">
                          <h6>FULL NAME</h6>
                        </div>
                      </div>
                      <div className="col-lg-4">
                        <div className="profile">
                          <input
                            type="text"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            placeholder="First Name"
                          />
                        </div>
                      </div>

                      <div className="col-lg-4">
                        <div className="profile">
                          <input
                            type="text"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            placeholder="Last Name"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="row profile-sec">
                      <div className="col-lg-3 my-auto">
                        <div className="profile ">
                          <h6>USER NAME</h6>
                        </div>
                      </div>
                      <div className="col-lg-6">
                        <div className="profile input-icon">
                          <span className="input-font">
                            <i className="fas fa-user"></i>
                          </span>
                          <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="Username"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="row profile-sec">
                      <div className="col-lg-3 my-auto">
                        <div className="profile">
                          <h6>EMAIL ADDRESS</h6>
                        </div>
                      </div>
                      <div className="col-lg-6">
                        <div className="profile input-icon">
                          <span className="input-font">
                            <i className="fas fa-envelope"></i>
                          </span>
                          <input
                            disabled={true}
                            type="email"
                            value={authReducer?.userData?.email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Email"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-lg-12">
                        <div className="profile-button">
                          <button
                            disabled={isSavingProfileChanges}
                            onClick={() => _onPressSaveChangesEditProfile()()}
                          >
                            {isSavingProfileChanges
                              ? "Please Wait"
                              : "Save Changes"}
                          </button>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>

              <div className="my_ac_feat_component sec-2">
                <h1>Accounts Features </h1>

                <div className="accounts-features">
                  <div className="row feature-border">
                    <div className="col-lg-3">
                      <div className="feature">
                        <h6>READING STYLE</h6>
                      </div>
                    </div>
                    <div className="col-lg-8">
                      <div className="feature">
                        {authReducer.userData.package.product.name === "CS+" ||
                        authReducer.userData.package.product.name ==
                          "CS Pro" ? (
                          <>
                            <div className="check-lable">
                              <input
                                type="checkbox"
                                id="check-1"
                                checked={readingStyle}
                                onChange={() => setReadingStyle(!readingStyle)}
                              />
                              <span className="lock">
                                <i className="fas fa-lock-alt"></i>
                              </span>
                              <label for="check-1">
                                <div className="my_chk">
                                  <span></span>
                                </div>
                                <div>Enable infinite scroll on book pages</div>
                              </label>
                            </div>

                            <p>
                              Checking this box will enable an infinite scroll
                              reading experience <br />
                              YOU MUST BE A CS PLUS MEMBER TO ENABLE THIS
                              FEATURE{" "}
                            </p>
                          </>
                        ) : (
                          <div className="check-lable">
                            <img src={lock} />

                            <div className="enabletxt">
                              <p
                                style={{
                                  "font-size": "30px",
                                  "margin-left": "10px",
                                }}
                              >
                                <b>Enable infinite scroll on book pages</b>
                              </p>
                              <p
                                style={{
                                  "font-size": "28px",
                                  "margin-left": "10px",
                                  "margin-top": "5px",
                                }}
                              >
                                This will enable an infinite scroll reading
                                experience.
                              </p>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="row feature-border">
                    <div className="col-lg-3">
                      <div className="feature">
                        <h6>ONSITE ADS</h6>
                      </div>
                    </div>

                    <div className="col-lg-8">
                      <div className="feature">
                        {authReducer.userData.package.product.name === "CS+" ||
                        authReducer.userData.package.product.name ==
                          "CS Pro" ? (
                          <>
                            <div className="check-lable">
                              <input
                                type="checkbox"
                                id="check-2"
                                checked={onsiteAds}
                                onChange={() => setOnsiteAds(!onsiteAds)}
                              />
                              <span className="lock">
                                <i className="fas fa-lock-alt"></i>
                              </span>
                              <label for="check-2">
                                <div className="my_chk">
                                  <span></span>
                                </div>
                                <div>Enable ad free reading experience</div>
                              </label>
                            </div>

                            <p>
                              Checking this box will all ads from the website
                              for you <br />
                              YOU MUST BE A CS PLUS MEMBER TO ENABLE THIS
                              FEATURE
                            </p>
                          </>
                        ) : (
                          <div className="check-lable">
                            <img src={lock} />

                            <div className="enabletxt">
                              <p
                                style={{
                                  "font-size": "30px",
                                  "margin-left": "10px",
                                }}
                              >
                                <b>Enable ad free reading experience</b>
                              </p>
                              <p
                                style={{
                                  "font-size": "28px",
                                  "margin-left": "10px",
                                  "margin-top": "5px",
                                }}
                              >
                                Enabling this will diable all ads on the the
                                website for you
                              </p>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="row feature-border">
                    <div className="col-lg-3">
                      <div className="feature">
                        <h6> BETA CHAPTERS</h6>
                      </div>
                    </div>

                    <div className="col-lg-8">
                      <div className="feature">
                        {authReducer.userData.package.product.name === "CS+" ||
                        authReducer.userData.package.product.name ==
                          "CS Pro" ? (
                          <>
                            <div className="check-lable">
                              <input
                                type="checkbox"
                                id="check-3"
                                checked={betaChapters}
                                onChange={() => setBetaChapters(!betaChapters)}
                              />
                              <span className="lock">
                                <i className="fas fa-lock-alt"></i>
                              </span>
                              <label for="check-3">
                                <div className="my_chk">
                                  <span></span>
                                </div>
                                <div>
                                  Enable ad free reading experience Enable beta
                                  chapters for books
                                </div>
                              </label>
                            </div>

                            <p>
                              Checking this box will allow you to see
                              beta/stockpiled chapters that are in the works
                              <br />
                              YOU MUST BE A CS PLUS MEMBER TO ENABLE THIS
                              FEATURE{" "}
                            </p>
                          </>
                        ) : (
                          <div className="check-lable">
                            <img src={lock} />

                            <div className="enabletxt">
                              <p
                                style={{
                                  "font-size": "30px",
                                  "margin-left": "10px",
                                }}
                              >
                                <b>Enable beta chapters for books</b>
                              </p>
                              <p
                                style={{
                                  "font-size": "28px",
                                  "margin-left": "10px",
                                  "margin-top": "5px",
                                }}
                              >
                                Checking this box will allow you to see
                                beta/stockpiled chapters that are in the
                                upcoming or in the edit process.
                              </p>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="row feature-border">
                    <div className="col-lg-3">
                      <div className="feature">
                        <h6>EMAIL NOTIFICATIONS</h6>
                      </div>
                    </div>

                    <div className="col-lg-8 check-col">
                      <div className="feature">
                        <div className="check-lable">
                          <input
                            type="checkbox"
                            id="check-4"
                            checked={emailNotifications}
                            onChange={() =>
                              setEmailNotifications(!emailNotifications)
                            }
                          />
                          <span className="lock">
                            <i className="fas fa-lock-alt"></i>
                          </span>
                          <label for="check-4">
                            <div className="my_chk">
                              <span></span>
                            </div>
                            <div>
                              Enable email notifications for new chapters
                            </div>
                          </label>
                        </div>

                        <p>
                          Checking this box will send you emails when new
                          chapters are released on your favorites list{" "}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-lg-12 button-feature">
                    <div className="profile-button">
                      <button
                        disabled={isSavingFeaturesChanges}
                        onClick={() => _onPressSaveChangesAccountFeatures()}
                      >
                        Save Changes
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="change_pass_component sec-3 mb-5">
                <h1>Change Password</h1>
                <div className="change-password">
                  <div className="row profile-sec">
                    <div className="col-lg-3 my-auto">
                      <div className="profile">
                        <h6>OLD PASSWORD</h6>
                      </div>
                    </div>
                    <div className="col-lg-6">
                      <div className="profile input-icon">
                        <span className="input-font">
                          <i className="fas fa-lock"></i>
                        </span>
                        <input
                          type="password"
                          value={oldPassword}
                          onChange={(e) => setOldPassword(e.target.value)}
                          placeholder="Enter old password"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="row profile-sec">
                    <div className="col-lg-3 my-auto">
                      <div className="profile">
                        <h6>NEW PASSWORD</h6>
                      </div>
                    </div>
                    <div className="col-lg-6">
                      <div className="profile input-icon">
                        <span className="input-font">
                          <i className="fas fa-lock"></i>
                        </span>
                        <input
                          type="password"
                          placeholder="Enter new password"
                          value={newPassword}
                          onChange={(e) => setNewPassword(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="row profile-sec">
                    <div className="col-lg-3 my-auto">
                      <div className="profile">
                        <h6>CONFIRM PASSWORD</h6>
                      </div>
                    </div>
                    <div className="col-lg-6">
                      <div className="profile input-icon">
                        <span className="input-font">
                          <i className="fas fa-lock"></i>
                        </span>
                        <input
                          type="password"
                          placeholder="Enter confirm password"
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-lg-12">
                      <div className="profile-button">
                        <button
                          disabled={isSavingPasswordChanges}
                          onClick={() => _onPressSaveChangesChangePassword()}
                        >
                          {isSavingPasswordChanges
                            ? "Please Wait"
                            : "Save Changes"}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}

const mapStateToProps = ({ booksReducer, authReducer }) => {
  return { booksReducer, authReducer };
};

export default connect(mapStateToProps, actions)(ProfilePage);

const dummyHistoryData = [
  {
    id: 1456,
    amount: 9,
    status: "paid",
    date: new Date(),
  },
  {
    id: 1456,
    amount: 9,
    status: "paid",
    date: new Date(),
  },
  {
    id: 1456,
    amount: 10,
    status: "paid",
    date: new Date(),
  },
];

let favorites = [
  {
    _id: 1,
    status: "completed",
    heading: "great marshal",
    title:
      "Book Title Goes Here On Two Lines Even Test Test Test Test Test Test Test",
    category: "urban",
    chapters: 3471,
    image: BOOK_CARD,
    description:
      "Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placeholder before final copy is available  Lorem ipsum may be used as a placeholder before final copy is available..",
  },
  {
    _id: 2,
    heading: "great marshal",
    status: "completed",
    title:
      "Book Title Goes Here On Two Lines Even Test Test Test Test Test Test Test",
    category: "urban",
    chapters: 3471,
    image: BOOK_CARD,
    description:
      "Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placeholder before final copy is available  Lorem ipsum may be used as a placeholder before final copy is available..",
  },
  {
    _id: 3,
    heading: "great marshal",
    status: "completed",
    title:
      "Book Title Goes Here On Two Lines Even Test Test Test Test Test Test Test",
    category: "urban",
    chapters: 3471,
    image: BOOK_CARD,
    description:
      "Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placeholder before final copy is available  Lorem ipsum may be used as a placeholder before final copy is available..",
  },
];

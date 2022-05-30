import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  getpackage,
  Cancelsubs,
  Canceltimesubs,
  getpackagehistory,
} from "../../store/actions/actions";
import * as types from "../../store/actions/actionType";
import * as actions from "../../store/actions/actions";
import { connect, useDispatch } from "react-redux";
import { Modal } from "react-bootstrap";
import { toast } from "react-toastify";
// import { PaymentRequestButtonElement } from "@stripe/react-stripe-js";
import { BsDownload } from "react-icons/bs";
import { Switch, FormControlLabel, FormGroup } from "@mui/material";

const BillingComponent = ({ authReducer }) => {
  const [packages, setpackages] = useState([]);
  const [isopen, setisopen] = useState(false);
  const [immediate, setimmediate] = useState(false);
  const [isload, setisload] = useState(true);
  const [date, setdate] = useState("");
  const [histor, sethistor] = useState([]);
  var navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(async () => {
    if (!authReducer.isLogin) {
      navigate("/");
    }

    const data = await getpackage();

    data.map((item) => {
      if (item?._id == authReducer?.userData?.package?.product?._id) {
        setpackages(item);
        Object.assign(packages, authReducer?.userData?.package);
      }
    });

    sethistor(await getpackagehistory(authReducer.accessToken));
  }, []);

  const openModal = () => {
    setisopen(true);
  };

  useEffect(() => {
    if (authReducer?.userData?.package?.interval === "one-time") {
      setimmediate(true);
    } else {
      setimmediate(false);
    }
  }, [authReducer?.userData?.package?.interval]);

  const closeModal = () => {
    setisopen(false);
  };

  const packagecancel = async () => {
    
    var response;
    if (immediate) {
    
      response = await Cancelsubs(authReducer.accessToken);

      dispatch({
        type: types.SUBSCRIPTION,
        payload: null,
      });
    } else {
    
      response = await Canceltimesubs(authReducer.accessToken);
    }

    if (response.success) {
      toast.success(response?.msg || "Subscription Cancelled");

      sethistor(await getpackagehistory(authReducer.accessToken));
    } else {
      toast.error("Something went wrong!");
    }
    closeModal();
    setisload(!isload);

    
    // var response;
    // if (immediate) {
    //   response = await Cancelsubs(authReducer.accessToken);
    // } else {
    //   response = await Canceltimesubs(authReducer.accessToken);
    // }
    
    // if (!response.success) {
    
    //   dispatch({
    //     type: types.SUBSCRIPTION,
    //     payload: null,
    //   });
    //   toast.success(response?.data?.msg);
    // } else {
    //   dispatch({
    //     type: types.SUBSCRIPTION,
    //     payload: null,
    //   });

    //   toast.error(response.data.msg);
    // }
  };

  

  return (
    <>
      <div className="container">
        <div className="sec-3">
          <h1>Subscription</h1>
          {authReducer.userData.package ? (
            <div className="subscription">
              <div className="row feature-border">
                <div className="col-lg-8 my_subs_div_1">
                  <div className="col-lg-4">
                    <div className="sub-method">
                      <h6>YOUR CURRENT PLAN</h6>
                    </div>
                  </div>
                  <div className="col-lg-8">
                    <div className="sub-method">
                      <p>
                        {" "}
                        {packages?.name} , ${authReducer?.userData?.package?.amount} per month
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-lg-4 my_subs_div_2">
                  <div className="col-lg-12">
                    <div className="sub-method">
                      <button
                        type="button"
                        className="btn us-active-btn cancelbtn"
                        onClick={() => {
                          navigate("/subscription");
                        }}
                      >
                        Change plan
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row feature-border">
                <div className="col-lg-8 my_subs_div_1">
                  <div className="col-lg-4">
                    <div className="sub-method">
                      <h6>BILLING CYCLE</h6>
                    </div>
                  </div>
                  <div className="col-lg-8">
                    <div className="sub-method">
                      <p>
                        {/* your will be charge ${packages.amount} on {date} */}
                        {authReducer?.userData?.package?.interval ||
                          "Not Found"}
                      </p>
                      {/* <div className="sub-check">
                      <input type="checkbox" id="check-5" />{" "}
                      <label for="check-5">Enable automatic renewel</label>
                    </div> */}
                    </div>
                  </div>
                </div>
                <div className="col-lg-4 my_subs_div_2">
                  <div className="col-lg-12">
                    <div className="sub-method"></div>
                  </div>
                </div>
              </div>
              <div className="row feature-border">
                <div className="col-lg-8 my_subs_div_1">
                  <div className="col-lg-6">
                    <div className="sub-method">
                      <h6>PAYMENT INFORMATION</h6>
                    </div>
                  </div>
                  <div className="col-lg-2">
                    <div className="sub-method">
                      <p>Card</p>
                    </div>
                  </div>
                </div>
                <div className="col-lg-4 my_subs_div_2">
                  <div className="col-lg-12">
                    {/* <div className="sub-method">
                    <h5>Change Method</h5>
                  </div> */}
                  </div>
                </div>
              </div>
              <div className="row feature-border">
                <div className="col-lg-8 my_subs_div_1">
                  <div className="col-lg-4">
                    <div className="sub-method">
                      <h6>CANCEL</h6>
                    </div>
                  </div>
                  <div className="col-lg-8">
                    {/* <div className="sub-method">
                      <p>Cancel at the ending of billing period</p>
                    </div> */}

                    {authReducer?.userData?.package?.interval !== "one-time" ? (
                      <div
                        className="sub-check"
                        style={{ "margin-bottom": "10px" }}
                      >
                        <FormGroup>
                          <FormControlLabel
                            control={
                              <Switch
                                checked={immediate}
                                onChange={() => setimmediate(!immediate)}
                              />
                            }
                            label={
                              immediate
                                ? "Immediate cancel"
                                : "Cancel at the end of billing period"
                            }
                          />
                        </FormGroup>
                      </div>
                    ) : null}
                  </div>
                </div>
                <div className="col-lg-4 my_subs_div_2">
                  <div className="col-lg-12">
                    <div className="sub-method">
                      <button
                        type="button"
                        className="btn us-active-btn cancelbtn"
                        onClick={() => openModal()}
                      >
                        Cancel Subscription
                      </button>
                      <h5>
                        <a href=""> </a>
                      </h5>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="subscription">
              <h1>No Any package Subscribe</h1>
              <p>
                click <Link to="/subscription">here</Link> for subcription
              </p>
            </div>
          )}
        </div>
      </div>
      <div className="container">
        <div className="sec-4">
          <h1>History</h1>
          <div className="history">
            <table className="history-edit">
              <tr className="head-edit">
                <th>INVOICE</th>
                <th>AMOUNT</th>
                <th>STATUS</th>
                <th>START</th>
                <th>END</th>
              </tr>
              <tbody>
                {histor?.map((item) => {
                  return (
                    <tr key={item._id}>
                      <td>
                        <a href={item?.invoice} target="_blank">
                          <button type="button" className="btn  invoicebtn">
                            <BsDownload
                              style={{
                                width: "40px !important",
                                height: "10px !important",
                              }}
                            />
                          </button>
                        </a>
                      </td>
                      <td>{item?.amount} $</td>
                      <td>
                        {item.status != "pending"
                          ? item?.active
                            ? "Current"
                            : "Completed"
                          : "Pinding"}
                      </td>
                      <td>
                        {item.status != "pending"
                          ? item?.start?.split("T")[0]
                          : null}
                      </td>
                      <td>
                        {item.status != "pending"
                          ? item?.end?.split("T")[0]
                          : null}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <Modal show={isopen} onHide={() => closeModal()} className="Modal">
        <Modal.Header className="modal-header canceltext">
          <Modal.Title className="modal-title ">
            Are you sure to cancel Subscription
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row col-row">
            {/* <p>{packages.interval == "monthly" ? "You cannot subscribe any package until the time of previous subscription in ended":"abc"}</p> */}
          </div>
          <div className="row col-row">
            <div className="col-lg-3 px-3"></div>
            <div className="col-lg-6  subcancelbtn">
              <button
                type="button"
                className="btn us-active-btn cancel"
                onClick={(e) => {
                  packagecancel();
                }}
              >
                Yes
              </button>
              <button
                type="button"
                className="btn us-active-btn cancel"
                onClick={(e) => {
                  closeModal();
                }}
              >
                No
              </button>
            </div>

            <div className="col-lg-3 px-3"></div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

const mapstatetoprops = ({ authReducer, booksReducer, libraryReducer }) => {
  return { authReducer, booksReducer, libraryReducer };
};
export default connect(mapstatetoprops, actions)(BillingComponent);

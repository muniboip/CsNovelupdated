import React, { cloneElement, useEffect, useState, useRef } from "react";
import "../Styles/ReadbookPage.css";
import Header from "../Components/Header";
import Logo from "../Assets/Images/csnovels-logo.svg";
import CHECK from "../Assets/Images/check.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import InfiniteScroll from "react-infinite-scroll-component";
import $ from "jquery";
import * as actions from "../store/actions/actions";
import filledBookmark from "../Assets/filledbookmark.jpg";
import unfilledBookmark from "../Assets/unfilledbookmark.jpg";
import {
  faTimes,
  faLock,
  faCog,
  faBars,
  faArrowAltCircleRight,
  faArrowAltCircleLeft,
} from "@fortawesome/free-solid-svg-icons";
import { connect } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import Loader from "react-loader-spinner";

import { Modal } from "react-bootstrap";

import AddComponent from "../Components/Advertisement";

import { toast } from "react-toastify";
import { StarRate } from "@mui/icons-material";

function ReadBookPage({
  authReducer,
  booksReducer,
  getChapterContent,
  getChapterTitles,
  createBookmarks,
  getBookmarks,
}) {
  const [fontSize, setFontSize] = useState(14);
  const [chaptersTitles, setChaptersTitles] = useState(false);
  const isLogin = authReducer?.isLogin;
  const [chapterSets, setChapterSets] = useState(null);
  const [toggleContentAndOptions, setToggleContentAndOptions] = useState("");
  const accessToken = authReducer?.accessToken;
  const location = useLocation();
  const [chaptercontent, setChaptercontent] = useState([]);
  const [idIsSelected, setidIsSelected] = useState(false);
  const [dataOnTop, setDataOnTop] = useState(false);
  const [popup, setpopup] = useState(false);
  const [id, setid] = useState("");
  const [Currchapter, setCurrchapter] = useState({});
  const BOOK_IMAGE = location.state?.bookImage || booksReducer.book.Cover.url;
  const BOOK_NAME = location.state?.bookName || booksReducer.book.Title;
  const navigate = useNavigate();

  const bookId = window.location.pathname.split("/")[2];
  const [chaptersRange, setChaptersRange] = useState([]);

  const [hasMoreData, setHasMoreData] = useState(true);
  const [selectedRange, setSelectedRange] = useState(null);
  const [selectedChapterId, setSelectedChapterId] = useState(null);

  useEffect(() => {
    if (dataOnTop) {
      

      const arr = [...chaptercontent];
      
      const samechapter = arr.indexOf(booksReducer.chapterContent)
      if(samechapter!=-1){

        arr.splice(samechapter,arr.length)
      }else{
        arr.unshift(booksReducer.chapterContent);

      }
      // arr.map((item)=>{
      //   if(item[0].content==booksReducer.chaptercontent[0].content){
      //     setCurrchapter(item[0])
      //   }
      // })

      // setChaptercontent([booksReducer?.chapterContent]);

      setChaptercontent(arr);
      setDataOnTop(false);
    } else if (idIsSelected) {
      

      setChaptercontent([booksReducer?.chapterContent]);
      setidIsSelected(false);
    } else {
      // console.log(booksReducer.chaptersTitles.filter(item => {return item.name == booksReducer.chapterContent[0].content})[0]);
      // console.log(booksReducer.chaptersTitles.indexOf(booksReducer.chaptersTitles.filter(item => {return item.name == booksReducer.chapterContent[0].content})[0]));
      const arr = [...chaptercontent];
      const samechapter = arr.indexOf(booksReducer.chapterContent)
      if(samechapter!=-1){

        arr.splice(samechapter,arr.length)
      }else{
        arr[arr.length] = booksReducer.chapterContent;
        setChaptercontent(arr);

      }
      
      // for (var i = 0; i < chaptercontent.length; i++) {
      //   if (
      //     chaptercontent[i][0]?.content ==
      //     booksReducer?.chapterContent[0]?.content
      //   ) {
      //     arr[arr.length] = booksReducer.chapterContent;
      //     setChaptercontent(arr);
      //     break;
      //   }
      // }
    }
  }, [booksReducer.chapterContent, booksReducer.chaptersTitles]);

  const scrollToEnd = async () => {
    var key = "";

    booksReducer?.chaptersTitles.map((e, ind) => {
      if (e.name === chaptercontent[chaptercontent.length - 1][0].content) {
        key = ind;
      }
    });

    if (booksReducer?.chaptersTitles[key + 1]) {
      navigate(
        `/ReadBookPage/${bookId}/${booksReducer?.chaptersTitles[key + 1]._id}`,
        {
          replace: true,
          state: {
            bookId: bookId,
            bookName: BOOK_NAME,
            bookImage: BOOK_IMAGE,
          },
        }
      );
    } else {
      toast.info("This is the last chapter");
    }
  };
  const scrollToTop = async () => {
    var key = "";
    if (chaptercontent.length != 0) {
      booksReducer?.chaptersTitles.map((e, ind) => {
        if (e.name === chaptercontent[0][0]?.content) {
          key = ind;
        }
      });

      if (key > 0) {
        setDataOnTop(true);
        navigate(
          `/ReadBookPage/${bookId}/${
            booksReducer?.chaptersTitles[key - 1]._id
          }`,
          {
            replace: true,
            state: {
              bookId: bookId,
              bookName: BOOK_NAME,
              bookImage: BOOK_IMAGE,
            },
          }
        );
        // await getChapterContent(
        //   booksReducer?.chaptersTitles[key - 1]._id,
        //   bookId,
        //   authReducer?.userData?._id,
        //   accessToken
        // );
      }
    }
  };

  if (
    (authReducer?.userData?.package?.product?.name == "CS+" ||
      authReducer?.userData?.package?.product?.name == "CS Pro") &&
    authReducer?.userData?.feature?.readingStyle == true
  ) {
    document.onscroll = function () {
      if (
        window.innerHeight + document.documentElement.scrollTop ==
        document.documentElement.offsetHeight
      ) {
        if (window.location.pathname.split("/")[1] == "ReadBookPage") {
          if (authReducer?.userData?.feature?.ads == false) {
            setpopup(true);
          }

          scrollToEnd();
        }
      } else if (document.documentElement.scrollTop == 0) {
        if (window.location.pathname.split("/")[1] == "ReadBookPage") {
          if (authReducer?.userData?.feature?.ads == false) {
            setpopup(true);
          }

          scrollToTop();
        }
      }
    };
  }
  useEffect(() => {
    getChapterTitles(bookId, accessToken);
    setChaptercontent([booksReducer.chapterContent]);
  }, []);

  useEffect(() => {
    setCurrchapter(
      booksReducer.chaptersTitles.filter(
        (e) => e._id == window.location.pathname.split("/")[3]
      )[0]
    );
  }, [window.location.pathname]);
  const onPressYellowButton = () => {
    $("body").removeClass("black_bg , white_bg");
    $("body").toggleClass("yellow_bg");
  };

  const onPressBlackButton = () => {
    $("body").removeClass("yellow_bg , white_bg");
    $("body").toggleClass("black_bg");
  };

  const onPressWhiteButton = () => {
    $("body").removeClass("yellow_bg , black_bg");
    $("body").toggleClass("white_bg");
  };

  const _onPressFontSizeHandler = () => {
    if (fontSize < 20 && fontSize > 14) {
      $("body p").css({
        "font-size": fontSize,
      });
    } else {
      $("body p").css({
        "font-size": fontSize,
      });
    }
  };

  const _onPressApplyFont = (fontType) => {
    if (fontType == 1) {
      $("body  p").css("font-family", "Nunito Sans, sans-serif");
    } else {
      $("body  p").css("font-family", "Montserrat");
    }
  };

  useEffect(() => {
    _onPressFontSizeHandler();
  }, [fontSize]);
  const [data, setdata] = useState("");
  useEffect(async () => {
    if (booksReducer?.chaptersTitles?.length > 0) {
      const CHAPTERS_LENGTH = booksReducer?.chaptersTitles?.length;
      const CHAPTERS = [...booksReducer?.chaptersTitles];

      if (booksReducer?.chaptersTitles?.length - 4 < 0) {
        setChapterSets();
        setChaptersRange();
      } else {
        const CHAPTERS_SETS = new Array(
          Math.ceil(CHAPTERS_LENGTH / Math.trunc(CHAPTERS_LENGTH / 4))
        )
          .fill()
          .map((_) => CHAPTERS?.splice(0, Math.trunc(CHAPTERS_LENGTH / 4)));
        let RANGE_SETS = [];
        let lastInnerArrLength = 0;
        CHAPTERS_SETS?.map((ele, idx) => {
          RANGE_SETS.push(
            `${lastInnerArrLength + 1}-${lastInnerArrLength + ele?.length}`
          );
          lastInnerArrLength = lastInnerArrLength + ele?.length;
        });
        setChaptersRange(
          RANGE_SETS?.map((ele, idx) => ({ index: idx, set: ele }))
        );

        setChapterSets(CHAPTERS_SETS);
        setChaptersTitles(CHAPTERS_SETS[0]);
        
        setSelectedRange({ index: 0, set: RANGE_SETS[0] });
        if (location?.state?.chapterId) {
          setSelectedChapterId(location.state.chapterId);
        } else {
          setSelectedChapterId(booksReducer?.chaptersTitles[0]?._id);
        }
      }
    }
  }, [booksReducer?.chaptersTitles]);

  useEffect(async () => {
    // setidIsSelected(true);

    getChapterContent(
      window.location.pathname.split("/")[3],
      bookId,
      authReducer?.userData?._id,
      accessToken
    );

    setdata(
      booksReducer.bookmarks.filter(
        (e) => e.chapter._id == window.location.pathname.split("/")[3]
      )
    );
  }, [window.location.pathname]);

  useEffect(() => {
    setdata(
      booksReducer.bookmarks.filter(
        (e) => e.chapter._id == window.location.pathname.split("/")[3]
      )
    );
  }, [booksReducer?.bookmarks]);

  const closeModal = () => { 
    setSelectedChapterId(id);

    setpopup(false);
  };

  useEffect(() => {
    let newList = [];
    chaptersRange?.filter((ele, idx) => {
      if (ele?.index === selectedRange?.index) {
        newList = chapterSets[idx];
      }
    });
    setChaptersTitles(newList);
  }, [selectedRange]);

  const bookMarkthebook = async () => {
    if (!isLogin) {
      toast.info("Login Required!");
      return;
    } else {
      const res = await createBookmarks(
        bookId,
        window.location.pathname.split("/")[3],
        authReducer.accessToken
      );
      getBookmarks(authReducer.accessToken);
    }
  };

  const BookReading = (books) => {
    return (
      <>
        <h3>
          {books.book.length > 1 ? (
            <>
              {`${books?.book[0]?.content} : Title`} {"   "}
              <span onClick={() => bookMarkthebook()}>
                {data.length == 0 ? (
                  <img src={unfilledBookmark} style={{ height: "30px" }} />
                ) : (
                  <img src={filledBookmark} style={{ height: "30px" }} />
                )}
              </span>
            </>
          ) : (
            <>
              {`${books?.book[0]?.content}`} {"   "}
            </>
          )}
        </h3>

        {books.book?.map(
          (ele, idx) => idx !== 0 && <p className="mt-2">{ele?.content}</p>
        )}
      </>
    );
  };

  return (
    <>
      <Header />
      <div className="read-book-body">
        <section className="side_bar_func">
          <div className="icons_sidebar">
            <div className="hamburger">
              <FontAwesomeIcon
                icon={faBars}
                onClick={() => {
                  setToggleContentAndOptions(
                    toggleContentAndOptions === "display_tables"
                      ? ""
                      : "display_tables"
                  );
                }}
              />
            </div>
            <div className="settings">
              <FontAwesomeIcon
                icon={faCog}
                onClick={() => {
                  setToggleContentAndOptions(
                    toggleContentAndOptions === "display_options"
                      ? ""
                      : "display_options"
                  );
                }}
              />
            </div>
          </div>
        </section>
        <section className="table-"></section>
        <section className="section-1 my_readbook_sec1">
          <div className="row">
            <div className="col-lg-6 left-header">
              <div className="logo">
                <img src={Logo} className="img-fluid" alt="" />
              </div>
              <div className="book-title">
                <h3>{`${BOOK_NAME} / ${booksReducer?.chapterContent[0]?.content}`}</h3>
              </div>
            </div>
            <div className=" col-lg-6 right-header">
              {!isLogin && (
                <a href="#" className="btn-sm">
                  SIGN IN
                </a>
              )}
            </div>
          </div>
        </section>

        <section
          className={`chapter-sec my_readbook_sec2 ${
            toggleContentAndOptions === "display_tables"
              ? "display_tables"
              : toggleContentAndOptions === "display_options"
              ? "display_options"
              : ""
          }`}
        >
          <div className="container">
            <div className="book_img">
              <img
                src={`${BOOK_IMAGE}`}
                className="img-fluid"
                alt="book-image"
              />
              <span className="original">Original</span>
            </div>
            <div className="book_text">
              <h3>{BOOK_NAME}</h3>
              {/* <h2>
                Author: <span>easyread</span>
              </h2> */}
              <h4>© CSNovels</h4>
            </div>
            <div className="hr_book">
              <img src={BOOK_IMAGE} className="img-fluid" alt="" />
            </div>

            {/* Book Content Paragraphs  */}
            {Currchapter?.permissions?.length == 0 ||
            Currchapter?.permissions?.includes(
              authReducer.userData?.package?.product?.name
            ) ? (
              <>
                <div className="chapter_content">
                  <InfiniteScroll
                    dataLength={chaptercontent?.length}
                    scrollThreshold={"200px"}
                    next={() => scrollToEnd()}
                    hasMore={true}
                    inverse={true}
                    endMessage={
                      <p style={{ textAlign: "center" }}>
                        <b>This is last Chapter</b>
                      </p>
                    }
                    loader={
                      <div className="mt-3 mb-3 d-flex justify-content-center align-items-center">
                        <Loader
                          type="TailSpin"
                          color="darkgrey"
                          height={40}
                          width={40}
                        />
                      </div>
                    }
                  >
                    {popup ? (
                      <ins
                        className="adsbygoogle"
                        style={{ display: "block" }}
                        data-ad-client="ca-pub-5004354455774494"
                        data-ad-slot="7885184093"
                        data-ad-format="auto"
                        data-full-width-responsive="true"
                      />
                    ) : null}
                    {chaptercontent?.map((item) => {
                      return <BookReading book={item} />;
                    })}
                  </InfiniteScroll>
                </div>
                <div style={{ "margin-left": "85%", "margin-top": "10px" }}>
                  {authReducer?.userData?.feature?.readingStyle == false ? (
                    <>
                      <FontAwesomeIcon
                        icon={faArrowAltCircleLeft}
                        onClick={() => {
                          setidIsSelected(true);
                          if (authReducer?.userData?.feature?.ads == false) {
                            setpopup(true);
                          }
                          scrollToTop();
                        }}
                        style={{ "font-size": "30px" }}
                      />
                      <FontAwesomeIcon
                        icon={faArrowAltCircleRight}
                        onClick={() => {
                          setidIsSelected(true);
                          if (authReducer?.userData?.feature?.ads == false) {
                            setpopup(true);
                          }

                          scrollToEnd();
                        }}
                        style={{ "font-size": "30px" }}
                      />
                    </>
                  ) : null}
                </div>
              </>
            ) : (
              <>
                {" "}
                <h1 style={{ textAlign: "center" }}>
                  Subscribed to view new chapters
                </h1>
                <button
                  style={{
                    "margin-left": "40%",
                    width: "20%",
                    "margin-top": "10px",
                  }}
                  type="button"
                  className="btn us-active-btn"
                  onClick={() => {
                    navigate("/subscription");
                  }}
                >
                  Subscribe Now
                </button>{" "}
              </>
            )}

            {/* <div className="chapter_content">
              <InfiniteScroll
                dataLength={100} //This is important field to render the next data
                next={getOtherChapters}
                onScroll={getOtherChapters}
                hasMore={hasMore}
                loader={<h4>Loading...</h4>}
                endMessage={
                  <p style={{ textAlign: "center" }}>
                    <b>Yay! You have seen it all</b>
                  </p>
                }
                // below props only if you need pull down functionality
                // refreshFunction={this.refresh}
                // pullDownToRefresh
                // pullDownToRefreshThreshold={50}
                // pullDownToRefreshContent={
                //   <h3 style={{ textAlign: 'center' }}>&#8595; Pull down to refresh</h3>
                // }
                // releaseToRefreshContent={
                //   <h3 style={{ textAlign: 'center' }}>&#8593; Release to refresh</h3>
                // }
              >
                
                 <BookReading book={booksReducer?.chapterContent} />;
                
              </InfiniteScroll>
            </div> */}

            {/* <h3>
                {`${booksReducer?.chapterContent[0]?.content}: ${chaptersTitles?.[0]?.title}`}
              </h3>
              {booksReducer?.chapterContent?.map(
                (ele, idx) =>
                  idx !== 0 && <p className="mt-2">{ele?.content}</p>
              )}
            </div> */}
            {/* </InfiniteScroll> */}
          </div>

          <div className="table_content visible_table">
            <h4>Table of Contents</h4>
            <span className="close">
              <FontAwesomeIcon
                icon={faTimes}
                onClick={() => {
                  setToggleContentAndOptions("");
                }}
              />
            </span>
            <span> Volume 1</span>
            <ul className="chapter_headings">
              {chaptersTitles?.length > 0 &&
                chaptersTitles?.map((ele, idx) => {
                  return (
                    <li>
                      <a
                        // href={`/ReadBookPage/${bookId}/${ele?._id}`}
                        onClick={(e) => {
                          e.preventDefault();

                          if (ele.permissions.length > 0) {
                            if (
                              ele.permissions.includes(
                                authReducer?.userData?.package?.product?.name
                              )
                            ) {
                              navigate(`/ReadBookPage/${bookId}/${ele?._id}`, {
                                replace: true,
                                state: {
                                  bookId: bookId,
                                  bookName: BOOK_NAME,
                                  bookImage: BOOK_IMAGE,
                                  chapterId: ele?._id,
                                },
                              });
                            } else {
                              toast.error("Please Subscribe to read the book");
                            }
                          } else {
                            navigate(`/ReadBookPage/${bookId}/${ele?._id}`, {
                              replace: true,
                              state: {
                                bookId: bookId,
                                bookName: BOOK_NAME,
                                bookImage: BOOK_IMAGE,
                                chapterId: ele?._id,
                              },
                            });
                          }
                          setidIsSelected(true);
                          // setSelectedChapterId(ele._id);
                          // setid(ele?._id);
                        }}
                        style={{
                          color:
                            window.location.pathname.split("/")[3] === ele?._id
                              ? "#3b66f5"
                              : "#000",
                          textTransform: "capitalize",
                        }}
                      >
                        {/* {`${ele?.name?.match(/(\d+)/)[0]}.`}&nbsp; &nbsp;
                        {`${ele?.title}`} */}
                        {ele.name}
                      </a>
                    </li>
                  );
                })}
            </ul>
            {/* <ul className="chapter-count">
              <li className="lock">
                <a href="#">Prologue </a>
                <FontAwesomeIcon
                  icon={faLock}
                  onClick={() => {
                    setToggleContentAndOptions("");
                  }}
                />
              </li>
              <li>
                <a href="#">Opening day of The Ancient World</a>
              </li>
              <li>
                <a href="#">The Divine className </a>
              </li>
              <li>
                <a href="#">Chaos in both worlds</a>
              </li>
              <li>
                <a href="#">Slaying monsters and getting another quest </a>
              </li>
            </ul> */}
            <div className="chapters_range">
              <ul>
                {chaptersRange?.length > 0 &&
                  chaptersRange?.map((ele, idx) => (
                    <li>
                      <a
                        className={
                          selectedRange?.index == ele?.index && "blue-line"
                        }
                        href="#"
                        onClick={(e) => {
                          setSelectedRange(ele);
                          e.preventDefault();
                        }}
                      >
                        {ele.set}
                      </a>
                    </li>
                  ))}
              </ul>
            </div>
          </div>

          <div className="table_content display_visible">
            <h4>Display Options</h4>
            <span className="close">
              <FontAwesomeIcon
                icon={faTimes}
                onClick={() => {
                  setToggleContentAndOptions("");
                }}
              />
            </span>
            <span>Background</span>
            <div className="bg-change-main">
              <div
                onClick={() => onPressWhiteButton()}
                className="white-btn bg-changer"
              >
                <img src={CHECK} alt="" className="img-fluid" />
              </div>
              <div
                onClick={() => onPressYellowButton()}
                className="yellow-btn bg-changer"
              >
                <img src={CHECK} alt="" className="img-fluid" />
              </div>
              <div
                onClick={() => onPressBlackButton()}
                className="black-btn bg-changer"
              >
                <img src={CHECK} alt="" className="img-fluid" />
              </div>
            </div>
            <span>Font</span>
            <div className="font-changer">
              <div className="nunito-font" onClick={() => _onPressApplyFont(1)}>
                <p>Nunito Sans</p>
              </div>
              <div className="merri-font" onClick={() => _onPressApplyFont(2)}>
                <p>Merriweather</p>
              </div>
            </div>
            <span>Size</span>
            <div className="size-changer">
              <div
                className="increasing_size"
                onClick={() => {
                  if (fontSize < 20) {
                    setFontSize(fontSize + 1);
                  }
                }}
              >
                A+
              </div>
              <div className="size">{fontSize}</div>
              <div
                className="decreasing_size"
                onClick={() => {
                  if (fontSize >= 14) {
                    setFontSize(fontSize - 1);
                  }
                }}
              >
                A-
              </div>
            </div>
          </div>
        </section>
      </div>

      <Modal show={popup} onHide={() => closeModal()} className="Modal">
        <Modal.Header className="modal-header">
          <Modal.Title className="modal-title">
            {/* {!modalcontent.amount ? "Choose Amount" : ""} */}
          </Modal.Title>
          <button
            type="button"
            className="close"
            data-dismiss="modal"
            onClick={closeModal}
          >
            &times;
          </button>
        </Modal.Header>
        <Modal.Body>
          <h1>Google add Here</h1>
          {/* <Adsense client="ca-pub-5004354455774494" slot="7885184093" /> */}
          <amp-ad
            width="100vw"
            height="320"
            type="adsense"
            data-ad-client="ca-pub-5004354455774494"
            data-ad-slot="3071342394"
            data-auto-format="rspv"
            data-full-width=""
          >
            <div overflow=""></div>
          </amp-ad>

          {/* 
          <ins
            className="adsbygoogle"
            style={{ display: "block" }}
            data-ad-client="ca-pub-5004354455774494"
            data-ad-slot="7885184093"
            data-ad-format="auto"
            data-full-width-responsive="true"
          /> */}

          <AddComponent />
        </Modal.Body>
      </Modal>
    </>
  );
}

const mapStateToProps = ({ authReducer, booksReducer }) => {
  return {
    authReducer,
    booksReducer,
  };
};

export default connect(mapStateToProps, actions)(ReadBookPage);

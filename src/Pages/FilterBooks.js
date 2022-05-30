import React, { useEffect, useState } from "react";
import Loader from "react-loader-spinner";
import Header from "../Components/Header";
import { useLocation } from "react-router-dom";
import * as actions from "../store/actions/actions";
import Footer from "../Components/Footer";
import { imageUrl } from "../config";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import { toast } from "react-toastify";
function FilterBooks({
  authReducer,
  booksReducer,
  getFilteredBooks,
  favoriteThisBook,
  getBook,
  emptyFilteredBooks,
}) {
  const location = useLocation();
  const navigate = useNavigate();
  const accessToken = authReducer?.accessToken;
  const isLogin = authReducer?.isLogin;
  const [genre, setGenre] = useState(location?.state?.genre || "all");
  const [contentType, setContentType] = useState("all");
  const [contentStatus, setContentStatus] = useState(
    location?.state?.contentStatus || "all"
  );
  const [sortBy, setSortBy] = useState(location?.state?.sortBy || "popular");
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);
  const [pageNo, setPageNo] = useState(1);
  const [hasMoreData, setHasMoreData] = useState(true);

  useEffect(() => {
    emptyFilteredBooks();
    _onChangeGenre();
  }, [genre, sortBy, contentStatus]);

  useEffect(() => {
    setData(booksReducer?.filteredBooks);
  }, [booksReducer?.filteredBooks]);

  const getPaginatedData = () => {
    const data = {
      cat: genre,
      status: contentStatus,
      orderBy: sortBy,
      pageNo: pageNo,
      userId: authReducer?.userData?._id || undefined,
    };

    getFilteredBooks(data, accessToken, setHasMoreData);
    setPageNo(pageNo + 1);
  };

  const favoriteBookHandler = (_id) => {
    const data = {
      bookId: _id,
    };
    favoriteThisBook(data, accessToken, "filteredBooks");
  };

  const _onChangeGenre = () => {
    let PAGE_NO = 1;
    const data = {
      cat: genre,
      status: contentStatus,
      orderBy: sortBy,
      pageNo: PAGE_NO,
      userId: authReducer?.userData?._id || undefined,
    };

    setIsLoading(true);
    getFilteredBooks(data, accessToken, setHasMoreData).then(() => {
      setIsLoading(false);
    });
    setPageNo(PAGE_NO + 1);
  };

  return (
    <>
      <Header />
      <div className="search-page">
        <div className="container">
          <div className="row">
            <div className="col-md-3">
              <div className="side-bar">
                <h1 className="sidebar-heading">Genre of Novels</h1>
                <div className="row">
                  <div className="col-md-12">
                    <ul className="nav nav-pills nav-stacked side-bar-tabs">
                      <li
                        className="nav-item"
                        onClick={() => {
                          setGenre("all");
                          setContentStatus("all");
                          setContentType("all");
                          setSortBy("popular");
                        }}
                      >
                        <a
                          style={{
                            background: genre === "all" && "darkgrey",

                            color: genre === "all" && "white",
                          }}
                          className={`nav-link `}
                          href="#"
                        >
                          All
                        </a>
                      </li>
                      <li
                        className="nav-item"
                        onClick={() => {
                          setGenre("urban");
                          setContentStatus("all");
                          setContentType("all");
                          setSortBy("popular");
                        }}
                      >
                        <a
                          style={{
                            background: genre === "urban" && "darkgrey",

                            color: genre === "urban" && "white",
                          }}
                          className="nav-link"
                          href="#"
                        >
                          Urban
                        </a>
                      </li>
                      <li
                        className="nav-item"
                        onClick={() => {
                          setGenre("eastern");
                          setContentStatus("all");
                          setContentType("all");
                          setSortBy("popular");
                        }}
                      >
                        <a
                          style={{
                            background: genre === "eastern" && "darkgrey",

                            color: genre === "eastern" && "white",
                          }}
                          className="nav-link"
                          href="#"
                        >
                          Eastern
                        </a>
                      </li>
                      <li
                        className="nav-item"
                        onClick={() => {
                          setGenre("games");
                          setContentStatus("all");
                          setContentType("all");
                          setSortBy("popular");
                        }}
                      >
                        <a
                          style={{
                            background: genre === "games" && "darkgrey",

                            color: genre === "games" && "white",
                          }}
                          className="nav-link"
                          href="#"
                        >
                          Games
                        </a>
                      </li>
                      <li
                        className="nav-item"
                        onClick={() => {
                          setGenre("fantasy");
                          setContentStatus("all");
                          setContentType("all");
                          setSortBy("popular");
                        }}
                      >
                        <a
                          style={{
                            background: genre === "fantasy" && "darkgrey",

                            color: genre === "fantasy" && "white",
                          }}
                          className="nav-link"
                          href="#"
                        >
                          Fantasy
                        </a>
                      </li>
                      <li
                        className="nav-item"
                        onClick={() => {
                          setGenre("sci-fi");
                          setContentStatus("all");
                          setContentType("all");
                          setSortBy("popular");
                        }}
                      >
                        <a
                          style={{
                            background: genre === "sci-fi" && "darkgrey",

                            color: genre === "sci-fi" && "white",
                          }}
                          className="nav-link"
                          href="#"
                        >
                          Sci-fi
                        </a>
                      </li>
                      <li
                        className="nav-item"
                        onClick={() => {
                          setGenre("horror");
                          setContentStatus("all");
                          setContentType("all");
                          setSortBy("popular");
                        }}
                      >
                        <a
                          style={{
                            background: genre === "horror" && "darkgrey",

                            color: genre === "horror" && "white",
                          }}
                          className="nav-link"
                          href="#"
                        >
                          Horror
                        </a>
                      </li>
                      <li
                        className="nav-item"
                        onClick={() => {
                          setGenre("sports");
                          setContentStatus("all");
                          setContentType("all");
                          setSortBy("popular");
                        }}
                      >
                        <a
                          style={{
                            background: genre === "sports" && "darkgrey",

                            color: genre === "sports" && "white",
                          }}
                          className="nav-link"
                          href="#"
                        >
                          Sports
                        </a>
                      </li>
                      <li
                        className="nav-item"
                        onClick={() => {
                          setGenre("action");
                          setContentStatus("all");
                          setContentType("all");
                          setSortBy("popular");
                        }}
                      >
                        <a
                          style={{
                            background: genre === "action" && "darkgrey",

                            color: genre === "action" && "white",
                          }}
                          className="nav-link"
                          href="#"
                        >
                          Action
                        </a>
                      </li>
                      <li
                        className="nav-item"
                        onClick={() => {
                          setGenre("war");
                          setContentStatus("all");
                          setContentType("all");
                          setSortBy("popular");
                        }}
                      >
                        <a
                          style={{
                            background: genre === "war" && "darkgrey",

                            color: genre === "war" && "white",
                          }}
                          className="nav-link"
                          href="#"
                        >
                          War
                        </a>
                      </li>
                      <li
                        className="nav-item"
                        onClick={() => {
                          setGenre("realistic");
                          setContentStatus("all");
                          setContentType("all");
                          setSortBy("popular");
                        }}
                      >
                        <a
                          style={{
                            background: genre === "realistic" && "darkgrey",

                            color: genre === "realistic" && "white",
                          }}
                          className="nav-link"
                          href="#"
                        >
                          Realistic
                        </a>
                      </li>
                      <li
                        className="nav-item"
                        onClick={() => {
                          setGenre("history");
                          setContentStatus("all");
                          setContentType("all");
                          setSortBy("popular");
                        }}
                      >
                        <a
                          style={{
                            background: genre === "history" && "darkgrey",

                            color: genre === "history" && "white",
                          }}
                          className="nav-link"
                          href="#"
                        >
                          History
                        </a>
                      </li>
                      <li
                        className="nav-item"
                        onClick={() => {
                          setGenre("acg");
                          setContentStatus("all");
                          setContentType("all");
                          setSortBy("popular");
                        }}
                      >
                        <a
                          style={{
                            background: genre === "acg" && "darkgrey",

                            color: genre === "acg" && "white",
                          }}
                          className="nav-link"
                          href="#"
                        >
                          ACG
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-9">
              <div className="search-page-content">
                <h1 className="filter-heading top-main-head">Filter By</h1>
                <div className="row top-row">
                  <div className="col-lg-7 top-col">
                    <h3 className="top-heading content-type">Content Type</h3>
                    <ul className="nav nav-pills search-top-tab serach-tabs content-type-tabs">
                      <li
                        className="nav-item"
                        onClick={() => {
                          setContentType("all");
                        }}
                      >
                        <a
                          style={{
                            background: contentType === "all" && "darkgrey",

                            color: contentType === "all" && "white",
                          }}
                          className="nav-link active"
                          href="#"
                        >
                          All
                        </a>
                      </li>
                      <li
                        className="nav-item"
                        onClick={() => {
                          setContentType("translate");
                        }}
                      >
                        <a
                          style={{
                            background:
                              contentType === "translate" && "darkgrey",

                            color: contentType === "translate" && "white",
                          }}
                          className="nav-link"
                          href="#"
                        >
                          Translate
                        </a>
                      </li>
                      <li
                        className="nav-item"
                        onClick={() => {
                          setContentType("original");
                        }}
                      >
                        <a
                          style={{
                            background: contentType === "original" && "darkgrey",

                            color: contentType === "original" && "white",
                          }}
                          className="nav-link"
                          href="#"
                        >
                          Original
                        </a>
                      </li>
                      <li
                        className="nav-item"
                        onClick={() => {
                          setContentType("mtl");
                        }}
                      >
                        <a
                          style={{
                            background: contentType === "mtl" && "darkgrey",

                            color: contentType === "mtl" && "white",
                          }}
                          className="nav-link"
                          href="#"
                        >
                          MTl (Machine Translate)
                        </a>
                      </li>
                    </ul>
                  </div>
                  <div className="col-lg-5 top-col">
                    <h3 className="top-heading content-status">
                      Content Status
                    </h3>
                    <ul className="nav nav-pills search-top-tab serach-tabs">
                      <li
                        className="nav-item"
                        onClick={() => {
                          setContentStatus("all");
                        }}
                      >
                        <a
                          style={{
                            background: contentStatus === "all" && "darkgrey",

                            color: contentStatus === "all" && "white",
                          }}
                          className="nav-link active"
                          href="#"
                        >
                          All
                        </a>
                      </li>
                      <li
                        className="nav-item"
                        onClick={() => {
                          setContentStatus("completed");
                        }}
                      >
                        <a
                          style={{
                            background:
                              contentStatus === "completed" && "darkgrey",

                            color: contentStatus === "completed" && "white",
                          }}
                          className="nav-link"
                          href="#"
                        >
                          Completed
                        </a>
                      </li>
                      <li
                        className="nav-item"
                        onClick={() => {
                          setContentStatus("ongoing");
                        }}
                      >
                        <a
                          style={{
                            background:
                              contentStatus === "ongoing" && "darkgrey",

                            color: contentStatus === "ongoing" && "white",
                          }}
                          className="nav-link"
                          href="#"
                        >
                          Ongoing
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
                {/*----- filter top ---*/}

                <h1 className="sort-heading top-main-head">Sort By</h1>
                <div className="row">
                  <div className="col-12">
                    <ul className="nav nav-pills sorting serach-tabs">
                      <li
                        className="nav-item"
                        onClick={() => {
                          setSortBy("popular");
                          setIsLoading(true);
                        }}
                      >
                        <a
                          style={{
                            background: sortBy === "popular" && "darkgrey",

                            color: sortBy === "popular" && "white",
                          }}
                          className="nav-link active"
                          href="#"
                        >
                          Popular
                        </a>
                      </li>
                      {/* <li
                        className="nav-item"
                        onClick={() => {
                          setSortBy("recommended");
                          setIsLoading(true);
                        }}
                      >
                        <a
                          style={{
                            background: sortBy === "recommended" && "darkgrey",

                            color: sortBy === "recommended" && "white",
                          }}
                          className="nav-link"
                          href="#"
                        >
                          Recommended
                        </a>
                      </li> */}
                      <li
                        className="nav-item"
                        onClick={() => {
                          setSortBy("rating");
                          setIsLoading(true);
                        }}
                      >
                        <a
                          style={{
                            background: sortBy === "rating" && "darkgrey",

                            color: sortBy === "rating" && "white",
                          }}
                          className="nav-link"
                          href="#"
                        >
                          Rating
                        </a>
                      </li>
                      <li
                        className="nav-item"
                        onClick={() => {
                          setSortBy("timeUpdate");
                          setIsLoading(true);
                        }}
                      >
                        <a
                          style={{
                            background: sortBy === "timeUpdate" && "darkgrey",

                            color: sortBy === "timeUpdate" && "white",
                          }}
                          className="nav-link"
                        >
                          Time Updated
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="sorting-content">
                  {isLoading ? (
                    <div className="loader">
                      <Loader
                        type="TailSpin"
                        color="darkgrey"
                        height={100}
                        width={100}
                      />
                    </div>
                  ) : data?.length > 0 ? (
                    <InfiniteScroll
                      dataLength={data?.length}
                      scrollThreshold={"200px"}
                      next={() => getPaginatedData()}
                      hasMore={hasMoreData}
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
                      <div className="row">
                        {data?.map((item, index) => {
                          return (
                            <div
                              key={index}
                              className="col-lg-6 "

                            >
                              <div className="novel-box"
                                onClick={() => {
                                  getBook(item);
                                  navigate(`/book`, {
                                    replace: true,
                                    state: {
                                      bookId: item?._id,
                                      bookName: item?.Title,
                                      bookImage: `${imageUrl}/${item?.image?.name}`,
                                    },
                                  });
                                }}
                              >
                                <div className="row">
                                  <div className="col-4">
                                    <img
                                      className="featured-img"
                                      src={`${item?.image?.url}`}
                                      alt=""
                                    ></img>
                                  </div>
                                  <div className="col-8">
                                    <h1 className="novel-heading">
                                      {item?.Title}
                                    </h1>

                                    <p className="novel-excerpt">
                                      {item?.Description}
                                    </p>
                                    <div className="row rating-chapter">
                                      <div className="p-0 col-10">
                                        <span className="rating">
                                          <i className="fas fa-star"></i>
                                          {parseInt(item?.totalRates)+"."+parseInt((item?.totalRates % 1).toFixed(2).substring(2))}
                                          
                                        </span>
                                        <span className="chapter">
                                          <svg
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            className="mr4 fs16"
                                          >
                                            <path
                                              fill-rule="evenodd"
                                              clip-rule="evenodd"
                                              d="M4 2h10l6 6v14H4V2zm4 4h4v2H8V6zm8 6v-2H8v2h8z"
                                              fill="#000"
                                            ></path>
                                          </svg>
                                          {`${item?.chapters} Chapters`}
                                        </span>
                                      </div>

                                      {item?.isLike ? (
                                        <div
                                          className="col-2 star"
                                          onClick={(e) => {
                                            e.stopPropagation();
                                            if (isLogin) {
                                              !isLoading &&
                                                favoriteBookHandler(item?._id);
                                            } else {
                                              toast.info("Login Required!");
                                            }
                                          }}
                                        >
                                          <i className="fas fa-heart"></i>
                                        </div>
                                      ) : (
                                        <div
                                          className="col-2 star"
                                          onClick={(e) => {
                                            e.stopPropagation();
                                            if (isLogin) {
                                              !isLoading &&
                                                favoriteBookHandler(item?._id);
                                            } else {
                                              toast.info("Login Required!");
                                            }
                                          }}
                                        >
                                          <i className="far fa-heart"></i>
                                        </div>
                                      )}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </InfiniteScroll>
                  ) : (
                    <h3>No Books</h3>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

const mapStateToProps = ({ booksReducer, authReducer }) => {
  return { booksReducer, authReducer };
};
export default connect(mapStateToProps, actions)(FilterBooks);

// const dummyCards = [
//   {
//     _id: 1,
//     image: Book,
//     title: "My Vampire System",
//     description:
//       "The human Race is at war with the Vicious Dalki and when they needed help more than ever, THEY started to come forward.",
//     rating: 4.63,
//     chapters: 1331,
//     isFavorite: false,
//   },
//   {
//     _id: 2,
//     image: Book,
//     title: "My Vampire System",
//     description:
//       "The human Race is at war with the Vicious Dalki and when they needed help more than ever, THEY started to come forward.",
//     rating: 4.63,
//     chapters: 1331,
//     isFavorite: false,
//   },
//   {
//     _id: 3,
//     image: Book,
//     title: "My Vampire System",
//     description:
//       "The human Race is at war with the Vicious Dalki and when they needed help more than ever, THEY started to come forward.",
//     rating: 4.63,
//     chapters: 1331,
//     isFavorite: false,
//   },
//   {
//     _id: 4,
//     image: Book,
//     title: "My Vampire System",
//     description:
//       "The human Race is at war with the Vicious Dalki and when they needed help more than ever, THEY started to come forward.",
//     rating: 4.63,
//     chapters: 1331,
//     isFavorite: false,
//   },
//   {
//     _id: 5,
//     image: Book,
//     title: "My Vampire System",
//     description:
//       "The human Race is at war with the Vicious Dalki and when they needed help more than ever, THEY started to come forward.",
//     rating: 4.63,
//     chapters: 1331,
//     isFavorite: false,
//   },
//   {
//     _id: 6,
//     image: Book,
//     title: "My Vampire System",
//     description:
//       "The human Race is at war with the Vicious Dalki and when they needed help more than ever, THEY started to come forward.",
//     rating: 4.63,
//     chapters: 1331,
//     isFavorite: false,
//   },
//   {
//     _id: 7,
//     image: Book,
//     title: "My Vampire System",
//     description:
//       "The human Race is at war with the Vicious Dalki and when they needed help more than ever, THEY started to come forward.",
//     rating: 4.63,
//     chapters: 1331,
//     isFavorite: false,
//   },
//   {
//     _id: 8,
//     image: Book,
//     title: "My Vampire System",
//     description:
//       "The human Race is at war with the Vicious Dalki and when they needed help more than ever, THEY started to come forward.",
//     rating: 4.63,
//     chapters: 1331,
//     isFavorite: false,
//   },
//   {
//     _id: 9,
//     image: Book,
//     title: "My Vampire System",
//     description:
//       "The human Race is at war with the Vicious Dalki and when they needed help more than ever, THEY started to come forward.",
//     rating: 4.63,
//     chapters: 1331,
//     isFavorite: false,
//   },
//   {
//     _id: 10,
//     image: Book,
//     title: "My Vampire System",
//     description:
//       "The human Race is at war with the Vicious Dalki and when they needed help more than ever, THEY started to come forward.",
//     rating: 4.63,
//     chapters: 1331,
//     isFavorite: true,
//   },
// ];

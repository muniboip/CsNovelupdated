import React, { useEffect, useState } from "react";
import Header from "../Components/Header";
import StarRatings from "react-star-ratings";
import moment from "moment";
import Footer from "../Components/Footer";
import { connect } from "react-redux";
import { useLocation, useNavigate,useHistory } from "react-router-dom";
import ReviewsMapper from "../Components/ReviewsMapper";
import * as actions from "../store/actions/actions";
import { toast } from "react-toastify";


function Books({
  authReducer,
  booksReducer,
  getChapterTitles,
  postReview,
  favoriteThisBook,
  getChapterContent
}) {
  const location = useLocation();
  const navigate = useNavigate();
  const book = location?.state?.book;
  const [data, setdata] = useState(location?.state?.book);
  const accessToken = authReducer?.accessToken;
  const bookId = location.state.book?._id;
  
  const [review, setReview] = useState("");
  const isLogin = authReducer?.isLogin;
  const [rating, setRating] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  let CHECK = 0;
  const [allReviews, setAllReviews] = useState(book?.comments);

  useEffect(() => {
    
    getChapterTitles(bookId, accessToken);
  }, [accessToken, bookId]);

  useEffect(()=>{
    getChapterContent(
      booksReducer?.chaptersTitles[0]?._id,
      book?._id,
      authReducer?.userData?._id,
      authReducer?.accessToken
    );

  
},[booksReducer.chaptersTitles])



const _onPressCommentSend = () => {
    const data = {
      bookId: bookId,
      comment: review,
      rate: rating,
    };
    setIsLoading(true);

    postReview(data, accessToken, onSuccessPostReview).then(() => {
      setIsLoading(false);
    });
  };

  const onSuccessPostReview = () => {
    const newReview = {
      bookId: bookId,
      comment: review,
      rate: rating,
      userId: {
        profile_img: {
          name: authReducer?.userData?.profilePic,
        },

        username: authReducer?.userData?.username,
      },
    };

    let copyReviews = [...allReviews];
    copyReviews[copyReviews.length] = newReview;

    setAllReviews(copyReviews);
    setReview("");
    setRating(0);
  };

  const favoriteBookHandler = (item) => {
    const data = {
      bookId: item,
    };

    favoriteThisBook(data, accessToken, "favoritedBooks");
  };

  return (
    <>
      <Header />
      <div className="book-page">
        <div className="container">
          <div className="book-desc-box">
            <div className="row">
              <div className="col-md-3 book-img-col">
                <img
                  src={`${book?.Cover?.url}`}
                  class="book-image"
                  alt="Cover pic"
                ></img>
              </div>
              <div className="col-md-9">
                <h1 className="book-head">{book?.Title}</h1>
                <div className="row">
                  <div className="col-md-9 box-desc-row">
                    <div className="urban">
                      <span>
                        <svg
                          class="svg-inline-header-cat-icon"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24px 24px"
                        >
                          <path
                            class="st0"
                            d="M3,0h4.2c1.7,0,3.1,1.5,3.1,3.1v4.2c0,1.7-1.5,3.1-3.1,3.1H3c-1.6,0.1-3.1-1.2-3.1-2.9V3.1C-0.1,1.5,1.4,0,3,0 z"
                          ></path>
                          <path
                            class="st0"
                            d="M16.7,0h4.2c1.7,0,3.2,1.5,3.2,3.1v4.2c0,1.7-1.5,3.1-3.1,3.1h-4.2c-1.7,0-3.1-1.5-3.1-3.1V3.1 C13.6,1.5,14.9,0,16.7,0z"
                          ></path>
                          <path
                            class="st0"
                            d="M3,13.7h4.2c1.7,0,3.1,1.5,3.1,3.1v4.2c0,1.7-1.5,3.1-3.1,3.1H3c-1.6,0.1-3.1-1.3-3.1-2.9v-4.2 C-0.1,15,1.4,13.7,3,13.7z"
                          ></path>
                          <path
                            class="st0"
                            d="M16.7,13.7h4.2c1.7,0,3.1,1.5,3.1,3.1v4.2c0,1.7-1.5,3.1-3.1,3.1h-4.2c-1.7,0-3.1-1.5-3.1-3.1v-4.2 C13.6,15,14.9,13.7,16.7,13.7z"
                          ></path>
                        </svg>
                      </span>
                      <span class="head">{book?.categories?.name}</span>
                    </div>
                    <div className="day">
                      <span>
                        <i class="fas fa-pencil-alt"></i>
                        <span className="head">5 CH. / Day </span>
                        <i class="fas fa-question-circle"></i>
                      </span>
                    </div>
                    <div className="chapter">
                      <span>
                        {" "}
                        <svg
                          class="mp-book-chapter-icon"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 12 16"
                        >
                          <path d="M3,12h8c0.6,0,1-0.4,1-1V1c0-0.6-0.4-1-1-1H2C0.9,0,0,0.9,0,2v11c0,1.7,1.3,3,3,3h8c0.6,0,1-0.4,1-1 s-0.4-1-1-1H3c-0.6,0-1-0.4-1-1S2.4,12,3,12z"></path>
                        </svg>
                      </span>
                      <span className="head">{`${book?.chapters} Chapters`}</span>
                    </div>
                  </div>
                  <div className="col-md-3"></div>
                </div>
                <div className="desc-box-ratings">
                  <span className="stars">
                    {/* <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i> */}
                    <StarRatings
                      rating={book?.avgRate === 0 ? 0 : book?.avgRate}
                      starRatedColor="orange"
                      numberOfStars={5}
                      starSpacing="2px"
                      name="rating"
                    />
                  </span>
                  <span className="rate">{`${
                    parseInt(book?.avgRate) +
                    "." +
                    parseInt((book?.avgRate % 1).toFixed(2).substring(2))
                  }`}</span>
                  <span className="rating">{`${book?.comments?.length} REVIEWS`}</span>
                </div>

                <div className="read-buttons">
                  <button className="read-btn">
                    <a
                      href="/#"
                      onClick={async (e) => {
                        e.preventDefault();
                        e.stopPropagation();
                      
                        //  const chapter = await getChapterTitles(book._id,authReducer.accessToken)
                        // navigate(`/ReadBookPage/${book?._id}/${book.chapters[0]._id}`)

                        navigate(
                          `/ReadBookPage/${book?._id}/${booksReducer.chaptersTitles[0]._id}`,
                          {
                            replace: true,
                            state: {
                              bookName: book?.Title,
                              bookImage: `${book?.Cover?.url}`,
                            },
                          }
                        );
                      }}
                    >
                      Read now
                    </a>
                  </button>

                  <span
                    className="heart"
                    onClick={() => {
                      console.log('====================================');
                      console.log();
                      console.log('====================================');
                      if(!authReducer.isLogin){
                        toast.info("Login Required!")
                      }else{
                      favoriteBookHandler(book._id);
                      setdata((prevState) => ({
                        ...prevState,
                        isLike: !prevState.isLike,
                      }));}
                    }}
                  >
                    {data.isLike ? (
                      
                      <i class="fa-solid fa-heart"></i>
                    ) : (
                      <i class="far fa-heart"></i>
                    )}
                  </span>
                </div>
              </div>

              <ul class="nav nav-tabs book-tabs">
                <li class="nav-item">
                  <a class="nav-link active" data-toggle="tab" href="#about">
                    About
                  </a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" data-toggle="tab" href="#toc">
                    Table of contents
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div class="tab-content a-t_content">
            <div class="tab-pane fade active show about_content" id="about">
              <h1 className="description-head">description</h1>
              <p className="description-text">{book?.Description}</p>
              {/* 
              <div className="books">
                <h1 className="books-head">Recommended Reads</h1>
                <img
                  src="/static/media/book-card.38056e30.png"
                  class="book"
                ></img>
              </div> */}

              <div className="review">
                <h1 className="review-head">reviews</h1>
                <div className="row review-row">
                  <div className="col-md-6 revoew-col">
                    <h1 className="review-head">Rate this Novel</h1>
                    <div className="stars stars-2">
                      <StarRatings
                        rating={rating}
                        changeRating={(r) => {
                          if (!isLogin) {
                            toast.info("Login Required!");
                            return;
                          }
                          setRating(r);
                        }}
                        starHoverColor={"orange"}
                        starRatedColor="orange"
                        numberOfStars={5}
                        starSpacing="2px"
                        name="rating"
                      />
                    </div>
                    {/* <h3 className="review-subhead">{`${book?.rates?.length} Reviews (${book?.totalRates})`}</h3> */}
                  </div>
                  <div className="col-md-6">
                    <div class="form-group">
                      <textarea
                        value={review}
                        class="form-control"
                        onChange={(e) => setReview(e.target.value)}
                        placeholder="Leave a review with a comment..."
                        rows="3"
                        id="comment"
                        required
                      ></textarea>
                    </div>
                    <button
                      className="review-btn"
                      disabled={isLoading}
                      onClick={() => {
                        if (!isLogin) {
                          toast.info("Login Required!");
                          return;
                        } else if (
                          booksReducer.book.comments.filter((item) => {
                            return item.userId._id === authReducer.userData._id;
                          }).length > 0
                        ) {
                          toast.info("Already Reviewed!");
                        } else if (parseInt(review?.length) === 0) {
                          return;
                        } else {
                          _onPressCommentSend();
                        }
                      }}
                    >
                      Send
                    </button>
                  </div>
                </div>
                {/* <ul class="nav nav-tabs review-tabs">
                  <li class="nav-item">
                    <a class="nav-link active" data-toggle="tab" href="#Liked">
                      Liked
                    </a>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link" data-toggle="tab" href="#Newest">
                      Newest
                    </a>
                  </li>
                </ul> */}
                <div class="tab-content liked-content">
                  <div class="tab-pane fade active show" id="Liked">
                    {allReviews?.map((ele) => (
                      <ReviewsMapper item={ele} />
                    ))}

                    {/* <div className="comment-box">
                      <div className="row">
                        <div className="col-md-1 col-2">
                          <img
                            src="https://images.unsplash.com/photo-1556157382-97eda2d62296?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80 "
                            class="profile-image"
                          ></img>
                        </div>
                        <div className="col-md-11 col-9">
                          <h3 className="comment-box-head">
                            ImNotNarcissistic{" "}
                            <span>
                              <img
                                className="comment-head-img"
                                src="https://cdn-icons-png.flaticon.com/512/2190/2190552.png"
                              ></img>{" "}
                              <img
                                className="comment-head-img"
                                src="https://cdn-icons.flaticon.com/png/512/2566/premium/2566494.png?token=exp=1641277749~hmac=35dffb9fd4f99b007132ef425f322f44"
                              ></img>
                            </span>
                          </h3>
                          <span className="stars stars-3">
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star"></i>
                          </span>
                          <p className="comment">
                            Lorem Ipsum is simply dummy text of the printing and
                            typesetting industry.
                          </p>
                          <div className="row comment-row">
                            <div className="col-md-5">
                              <ul className="comment-list">
                                <li>The Strongest Son-in-Law (城中餐厅)</li>
                                <li>The Strongest Son-in-Law (城中餐厅)</li>
                                <li>The Strongest Son-in-Law (城中餐厅)</li>
                              </ul>
                            </div>
                            <div className="col-md-6">
                              <span className="more-comment">
                                <a href="/#">
                                  <i class="fas fa-chevron-down"></i>
                                </a>
                              </span>
                            </div>
                          </div>
                          <div className="row comment-row-2">
                            <div className="col-md-4 col-3">
                              <span className="time">9mth</span>
                            </div>
                            <div className="col-md-7 col-8">
                              <span className="like">
                                <i class="far fa-thumbs-up"></i>
                                149
                              </span>
                              <span className="comment">
                                <i class="far fa-comment"></i>
                              </span>
                              <span>
                                <a href="/#" className="dots">
                                  ...
                                </a>
                              </span>
                            </div>
                          </div>
                          <span className="replies">
                            <i class="fas fa-comment"></i> VIEW 40 REPLIES
                          </span>
                        </div>
                      </div>
                    </div> */}
                  </div>
                  <div class="tab-pane fade" id="Newest">
                    ...
                  </div>
                </div>
              </div>
            </div>
            <div class="tab-pane fade toc_content" id="toc">
              <div className="row toc-top-row">
                <div className="col-md-8 col-10">
                  <span className="l-r-head">Latest Release:</span>
                  <span className="l-r-head l-r-headcolor">
                    {`${
                      booksReducer?.chaptersTitles[
                        booksReducer?.chaptersTitles?.length - 1
                      ]?.name
                    }: ${
                      booksReducer?.chaptersTitles[
                        booksReducer?.chaptersTitles?.length - 1
                      ]?.title
                    }`}
                  </span>
                  <span className="l-r-head l-r-subhead">
                    {moment(
                      booksReducer?.chaptersTitles[
                        booksReducer?.chaptersTitles?.length - 1
                      ]?.createdAt
                    ).fromNow()}
                  </span>
                </div>
                <div className="col-md-3 col-2">
                  <a href="/#" className="indenticon">
                    <i class="fas fa-indent"></i>
                  </a>
                </div>
              </div>

              <h3 className="a-t-subhead">Volume 1</h3>

              <div className="row a-t_row">
                {booksReducer?.chaptersTitles?.map((ele, idx) => {
                  if (idx % 2 === 0) {
                    CHECK = CHECK + 1;
                  }
                  return (
                    <div className={`row ${CHECK % 2 === 0 && "bg-color"} `}>
                      <div className="col-md-2 col-2">
                        <span className="numbercount">{idx + 1}</span>
                      </div>
                      <div className="col-lg-10 col-md-10 col-10">
                        <h1
                          className="volume-head"
                          style={{ "margin-left": "10px" }}
                        >
                          {ele?.title}
                        </h1>
                        <h3 className="volume-time">
                          {moment(ele?.createdAt).fromNow()}
                        </h3>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

const mapStateToProps = ({ authReducer, booksReducer }) => {
  return {
    authReducer,
    booksReducer,
  };
};
export default connect(mapStateToProps, actions)(Books);

import React, { useEffect } from "react";
import Header from "../Components/Header";
import { useState } from "react";

import {
  faThLarge,
  faBook,
  faAngleRight,
} from "@fortawesome/free-solid-svg-icons";
import Footer from "../Components/Footer";
import BOOK_CARD from "../Assets/Images/book-card.png";
import MostWantedNovelsMapper from "../Components/MostWantedNovelsMapper";
import OngoingNovelsMapper from "../Components/OngoingNovelsMapper";
import Top10Mapper from "../Components/Top10Mapper";
import SliderComp from "../Components/SliderComp";
import { connect } from "react-redux";
import * as actions from "../store/actions/actions";
import THREE_LINES from "../Assets/Images/three-lines.png";
import BOOK1 from "../Assets/Images/top10/1.png";
import BOOK2 from "../Assets/Images/top10/2.png";
import BOOK3 from "../Assets/Images/top10/3.png";
import BOOK4 from "../Assets/Images/top10/4.png";
import BOOK5 from "../Assets/Images/top10/5.png";
import BOOK6 from "../Assets/Images/top10/6.png";
import BOOK7 from "../Assets/Images/top10/7.png";
import BOOK8 from "../Assets/Images/top10/8.png";
import BOOK9 from "../Assets/Images/top10/9.png";
import BOOK11 from "../Assets/Images/top10/11.png";
import BOOK12 from "../Assets/Images/top10/12.png";
import URBAN from "../Assets/Images/urban.png";
import SCIFI from "../Assets/Images/scifi.png";
import FANTASY from "../Assets/Images/fantasy.png";
import SLIDE_IMAGE_1 from "../Assets/Images/slide-image.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import moment from "moment";
import CompletedNovels from "../Components/CompletedNovels";
import "../Styles/Mirza.css";
import SignInSignUpModal from "../Components/SignInSignUpModal";
import AuthModal from "../Components/AuthModal";
import { useNavigate } from "react-router-dom";
import { imageUrl } from "../config";

const HomePage = ({
  authReducer,
  booksReducer,
  favoriteThisBook,
  getAllBooks,
  getRecentChapter,
  getChapterContent
}) => {
  const navigate = useNavigate();
  const accessToken = authReducer?.accessToken;
  const userId = authReducer?.userData?._id;
  const [isLoading, setIsLoading] = useState(false);

  const freeBookOfWeek = {
    _id: 1,
    title:
      "Book Title Goes Here On Even Two Lines Test Test Test Test Test Test Test Two Lines Even Test Test Test Test Test Test Test",
    category: "urban",
    heading: "great l",
    chapters: 3471,
    status: "completed",
    image: BOOK_CARD,
    description:
      "Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placeholder before final copy is available  Lorem ipsum may be used as a placeholder before final copy is available..",
  };

  const [mostPopular, setMostPopular] = useState([]);
  const [ongoing, setOngoing] = useState([]);
  const [completed, setCompleted] = useState([]);
  // const [completedDesktop, setCompletedDesktop] = useState([
  //   {
  //     _id: 3,
  //     heading: "great marshal",
  //     status: "completed",
  //     title:
  //       "Book Title Goes Here On Even Two Lines Test Test Test Test Test Test Test",
  //     category: "urban",
  //     chapters: 3471,
  //     image: BOOK_CARD,
  //     description:
  //       "Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placeholder before final copy is available  Lorem ipsum may be used as a placeholder before final copy is available..",
  //   },
  //   {
  //     _id: 4,
  //     heading: "great marshal",
  //     status: "completed",
  //     title:
  //       "Book Title Goes Here On Even Two Lines Test Test Test Test Test Test Test",
  //     category: "urban",
  //     chapters: 3471,
  //     image: BOOK_CARD,
  //     description:
  //       "Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placeholder before final copy is available  Lorem ipsum may be used as a placeholder before final copy is available..",
  //   },
  //   {
  //     _id: 5,
  //     heading: "great marshal",
  //     status: "completed",
  //     title:
  //       "Book Title Goes Here On Even Two Lines Test Test Test Test Test Test Test Two",
  //     category: "urban",
  //     chapters: 3471,
  //     image: BOOK_CARD,
  //     description:
  //       "Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placeholder before final copy is available  Lorem ipsum may be used as a placeholder before final copy is available..",
  //   },
  //   {
  //     _id: 6,
  //     heading: "great marshal",
  //     status: "completed",
  //     title:
  //       "Book Title Goes Here On Even Two Lines Test Test Test Test Test Test Test Two",
  //     category: "urban",
  //     chapters: 3471,
  //     image: BOOK_CARD,
  //     description:
  //       "Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placeholder before final copy is available  Lorem ipsum may be used as a placeholder before final copy is available..",
  //   },
  //   {
  //     _id: 7,
  //     heading: "great marshal",
  //     status: "completed",
  //     title:
  //       "Book Title Goes Here On Even Two Lines Test Test Test Test Test Test Test Two",
  //     category: "urban",
  //     chapters: 3471,
  //     image: BOOK_CARD,
  //     description:
  //       "Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placeholder before final copy is available  Lorem ipsum may be used as a placeholder before final copy is available..",
  //   },
  //   {
  //     _id: 8,
  //     heading: "great marshal",
  //     status: "completed",
  //     title:
  //       "Book Title Goes Here On Even Two Lines Test Test Test Test Test Test Test Two",
  //     category: "urban",
  //     chapters: 3471,
  //     image: BOOK_CARD,
  //     description:
  //       "Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placeholder before final copy is available  Lorem ipsum may be used as a placeholder before final copy is available..",
  //   },
  // ]);
  const [top10, setTop10] = useState([]);
  const [recent, setRecent] = useState([]);

  const [images, setImages] = useState([
    {
      _id: 1,
      image: SLIDE_IMAGE_1,
    },
    {
      _id: 2,
      image: SLIDE_IMAGE_1,
    },
    {
      _id: 3,
      image: SLIDE_IMAGE_1,
    },
  ]);

  const favoriteBookHandler = (id) => {
    const data = {
      bookId: id,
    };

    setIsLoading(true);
    favoriteThisBook(data, accessToken, "favoritedBooks");
  };

  useEffect(() => {
    setIsLoading(true);
    getRecentChapter();

    getAllBooks(userId, accessToken);
  }, []);

  useEffect(() => {
    let mostPopularNovels = booksReducer?.books?.filter(
      (ele) => ele?.isPopular
    );
    let ongoingNovels = booksReducer?.books?.filter(
      (ele) => ele?.releaseSchedule !== "completed"
    );
    let completedNovels = booksReducer?.books?.filter(
      (ele) => ele?.releaseSchedule === "completed"
    );
    let top10Books = booksReducer?.books?.sort(
      (a, b) => b?.avgRate - a?.avgRate
    );
    let recentArrivedBooksDateWiseSorted = booksReducer?.books?.sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );
    let recent5Arrived = [];
    for (let i = 0; i < recentArrivedBooksDateWiseSorted?.length; i++) {
      if (i < 5) {
        recent5Arrived.push(recentArrivedBooksDateWiseSorted[i]);
      }
    }
    setMostPopular(mostPopularNovels);
    setCompleted(completedNovels);
    setRecent(recent5Arrived);
    setOngoing(ongoingNovels);
    setTop10(top10Books);
  }, [booksReducer.books, booksReducer.favoritedBooks]);

  return (
    <>
      <Header />
      {/* Slider  */}
      <SliderComp images={images} />
      <div className="container">
        {/* Most Popular  */}
        {mostPopular?.length > 0 && (
          <div className="section-div most_popular">
            <div className="mp-books-header">
              <p className="mp-books-header-title">Most Popular</p>
              <p
                className="mp-books-view-all"
                onClick={() => {
                  navigate("/search", { state: { sortBy: "popular" } });
                }}
              >
                VIEW ALL {<FontAwesomeIcon icon={faAngleRight} />}
              </p>
            </div>

            <div className="row center-most-popular-in-mobile spacing-adjust">
              {mostPopular?.map((item, idx) => (
                <MostWantedNovelsMapper
                  key={idx}
                  item={item}
                  isLoading={isLoading}
                  favoriteBookHandler={favoriteBookHandler}
                />
              ))}
            </div>
          </div>
        )}

        {/* Ongoing Novels  */}
        {ongoing?.length > 0 && (
          <div className="section-div ongoing_novel">
            <div className="section-heading-div">
              <p className="section-heading">ONGOING NOVELS</p>
              <p
                className="view-all"
                onClick={() => {
                  navigate("/search", { state: { contentStatus: "ongoing" } });
                }}
              >
                VIEW ALL <FontAwesomeIcon icon={faAngleRight} />
              </p>
            </div>

            <div className="row row-425 spacing-adjust">
              {ongoing?.map((item, idx) => (
                <OngoingNovelsMapper
                  key={idx}
                  item={item}
                  isLoading={isLoading}
                  favoriteBookHandler={favoriteBookHandler}
                  from="homepage"
                />
              ))}
            </div>
          </div>
        )}

        {/* Top Ranking */}
        <div className="section-div top-10-section top_ranking">
          <p className="section-heading">TOP 10 RANKING</p>
          <hr style={{ height: "1px", backgroundColor: "rgba(0,0,0,0.02)" }} />

          {/* Top 10 & Recent Arrivals  */}
          <div className="row">
            <div className="col-md-8 col-sm-12">
              <p className="section-heading-inner">TOP 10.</p>
              <div className="books-container">
                {top10?.map((ele, idx) => (
                  <Top10Mapper key={idx} item={ele} index={idx} />
                ))}
              </div>
            </div>

            <div className="col-md-4">
              <p className="section-heading-inner">RECENT ARRIVALS</p>

              <div className="row-425 row-426 recent-width recent-books-container">
                {recent.map((ele, idx) => (
                  <Top10Mapper key={idx} item={ele} index={idx} />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Free Book  */}
        <div className="free-book-section" style={{ position: "relative" }}>
          <p className="free-book-label">Free Book of The Week</p>
          <div className="gradient-border">
            <div className="free-book-rectangle grounded-radiants">
              <div className="timer-and-free-book-details">
                {/* Timer  */}
                <div className="timer-div">
                  <p className="count-label">00</p>
                  <p className="day-label">D</p>
                  <p className="count-label">00</p>
                  <p className="day-label">H</p>
                  <p className="count-label">00</p>
                  <p className="day-label">M</p>
                </div>
                {/* Book details  */}
                <div className="d-flex flex-row">
                  <span className="gradient-blue-ball" />
                  <span className="gradient-green-ball" />
                  <span className="gradient-red-ball" />
                  <div className="three-lines">
                    <img src={THREE_LINES} className="three-lines-image" />
                  </div>
                  <div className="free-book-image">
                    <div>
                      <p className="free-book-status">
                        {/* {freeBookOfWeek.status}{" "} */}
                      </p>
                      <p className="free-book-heading">
                        {freeBookOfWeek.heading}
                      </p>
                      <p className="mp-cs-text">CS</p>
                    </div>
                    <img
                      src={freeBookOfWeek.image}
                      className="free-book-image"
                    />
                  </div>

                  <div className="free-book-details">
                    <p className="free-book-title">
                      {window.screen.width <= 768
                        ? `${freeBookOfWeek.title.substring(0, 30)}...`
                        : freeBookOfWeek.title.length > 50
                        ? `${freeBookOfWeek.title.substring(0, 50)}...`
                        : freeBookOfWeek.title}
                    </p>
                    <p className="free-book-category">
                      <FontAwesomeIcon icon={faThLarge} />{" "}
                      {freeBookOfWeek.category}
                    </p>
                    <p className="free-book-description">
                      {freeBookOfWeek.description.length > 150
                        ? `${freeBookOfWeek.description.substring(0, 150)}...`
                        : freeBookOfWeek.description}
                    </p>
                    <div className="free-chapters-div">
                      <p className="free-book-chapters">
                        <FontAwesomeIcon icon={faBook} />{" "}
                        {`${freeBookOfWeek.chapters} Chapters`}
                      </p>
                      <div className="read-div mt-1">
                        <p className="text-center read-p">READ</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Categories  */}
        <div className="book-categories-section">
          <div className="row">
            <div className="col-md-4 col-sm-6 category">
              <div
                onClick={(e) => {
                  e.preventDefault();
                  navigate("/search", { state: { genre: "urban" } });
                }}
                style={{
                  background: `linear-gradient( rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2) ), url(${URBAN})`,
                }}
                className="book-category-image"
              >
                <p className="book-category-label">urban</p>
              </div>
            </div>

            <div className="col-md-4 col-sm-6 category">
              <div
                onClick={(e) => {
                  e.preventDefault();
                  navigate("/search", { state: { genre: "sci-fi" } });
                }}
                style={{
                  background: `linear-gradient( rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2) ), url(${SCIFI})`,
                }}
                className="book-category-image"
              >
                <p className="book-category-label">Sci-Fi</p>
              </div>
            </div>

            <div className="col-md-4 col-sm-6 category">
              <div
                onClick={(e) => {
                  e.preventDefault();
                  navigate("/search", { state: { genre: "fantasy" } });
                }}
                style={{
                  background: `linear-gradient( rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2) ), url(${FANTASY})`,
                }}
                className="book-category-image"
              >
                <p className="book-category-label">Fantasy</p>
              </div>
            </div>
          </div>
        </div>

        {/* Completed Novels  */}
        {completed?.length > 0 && (
          <div className="section-div complete_novels">
            <div className="section-heading-div">
              <p className="section-heading">COMPLETED NOVELS</p>
              <p
                className="view-all"
                onClick={() => {
                  navigate("/search", {
                    state: { contentStatus: "completed" },
                  });
                }}
              >
                VIEW ALL <FontAwesomeIcon icon={faAngleRight} />
              </p>
            </div>
            {/* </div> */}
            <div className="row">
              {window.screen.width > 1024
                ? completed?.map((item, idx) => (
                    <CompletedNovels
                      key={idx}
                      item={item}
                      isLoading={isLoading}
                      favoriteBookHandler={favoriteBookHandler}
                    />
                  ))
                : completed?.map((item, idx) => (
                    <CompletedNovels
                      key={idx}
                      item={item}
                      isLoading={isLoading}
                      favoriteBookHandler={favoriteBookHandler}
                    />
                  ))}
            </div>
          </div>
        )}

        {/* Recent Chapter Updates  */}
        <p className="recent-updates-label">Recent Chapter Updates</p>

        <div className="books-table mt-3 mb-5">
          <table className="table recent-update-table table-striped">
            <thead className="table-header">
              <tr>
                <th
                  scope="col"
                  className="pl-4 border-0 table-header-labels th-1"
                >
                  Book
                </th>
                <th scope="col" className="border-0 table-header-labels th-2">
                  Chapter
                </th>
                <th scope="col" className="border-0 table-header-labels th-2">
                  Time
                </th>
                <th scope="col" className="border-0"></th>
              </tr>
            </thead>
            <tbody>
              {booksReducer?.recentChapters?.map((item, idx) => (
                // <tr key={idx} className={(idx % 2 !== 0 && "color-border"}>
                <tr key={idx} className={`${idx % 2 !== 0 && "color-border"}`}>
                  <td className="border-0 ">
                    <p className="table-labels pl-4">{item?.book?.Title} </p>
                  </td>
                  <td className="border-0 ">
                    <p className="table-labels">{item?.name} </p>
                  </td>
                  <td className="border-0 ">
                    <p className="table-labels">
                      {moment(item?.createdAt).fromNow()}{" "}
                    </p>
                  </td>
                  <td className="border-0 read-div">
                    <p className="text-center read-p">
                      <a
                        onClick={async () => {
                          await getChapterContent(
                            item?._id,
                            item.book?._id,
                            authReducer?.userData?._id,
                            authReducer?.accessToken
                          );
                      

                          navigate(
                            `/ReadBookPage/${item.book?._id}/${item._id}`,
                            {
                              replace: true,
                              state: {
                                bookName: item.book?.Title,
                                bookImage: `${item.book?.Cover?.url}`,
                              },
                            }
                          );
                        }}
                      >
                        READ Now
                      </a>
                    </p>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <Footer />
      {/* </div> */}
    </>
  );
};

const mapstatetoprops = ({ authReducer, booksReducer, libraryReducer }) => {
  return { authReducer, booksReducer, libraryReducer };
};
export default connect(mapstatetoprops, actions)(HomePage);

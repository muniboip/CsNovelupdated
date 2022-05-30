import React, { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";
import { imageUrl } from "../config";
import * as actions from "../store/actions/actions";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import filledBookmark from "../Assets/filledbookmark.jpg";


function OngoingNovelsMapper({
  item,
  getBook,
  favoriteBookHandler,
  booksReducer,
  
  authReducer,
  deleteBookMark,
  getBookmarks,
  from,
}) {
  const navigate = useNavigate();
  const isLogin = authReducer?.isLogin;
  const [data, setdata] = useState();

  const deleteBookMarks = async () => {
    deleteBookMark(item?._id, authReducer.accessToken);
    getBookmarks(authReducer?.accessToken);
  };
  const [state, setstate] = useState(true);
  const key = true
  useEffect(() => {
    setdata(item);
  },[key]);
  useEffect(() => {
    setdata(
      booksReducer?.books?.filter((e) => {
        return e?._id === item?._id;
      })[0]
    );
  }, [state]);

  if (from === "Bookmarks") {
    return (
      <div className="col-lg-2 col-md-3 col-sm-4 og-books">
        <div
          className="og-image-and-text-container"
          onClick={() => {
            getBook(data);
            navigate(`/ReadBookPage/${data?.book?._id}/${data.chapter._id}`, {
              replace: true,
              state: {
                bookId: data?.book?._id,
                bookName: data?.book?.Title,
                bookImage: `${data?.book?.Cover?.url}`,
                chapterId: data.chapter._id,
              },
            });
          }}
        >
          <img src={` ${data?.book.Cover?.url}`} className="og-book-image" alt="og-book" />
          {/* <p className="mp-cs-text">CS</p> */}
          {/* <p className="og-book-status">{item.status} </p> */}
          {/* <p className="og-book-heading">{item.heading} </p> */}
        </div>
        <p className="og-book-title">
          {window.screen.width <= 768
            ? `${data?.book.Title.substring(0, 25)}...`
            : data?.book.Title?.length > 40
            ? `${data?.book.Title.substring(0, 40)}...`
            : data?.book.Title}
        </p>

        <div className="mp-book-chapters">
          <p className="mp-book-chapter-number">{data?.chapter?.name}</p>

          <span
            onClick={() => {
              deleteBookMarks();
            }}
          >
            {"   "}
            <img
            alt="fileedbookmark"
              src={filledBookmark}
              style={{ height: "30px", "margin-left": "10px" }}
            />
          </span>
        </div>
      </div>
    );
  } else {
    return (
      <div
        className="col-lg-2 col-md-3 col-sm-4 og-books"
        onClick={() => {
          getBook(data);
          navigate(`/book`, {
            replace: true,
            state: {
              book: data,
              bookId: data?._id,
              bookName: data?.Title,
              bookImage: `${imageUrl}/${data?.image?.name}`,
            },
          });
        }}
      >
        <div className="og-image-and-text-container">
          <img src={` ${data?.Cover?.url}`} className="og-book-image" alt="og-image"/>
          {/* <p className="mp-cs-text">CS</p> */}
          {/* <p className="og-book-status">{item.status} </p> */}
          {/* <p className="og-book-heading">{item.heading} </p> */}
        </div>
        <p className="og-book-title">
          {window.screen.width <= 768
            ? `${data?.Title.substring(0, 25)}...`
            : data?.Title?.length > 40
            ? `${data?.Title.substring(0, 40)}...`
            : data?.Title}
        </p>
        <div className="mp-book-chapters">
          <svg
            className="mp-book-chapter-icon"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 12 16"
          >
            <path d="M3,12h8c0.6,0,1-0.4,1-1V1c0-0.6-0.4-1-1-1H2C0.9,0,0,0.9,0,2v11c0,1.7,1.3,3,3,3h8c0.6,0,1-0.4,1-1 s-0.4-1-1-1H3c-0.6,0-1-0.4-1-1S2.4,12,3,12z" />
          </svg>
          <p className="mp-book-chapter-number">Chapters {data?.chapters}</p>
          <svg
            onClick={(e) => {
              e.stopPropagation();
              if (isLogin) {
                favoriteBookHandler(data._id);

                setstate(!state);
              } else {
                toast.info("Login Required!");
              }
            }}
            className={
              data?.isLike ? "mp-favorite-heart2" : "mp-favorite-heart"
            }
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <path d="M12 4.248c-3.148-5.402-12-3.825-12 2.944 0 4.661 5.571 9.427 12 15.808 6.43-6.381 12-11.147 12-15.808 0-6.792-8.875-8.306-12-2.944z" />
          </svg>
        </div>
      </div>
    );
  }
}

const mapstatetoprops = ({ authReducer, booksReducer, libraryReducer }) => {
  return { authReducer, booksReducer, libraryReducer };
};
export default connect(mapstatetoprops, actions)(OngoingNovelsMapper);

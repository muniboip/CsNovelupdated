
import "../Styles/clientStyles.css";
import React  from "react";
import CI from "./../Assets/Images/Categories Icon.svg";
import * as actions from "../store/actions/actions";
// import * as types from '../store/actions/actions'
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";

import { toast } from "react-toastify";
function MostWantedNovelsMapper({
  item,
  favoriteBookHandler,
  
  authReducer,
  getBook,
}) {
  
  
  const navigate = useNavigate();
  const isLogin = authReducer?.isLogin;
  
  

  return (
    <div className="most-popular-books mb-5">
      <div
        className="mp-image-and-text-container"
        onClick={() => {
          getBook(item);
          navigate(`/book`, {
            replace: true,
            state: {
              book:item,
              bookId: item?._id,
              bookName: item?.Title,
              bookImage: `${item?.Cover?.url}`,
            },
          });
        }}
      >
        <img
          src={`${item?.Cover?.url}`}
          className="mp-book-cover"
          alt="mp-book-cover"
        />
      </div>

      <div className="book-details">
        <p className="mp-book-title">
          {window.screen.width <= 768
            ? `${item?.Title?.substring(0, 30)}`
            : item?.Title?.length > 50
            ? `${item.Title.substring(0, 50)}`
            : item?.Title}
        </p>

        <div className="mp-book-category">
          <img src={CI} className="mp-book-cat-icon"  alt="mp-book"/>
          <p className="mp-book-category-tag">{item?.categories?.name}</p>
          {/* <p className="mp-book-status">{item?.rele}</p> */}
        </div>
        <p className="mp-book-description">
          {item?.Description?.length > 70
            ? `${item?.Description?.substring(0, 70)}`
            : item?.Description}
        </p>

        <div className="mp-book-chapters">
          <svg
            className="mp-book-chapter-icon"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 12 16"
          >
            <path d="M3,12h8c0.6,0,1-0.4,1-1V1c0-0.6-0.4-1-1-1H2C0.9,0,0,0.9,0,2v11c0,1.7,1.3,3,3,3h8c0.6,0,1-0.4,1-1 s-0.4-1-1-1H3c-0.6,0-1-0.4-1-1S2.4,12,3,12z" />
          </svg>
          <p className="mp-book-chapter-number">{`Chapters ${item?.chapters} `}</p>
          <svg
          onClick={(e) => {
            e.stopPropagation();


            if (isLogin) {
              favoriteBookHandler(item._id);
              
              
            } else {
              toast.info("Login Required!");
            }
          }}
          className={item?.isLike ? "mp-favorite-heart2" : "mp-favorite-heart"}
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
        >
          <path d="M12 4.248c-3.148-5.402-12-3.825-12 2.944 0 4.661 5.571 9.427 12 15.808 6.43-6.381 12-11.147 12-15.808 0-6.792-8.875-8.306-12-2.944z" />
        </svg>
        </div>
      </div>
    </div>
  );
}
const mapstatetoprops = ({ authReducer, booksReducer, libraryReducer }) => {
  return { authReducer, booksReducer, libraryReducer };
};
export default connect(mapstatetoprops, actions)(MostWantedNovelsMapper);
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faThLarge, faBook } from "@fortawesome/free-solid-svg-icons";

// import React from "react";

// function MostWantedNovelsMapper({ item, onClick }) {
//   return (
//     <div className="col-lg-4 col-md-6 col-sm-6 most-wanted-books">
//       <div className="mp-image-and-text-container">
//         <img src={item.image} className="mp-book-image" />
//         <p className="mp-cs-text">CS</p>
//         <p className="mp-book-status">{item.status} </p>
//         <p className="mp-book-heading">{item.heading} </p>
//       </div>
//       <div className="book-details">
//         <p className="mp-book-title">
//           {window.screen.width <= 768
//             ? `${item.title.substring(0, 30)}...`
//             : item.title.length > 50
//             ? `${item.title.substring(0, 50)}...`
//             : item.title}
//         </p>
//         <p className="mp-book-category">
//           <FontAwesomeIcon icon={faThLarge} /> {item.category}
//         </p>
//         <p className="mp-book-description">
//           {item.description.length > 70
//             ? `${item.description.substring(0, 70)}...`
//             : item.description}
//         </p>
//         <p className="mp-book-chapters">
//           <FontAwesomeIcon icon={faBook} /> {`${item.chapters} Chapters`}
//         </p>
//       </div>
//     </div>
//   );
// }

// export default MostWantedNovelsMapper;

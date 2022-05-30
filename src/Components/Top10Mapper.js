import React from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import StarRatings from "react-star-ratings";
import { imageUrl } from "../config";
import * as actions from "../store/actions/actions";

function Top10Mapper({ authReducer, item, index, onClick, getBook }) {
  const navigate = useNavigate();
  
  return (
    <div
      className="top10Books"
      onClick={() => {
        getBook(item);
        navigate(`/book`, {
          replace: true,
          state: {
            book: item,
            bookId: item?._id,
            bookName: item?.Title,
            bookImage: `${imageUrl}/${item?.image?.name || item?.Cover?.name}`,
          },
        });
      }}
    >
      <img  src={`${ item?.Cover?.url}`} className="top10-image" />
      <p className={`top10BookColor_${index + 1}`}>
        {index + 1 < 10 ? `0${index + 1}` : index + 1}
      </p>
      <div className="top10Books-details">
        <p className="top10-book-title">{item?.Title}</p>
        <p className="top10-book-genre">{item?.categories?.name}</p>
        <div className="star-and-rating">
          <StarRatings
            starDimension={"12"}
            rating={item?.avgRate}
            starRatedColor="#ffc240"
            numberOfStars={4}
            name="rating"
          />
          <p className="top10-book-rating">{item.totalRates}</p>
        </div>
      </div>
    </div>
  );
}

const mapstatetoprops = ({ authReducer, booksReducer }) => {
  return { authReducer, booksReducer };
};
export default connect(mapstatetoprops, actions)(Top10Mapper);

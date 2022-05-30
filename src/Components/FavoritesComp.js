import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import OngoingNovelsMapper from "./OngoingNovelsMapper";
import BOOK_CARD from "../Assets/Images/book-card.png";
import { connect } from "react-redux";


function FavoritesComp({ title, books ,accessToken,favoriteBookHandler}) {
  const [isLoading, setIsLoading] = useState(false);
  
  // const favoriteBookHandler = (item) => {
  
  //   const data = {
  //     bookId: item,
  //   };
    
    
  //   favoriteThisBook(data, accessToken, "favoritedBooks")
  // };

  return (
    <div className="section-div ongoing_novel">
      <div className="section-heading-div">
        <p className="section-heading">{title || "MY FAVORITES"}</p>
      </div>

      {/* </div> */}
      <div className="row row-425 spacing-adjust">
        {books?.map((item, idx) => (
          <OngoingNovelsMapper
            key={idx}
            item={item}
            favoriteBookHandler={favoriteBookHandler}
           from = "favoritedbooks"
          />
        ))}
      </div>
    </div>
  );
}

export default FavoritesComp;

import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import RenderBookmarks from "./RenderBookmarks";
import BOOK_CARD from "../Assets/Images/book-card.png";
import { connect } from "react-redux";
import OngoingNovelsMapper from "./OngoingNovelsMapper";
import { favoriteThisBook, getBookmarks } from "../store/actions/actions";

function BookmarksComp({ booksReducer,authReducer, title}) {
useEffect(()=>{
  getBookmarks(authReducer.accessToken)
},[])
const [isLoading, setIsLoading] = useState(false);


const favoriteBookHandler = (_id) => {
  const data = {
    bookId: _id,
  };

  setIsLoading(true);
  favoriteThisBook(data, authReducer.accessToken, "favoritedBooks")
};

  const bookmarks = booksReducer.bookmarks;

//   {
//     Cover:{url:item.book.Cover.url},
//     _id:item.book._id,
//     Title:item.book.Title,
//     chapter:item.chapter
// }
  return (
    <div className="section-div ongoing_novel">
      <div className="section-heading-div">
        <p className="section-heading">{title || "BOOKMARKS"}</p>
      </div>

      <div className="row row-425 spacing-adjust">
        {bookmarks?.length > 0 ? bookmarks.map((item, idx) => (
           
          <OngoingNovelsMapper
            key={idx}
            item={item}          
            favoriteBookHandler={favoriteBookHandler}
            from="Bookmarks"

          />
        ))
        :
        <h3 className="mt-5 mb-5">No Bookmarks</h3>
      
      }
      </div>
    </div>
  );
}

const mapStateToProps = ({ booksReducer,authReducer,libraryReducer }) => {
  return {
    booksReducer,authReducer,libraryReducer
  };
};
export default connect(mapStateToProps, null)(BookmarksComp);

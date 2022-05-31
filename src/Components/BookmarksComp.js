
import React, { useEffect, useState } from "react";

import { connect } from "react-redux";
import OngoingNovelsMapper from "./OngoingNovelsMapper";
import { favoriteThisBook, getBookmarks } from "../store/actions/actions";
import { useSearchParams } from "react-router-dom";

function BookmarksComp({ booksReducer,authReducer, title}) {
  const key = false
useEffect(()=>{
  getBookmarks(authReducer.accessToken)
},[key]) 



const favoriteBookHandler = (_id) => {
  const data = {
    bookId: _id,
  };


  favoriteThisBook(data, authReducer.accessToken, "favoritedBooks")
};
const [bookmarks,setbookmarks]=useState(booksReducer.bookmarks)
useEffect(() => {
  console.log("///");
  setbookmarks(booksReducer.bookmarks)
},[booksReducer.bookmarks])
  

//   {
//     Cover:{url:item.book.Cover.url},
//     _id:item.book._id,
//     Title:item.book.Title,
//     chapter:item.chapter
// }
console.log(bookmarks);
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

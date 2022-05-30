import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { connect } from "react-redux";

import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import * as actions from "../store/actions/actions"
function HeaderSearch({ getSearchedBooks, authReducer, text, setText }) {
  const navigate = useNavigate();
  const userId = authReducer?.userData?._id;
  const _isEnterKeyPressed = (e) => {
    if (e.charCode === 13) {


      getSearchedBooks(text, userId);

      navigate("/bookSearch");
    }
  };
  return (
    <div className="search-container">
      <svg className="search-icon" xmlns="http://www.w3.org/2000/svg" viewBox="20">
        <path
          className="st0"
          d="M8.1,0c1,0,2,0.2,3,0.6c0.7,0.3,1.4,0.7,2.1,1.2C13.4,2,13.7,2.3,14,2.6c0.2,0.3,0.5,0.6,0.7,0.8 c0.5,0.7,1,1.6,1.2,2.5c0.1,0.5,0.2,0.9,0.3,1.4c0,0.4,0,0.8,0,1.3C16.1,9,16,9.4,16,9.8c-0.1,0.5-0.3,1-0.5,1.5 c-0.3,0.6-0.6,1.2-1.1,1.8l0,0c-0.1,0.2-0.1,0.2,0,0.3l1.1,1.1c0.3,0.3,0.6,0.7,1,1l1,1c0.3,0.3,0.7,0.7,1,1 c0.2,0.2,0.4,0.4,0.6,0.7c0.4,0.4,0.4,1.1,0,1.5c-0.1,0.1-0.1,0.1-0.2,0.2c-0.4,0.2-0.8,0.1-1.1-0.1c-0.1-0.1-0.2-0.2-0.3-0.3 l-0.2-0.3l-1.6-1.6l-0.9-1l-1-1.1c-0.2-0.3-0.5-0.5-0.7-0.8c-0.1-0.1-0.2-0.1-0.3,0c-0.6,0.4-1.3,0.8-2.1,1 c-0.6,0.2-1.2,0.3-1.8,0.3c-0.3,0-0.5,0-0.8,0c-0.5,0-1.1-0.1-1.6-0.2c-0.7-0.1-1.3-0.4-1.9-0.7c-0.5-0.3-1.1-0.6-1.5-1 c-0.3-0.3-0.6-0.5-0.9-0.8c-0.2-0.3-0.4-0.5-0.6-0.8c-0.4-0.5-0.7-1.1-0.9-1.8c-0.2-0.5-0.3-1.1-0.4-1.6c0-0.2,0-0.4-0.1-0.6 c0-0.2,0-0.3,0-0.5c0-0.5,0.1-1,0.1-1.4c0.1-0.7,0.3-1.4,0.6-2C1.4,3.2,2.5,2,3.9,1.2c0.6-0.4,1.3-0.7,2-0.9 c0.4-0.1,0.8-0.2,1.2-0.2C7.5,0,7.8,0,8.1,0z M8.1,2.1C6.5,2.1,5,2.7,3.9,3.8C2.7,4.9,2.1,6.5,2.1,8.1c0,1.5,0.5,2.9,1.5,4 c1.1,1.3,2.7,2,4.4,2c1.6,0.1,3.2-0.6,4.4-1.7c1.1-1.1,1.8-2.6,1.8-4.2c0-1.6-0.6-3.1-1.7-4.2C11.3,2.7,9.7,2.1,8.1,2.1z"
        />
      </svg>
      <input
        className="search-textInput"
        value={text}
        placeholder="Search..."
        onChange={(e) => setText(e.target.value)}
        // onChange={(e) => _onChangeSearch(e)}
        onKeyPress={(e) => _isEnterKeyPressed(e)}
      />
    </div>
  );
}

const mapStateToProps = ({ booksReducer, authReducer }) => {
  return {
    booksReducer,
    authReducer,
  };
};

export default connect(mapStateToProps, actions)(HeaderSearch);



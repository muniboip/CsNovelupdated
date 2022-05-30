import { faBook, faThLarge } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import THREE_LINES from "../Assets/Images/three-lines.png";
import BOOK_CARD from "../Assets/Images/book-card.png";

function FreeBookComp() {
  const freeBookOfWeek = {
    _id: 1,
    title:
      "Book Title Goes Here On Even Two Lines Test Test Test Test Test Test Test Two Lines Even Test Test Test Test Test Test Test",
    category: "urban",
    heading: "great marshal",
    chapters: 3471,
    status: "completed",
    image: BOOK_CARD,
    description:
      "Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placeholder before final copy is available  Lorem ipsum may be used as a placeholder before final copy is available..",
  };

  return (
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
                  <p className="free-book-status">{freeBookOfWeek.status} </p>
                  <p className="free-book-heading">{freeBookOfWeek.heading}</p>
                  <p className="mp-cs-text">CS</p>
                </div>
                <img src={freeBookOfWeek.image} className="free-book-image" />
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
                  <FontAwesomeIcon icon={faThLarge} /> {freeBookOfWeek.category}
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
  );
}

export default FreeBookComp;

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../src/Styles/Header.css";
import "react-toastify/dist/ReactToastify.css";
import "../src/Styles/Footer.css";
import "../src/Styles/Style.css";
import "../src/Styles/clientStyles.css";
import "../src/Styles/Subciption.css";
import "../src/Styles/BookSearch.css";

import "./css/style.css";
// import '../../cannedsplam/src/App.css'
import "../src/App.css";
import "./Styles/ProfilePage.css";
// import HomePage from "./Pages/HomePage";
import FilterBooks from "./Pages/FilterBooks";
import HomePage from "./Pages/HomePage";
import Library from "./Pages/Library";
import Books from "./Pages/books";
import ReadBookPage from "./Pages/ReadBookPage";
import Subscription from "./Pages/Subscription";
import BookSearch from "./Pages/BookSearch";
// import ProfilePage from "./Pages/ProfilePage"
import ProfilePage from "./Pages/Profile/ProfilePage";
import { Provider } from "react-redux";
import { store, persistor } from "./store/index";
import { PersistGate } from "redux-persist/integration/react";
import { ToastContainer } from "react-toastify";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { RefundPolicy } from "./Pages/RefundPolicy";
import { UserAgreement } from "./Pages/UserAgreement";
import { PrivacyPolicy } from "./Pages/PrivacyPolicy";
import AddComponent from "./Components/Advertisement";


function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ToastContainer />
        <Router>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/search" element={<FilterBooks />} />
            <Route path="/bookSearch" element={<BookSearch />} />
            <Route path="/library" element={<Library />} />
            <Route path="/book" element={<Books />} />
            <Route path="/ReadBookPage/:boookid/:chapterid" element={<ReadBookPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/subscription" element={<Subscription />} />
            <Route path="UserAgreement" element={<UserAgreement />} />
            <Route path="RefundPolicy" element={<RefundPolicy />} />
            <Route path="PrivacyPolicy" element={<PrivacyPolicy />} />
            <Route path="/add" element={<AddComponent/>}/>

            {/* <Route path="/search">
          <FilterBooks />
        </Route> */}
          </Routes>
        </Router>
      </PersistGate>
    </Provider>
  );
}

export default App;

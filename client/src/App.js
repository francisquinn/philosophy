import React from "react";
/** Pages */
import Home from "./pages/home.page";
import About from "./pages/about.page";
import Topics from "./pages/topic/topics.page";
import Discussions from "./pages/discussion/discussion.page";
import DiscussionDetails from "./pages/discussion/discussion.details";
import TopicDetailsPage from "./pages/topic/topic.details";
/** Components */
import NavMenu from "./components/navigation/nav-menu.component";
import NavBar from "./components/navigation/navbar.component";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PopUpWindow from "./components/utils/popup.component";

function App() {
  return (
    <Router>
      <div className="popup-container">
        <PopUpWindow />
      </div>
      <div className="App container" id="app-body">
        <div className="row">
          <div className="col">
            <NavBar />
          </div>
        </div>
        <div className="row">
          <div className="col col-lg-9 col-md-8 col-sm-8 col-12">
            <div className="route-view">
              {/* router */}
              <Routes>
                <Route path="/about" element={<About />} />
                <Route path="/topics" element={<Topics />} />
                <Route path="/topics/:topic_url" element={<TopicDetailsPage />} />
                <Route
                  path="/topics/:topic_url/discussions"
                  element={<Discussions />}
                />
                <Route
                  path="/topics/:topic_url/discussions/:discussion_id"
                  element={<DiscussionDetails />}
                />
                <Route path="/" element={<Home />} />
              </Routes>
            </div>
          </div>
          <div className="col col-lg-3 col-md-4 col-sm-4 col-12">
            <NavMenu />
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;

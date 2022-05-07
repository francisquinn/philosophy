import React, { Suspense } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NavBar from './components/navigation/navbar.component';
import NavMenu from './components/navigation/nav-menu.component';
/** Hooks */
import useUserLoggedStatus from "./hooks/useLoggedStatus";

/** Pages */
const Home = React.lazy(() => import("./pages/home.page"));
const About = React.lazy(() => import('./pages/about.page'));
const Topics = React.lazy(() => import('./pages/topic/topics.page'));
const TopicDetailsPage = React.lazy(() => import('./pages/topic/topic.details'));
const Discussions = React.lazy(() => import('./pages/discussion/discussion.page'));
const DiscussionDetails = React.lazy(() => import('./pages/discussion/discussion.details'));

/** Components */
const PopUpWindow = React.lazy(() => import('./components/utils/popup.component'));

function App() {
  useUserLoggedStatus();
  return (
    <Router>
      <div className="popup-container">
        <Suspense fallback={'<div>Loading...</div>'}>
          <PopUpWindow />
        </Suspense>
      </div>
      <div className="App container bg-info" id="app-body">
        <div className="row">
          <div className="col-12-xl col-12-lg col-12-md col-12-sm col-12-xs">
            <NavBar />
          </div>
        </div>
        <div className="row">
          <div className="col col-lg-9 col-md-8 col-sm-8 col-12">
            <div className="route-view">
              {/* router */}
              <Suspense fallback={'<div>Loading...</div>'}>
                <Routes>
                  <Route path="/about" element={<About />} />
                  <Route path="/topics" element={<Topics />} />
                  <Route path="/topics/:topic_url" element={<TopicDetailsPage />} />
                  <Route
                    path="/topics/:topic_url/discussions"
                    element={<Discussions />}
                  />
                  <Route
                    path="/topics/:topic_url/discussions/:discussion_url"
                    element={<DiscussionDetails />}
                  />
                  <Route path="/" element={<Home />} />
                </Routes>
              </Suspense>
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

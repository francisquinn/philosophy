import React, { Suspense } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NavBar from './components/navigation/navbar.component';
import NavMenu from './components/navigation/nav-menu.component';
import { useSelector } from "react-redux";
/** Hooks */
import useUserLoggedStatus from "./hooks/useLoggedStatus";


/** Pages */
const Discover = React.lazy(() => import("./pages/discover.page"));
const About = React.lazy(() => import('./pages/about.page'));
const Books = React.lazy(() => import('./pages/books.page'));
const Philosophers = React.lazy(() => import('./pages/philosophers.page'));
const Topics = React.lazy(() => import('./pages/topic/topics.page'));
const TopicDetailsPage = React.lazy(() => import('./pages/topic/topic.details'));
const Discussions = React.lazy(() => import('./pages/discussion/discussion.page'));
const DiscussionDetailsPage = React.lazy(() => import('./pages/discussion/discussion.details'));


/** Components */
const PopUpWindow = React.lazy(() => import('./components/utils/popup.component'));

function App() {
  const initLoad = useSelector((state) => state.app.loading); // TODO extract site loading logic from user
  useUserLoggedStatus();
  return (
    <>
      { initLoad ? (
        <h1>loading</h1>
      ) : (
        <Router>
          <Suspense fallback={'<div>Loading...</div>'}>
            <PopUpWindow />
          </Suspense>
          <div className="App container" id="app-body">
            <div className="row">
              <div className="col-100">
                <NavBar />
              </div>
            </div>
            <div className="row gap-1">
              <div className="col-xl-10 col-lg-9 col-md-9 col-sm-9 col-xs-12">
                <div className="route-view">
                  {/* router */}
                  <Suspense fallback={'<div>Loading...</div>'}>
                    <Routes>
                      <Route path="/books" element={<Books />} />
                      <Route path="/philosophers" element={<Philosophers />} />
                      <Route path="/about" element={<About />} />
                      <Route path="/topics" element={<Topics />} />
                      <Route path="/topics/:topic_url" element={<TopicDetailsPage />} />


                      <Route path="/topics/:topic_url/discussions" element={<Discussions />} />
                      <Route path="/topics/:topic_url/:discussion_url" element={<DiscussionDetailsPage />} />
                      <Route path="/" element={<Discover />} />
                    </Routes>
                  </Suspense>
                </div>
              </div>
              <div className="col-xl-2 col-lg-3 col-md-3 col-sm-3 col-xs-12">
                <NavMenu />
              </div>
            </div>
          </div>
        </Router>
      ) }
      
    </>
  );
}

export default App;

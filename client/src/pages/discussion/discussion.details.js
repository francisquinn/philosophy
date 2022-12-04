import DiscussionHeader from "../../components/discussion/discussion-header.component";
import { useParams } from "react-router-dom";
import { retrieveDiscussionByUrl, setCurrentDiscussion } from "../../slices/discussion.slice";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
// import { togglePopUpWindow } from "../../slices/popup.slice";
import useDispatchHandler from "../../hooks/useDispatchHandler";

const DiscussionDetailsPage = () => {
  const { topic_url, discussion_url } = useParams();
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const discussionState = state.discussions;
  // const userState = state.user;
  const { handle, isLoading, error } = useDispatchHandler();
  
  useEffect(() => {
    // TODO: cleanup function
    const controller = new AbortController();

    if (!discussionState.list[topic_url]) {
      handle(retrieveDiscussionByUrl({ topic_url, discussion_url, signal: controller.signal }), {});
      return () => controller.abort();
    }
    // retrieve from store & set topic
    for (const discussion of state.discussions.list[topic_url]) {
      if (discussion.url === discussion_url) {
        dispatch(setCurrentDiscussion(discussion));
        return;
      }
    }
    // eslint-disable-next-line
}, [discussionState.list, topic_url, discussion_url]);

  return (
    <div>
      { isLoading ? <h1>Loading discussion details...</h1> : <DiscussionHeader discussion={ discussionState.current } /> }
      {error && <h1>{error}</h1>}

      {/* TODO create edit component */}
      {/* <>
      {discussionState.current.author === userState.username && (
        <div>
          <button onClick={() => dispatch(togglePopUpWindow({ component: "EDIT" }))}>edit</button>
          <button onClick={() => dispatch(togglePopUpWindow({ component: "DELETE" }))}>delete</button>
        </div>
      )}
      </> */}
    </div>
  );
};

export default DiscussionDetailsPage;

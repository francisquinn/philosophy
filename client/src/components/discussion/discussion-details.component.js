import { retrieveDiscussionByUrl, setCurrentDiscussion } from "../../slices/discussion.slice";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { togglePopUpWindow } from "../../slices/popup.slice";
import useDispatchHandler from "../../hooks/useDispatchHandler";

const DiscussionDetails = (props) => {
  const { topic_url } = props;
  const discussion_url = props.discussion_url;
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const discussion = state.discussions.current;
  const user = state.user.info;
  const { handle, isLoading, error } = useDispatchHandler();
  
  useEffect(() => {
    console.log("useEffect ran")
    if (!state.discussions.list.length) {
      handle(retrieveDiscussionByUrl({ topic_url, discussion_url }), {});
      return;
    }
    // retrieve from store & set topic
    for (const topicDiscussions of state.discussions.list) {
      for (const d of Object.values(topicDiscussions)[0]) {
        if (d.url === discussion_url) {
          dispatch(setCurrentDiscussion(d));
          return;
        }
      }
    }
    // eslint-disable-next-line
}, [state.discussions.list, topic_url, discussion_url]);

  return (
    <div>
      {isLoading && <h1>Loading...</h1>}
      {error && <h1>{error}</h1>}
      <>
      {discussion.author === user.username && (
        <div>
          <button onClick={() => dispatch(togglePopUpWindow({ component: "EDIT" }))}>edit</button>
          <button onClick={() => dispatch(togglePopUpWindow({ component: "DELETE" }))}>delete</button>
        </div>
      )}
      </>
      <h2>{discussion.title}</h2>
      <span>{discussion.description}</span>
      <p>{discussion.author}</p>
    </div>
  );
};

export default DiscussionDetails;

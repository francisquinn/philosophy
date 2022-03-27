import { retrieveDiscussionByUrl, setCurrentDiscussion } from "../../slices/discussion.slice";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { togglePopUpWindow } from "../../slices/popup.slice";

const DiscussionDetails = (props) => {
  const topic_url = props.topic_url;
  const discussion_url = props.discussion_url;
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const discussion = state.discussions.current;
  const user = state.user.info;
  
  useEffect(() => {
    if (!(state.discussions.list.length > 0)) {
      dispatch(retrieveDiscussionByUrl({ topic_url, discussion_url }));
      return;
    }
    // retrieve from store & set topic
    for (const d of state.discussions.list) {
      if (d.url === discussion_url) {
        dispatch(setCurrentDiscussion(d));
        return;
      }
    }
}, [dispatch, props, discussion, state.discussions.list, topic_url, discussion_url]);

  return (
    <div>
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

import { retrieveDiscussionById, setCurrentDiscussion } from "../../slices/discussion.slice";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { togglePopUpWindow } from "../../slices/popup.slice";

const DiscussionDetails = (props) => {
  const topic_url = props.topic_url;
  const discussion_id = props.discussion_id;
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const discussion = state.discussions.current;
  const user = state.user.info;
  
  useEffect(() => {
    if (!(state.discussions.list.length > 0)) {
      dispatch(retrieveDiscussionById({ topic_url, discussion_id }));
      return;
    }
    // retrieve from store & set topic
    for (const d of state.discussions.list) {
      if (d._id === discussion_id) {
        dispatch(setCurrentDiscussion(d));
        return;
      }
    }
}, [dispatch, props, state.discussions.list, topic_url, discussion_id]);

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

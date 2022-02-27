import { retrieveDiscussionById, setCurrentDiscussion } from "../../slices/discussion.slice";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const DiscussionDetails = (props) => {
  const topic_url = props.topic_url;
  const discussion_id = props.discussion_id;
  const dispatch = useDispatch();
  const state = useSelector((state) => state.discussions);
  const discussion = state.discussion;
  
  useEffect(() => {
    if (state.discussions.length > 0) {
        // retrieve from store & set topic
        for (const d of state.discussions) {
          if (d._id === discussion_id) {
            dispatch(setCurrentDiscussion(d));
            return;
          }
        }
    } else {
        // retrieve from api
        dispatch(retrieveDiscussionById({ topic_url, discussion_id }));
    }
}, [dispatch, props, state.discussions, topic_url, discussion_id]);


  return (
    <div>
      <h1>discussion details </h1>
      <h2>{discussion.title}</h2>
      <span>{discussion.description}</span>
    </div>
  );
};

export default DiscussionDetails;

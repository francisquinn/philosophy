import { retrieveDiscussionById } from "../../slices/discussion.slice";
import { useParams } from "react-router-dom";

const DiscussionDetails = () => {
  const { topic_url, discussion_id } = useParams();
  // const {
  //   data: discussion,
  //   isLoading,
  //   isError,
  // } = useDispatchRequest(retrieveDiscussionById({ topic_url, discussion_id }));

  return (
    <div>
      <h1>discussion details </h1>
      {/* <h2>{discussion.title}</h2>
      <span>{discussion.description}</span> */}
    </div>
  );
};

export default DiscussionDetails;

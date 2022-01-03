import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { retrieveTopicDiscussions } from "../../slices/discussion.slice";
import useDispatchRequest from "../../hooks/useDispatchRequest";

const DiscussionList = () => {
  const { topic_url } = useParams();
  const {
    data: discussions,
    isLoading,
    isError,
  } = useDispatchRequest(retrieveTopicDiscussions(topic_url));
  return (
    <div>
      {isLoading && <h1>Loading...</h1>}
      {isError && <h1>Error...</h1>}
      <h1>List discuss</h1>
      {discussions &&
        discussions.map((discussion, index) => (
          <Link to={`/topics/${topic_url}/discussions/${discussion._id}`} key={index}>
            <h3>{discussion.title}</h3>
          </Link>
        ))}
    </div>
  );
};

export default DiscussionList;

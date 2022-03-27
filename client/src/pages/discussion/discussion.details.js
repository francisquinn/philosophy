import DiscussionDetails from "../../components/discussion/discussion-details.component";
import { useParams } from "react-router-dom";

const DiscussionDetailsPage = () => {
  const { topic_url, discussion_url } = useParams();

  return (
    <div>
      <h1>discussion detail</h1>
      <DiscussionDetails topic_url={ topic_url } discussion_url={ discussion_url }/>
    </div>
  );
};

export default DiscussionDetailsPage;

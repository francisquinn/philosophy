import { useParams } from "react-router-dom";
import TopicDetails from "../../components/topic/topic-details.component";

const TopicDetailsPage = () => {
  const { topic_url } = useParams();
  return (
    <div>
      <h1>Topics details page</h1>
      <TopicDetails topic_url={topic_url} />
    </div>
  );
  
};

export default TopicDetailsPage;

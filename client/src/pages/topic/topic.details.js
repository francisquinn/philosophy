import { useParams } from "react-router-dom";
import TopicDetails from "../../components/topic/topic-details.component";
import { useSelector } from "react-redux";
import PageTitle from "../../components/utils/page-title.component";

const TopicDetailsPage = () => {
  const { topic_url } = useParams();
  const state = useSelector((state) => state.topics);
  return (
    <>
      <PageTitle title={ state.topic.title } />
      <div className="page-content">
        <TopicDetails topic_url={topic_url} />
      </div>
    </>
  );
  
};

export default TopicDetailsPage;

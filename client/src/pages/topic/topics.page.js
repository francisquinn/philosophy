import React from "react";
import TopicCard from "../../components/topic/topic-card.component";
import PageTitle from "../../components/utils/page-title.component";
import { useSelector  } from "react-redux";
import { retrieveTopics } from "../../slices/topic.slice";
import { useEffect } from "react";
import useDispatchHandler from "../../hooks/useDispatchHandler";

const Topics = () => {
  const { handle, isLoading, error } = useDispatchHandler();
  const topicState = useSelector((state) => state.topics);
  const topics = topicState.list;

  useEffect(() => {
    console.log('ue eff ran')
    if (!topics.length) {
      handle(retrieveTopics(), {});
    }
    // eslint-disable-next-line
  }, [topics.length]);
  return (
    <>
      {error && <h1>{ error }</h1>}
      <PageTitle title="Topics" />
      <div className="page-content">
      {isLoading ? <h1>Loading...</h1> : <TopicCard topics={ topics } /> }
      </div>
    </>
  );
};

export default Topics;

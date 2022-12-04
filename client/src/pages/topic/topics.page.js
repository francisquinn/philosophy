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
    const controller = new AbortController();

    if (!topics.length) {
      handle(retrieveTopics(controller.signal), {});
    }

    return () => controller.abort();
    // eslint-disable-next-line
  }, [topics.length]);
  return (
    <>
      {error && <h1>{ error }</h1>}
      <PageTitle title="Topics" />
      <div className="page-content">
      {isLoading ? (
        <h1>Loading topics...</h1>
        ) : (
          <>
            <div className="row gap-1" data-topic-cards>
              {topics.map((topic, index) => (
                <div className="col-xs-12 col-sm-6 col-md-4 col-xl-3" key={ index }>
                   <TopicCard topic={ topic } />
                </div>
              )) }
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Topics;

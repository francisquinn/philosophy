import React from "react";
import TopicsList from "../../components/topic/topic-all.component";
//const TopicsList = React.lazy(() => import('../../components/topic/topic-all.component'));

const Topics = () => {
  return (
    <div>
      <h1>Topics page</h1>
      <TopicsList />
    </div>
  );
};

export default Topics;

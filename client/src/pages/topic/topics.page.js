import React from "react";
import TopicsList from "../../components/topic/topic-all.component";
import PageTitle from "../../components/utils/page-title.component";
//const TopicsList = React.lazy(() => import('../../components/topic/topic-all.component'));

const Topics = () => {
  return (
    <>
      <PageTitle title="Topics" />
      <div className="page-content">
        <TopicsList />
      </div>
    </>
  );
};

export default Topics;

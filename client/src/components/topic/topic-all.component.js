import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { retrieveTopics } from "../../slices/topics";

const Topics = () => {
  const [topics, setTopics] = useState([]);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(retrieveTopics())
      .then((res) => {
        setTopics(res.payload);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [dispatch]);

  return (
    <div>
      <h1>create</h1>
      <ul>
        {topics.map((topic, index) => (
          <li key={index}>{topic.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default Topics;

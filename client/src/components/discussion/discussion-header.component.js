const DiscussionHeader = ({ discussion }) => {
  return (
    <div>
      <h2>{discussion.title}</h2>
      <span>{discussion.description}</span>
      <p>author: {discussion.author}</p>
    </div>
  );
};

export default DiscussionHeader;

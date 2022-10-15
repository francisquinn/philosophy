import { deleteTopicDiscussion } from "../../slices/discussion.slice";
import useDispatchHandler from "../../hooks/useDispatchHandler";
// import { useSelector } from "react-redux";

const DeleteDiscussion = (discussion) => {
    const { handle, isLoading, error, response } = useDispatchHandler();

    const deleteDiscussion = () => {
        handle(deleteTopicDiscussion({
            discussion_id: discussion.current._id,
            topic_url: discussion.current.topic_url
        }), { popDown: true, nav: true });
    };

    return (
        <div>
            <p>Are you sure you want to delete <span>{discussion.current.title}</span>?</p>
            <button onClick={ () => deleteDiscussion() }>Yes</button>
            {response && <p>{ response.message }</p>}
            {isLoading && <h1>Loading...</h1>}
            {error && <h1>{error}</h1>}
        </div>
    );
};

export default DeleteDiscussion;

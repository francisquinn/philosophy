import { useDispatch } from "react-redux";
import { deleteTopicDiscussion } from "../../slices/discussion.slice";

const DeleteDiscussion = (discussion) => {
    const dispatch = useDispatch();

    const deleteDiscussion = () => {
        dispatch(deleteTopicDiscussion({
            discussion_id: discussion.current._id
        }));
    };

    return (
        <div>
            <p>Are you sure you want to delete <span>{discussion.current.title}</span>?</p>
            <button onClick={ () => deleteDiscussion() }>Yes</button>
        </div>
    );
};

export default DeleteDiscussion;

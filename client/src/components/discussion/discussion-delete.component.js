import { useDispatch } from "react-redux";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { deleteTopicDiscussion } from "../../slices/discussion.slice";
import { togglePopUpWindow } from "../../slices/popup.slice";

const DeleteDiscussion = (discussion) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [response, setResponse] = useState(null);

    const deleteDiscussion = () => {
        dispatch(deleteTopicDiscussion({
            discussion_id: discussion.current._id
        }))
        .then((res) => {
            const status = res.payload.status;
            if (status !== 200) {
                setResponse(res.payload.message);
                return;
            }
            setResponse(res.payload.message);
            setTimeout(() => {
                navigate(-1);
                dispatch(togglePopUpWindow({ component: null }));
            }, 2000)
        });
    };

    return (
        <div>
            <p>Are you sure you want to delete <span>{discussion.current.title}</span>?</p>
            <button onClick={ () => deleteDiscussion() }>Yes</button>
            <p>{ response }</p>
        </div>
    );
};

export default DeleteDiscussion;

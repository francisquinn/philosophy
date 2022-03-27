import { useSelector, useDispatch } from "react-redux";
import { useRef, useState } from "react";
import { updateTopicDiscussion } from "../../slices/discussion.slice";
import { togglePopUpWindow } from "../../slices/popup.slice";

const EditDiscussion = (discussion) => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user);
    const title = useRef(discussion.current.title);
    const description = useRef(discussion.current.description);
    const [response, setResponse] = useState(null);

    const updateDiscussion = () => {
        // check if values change
        dispatch(updateTopicDiscussion({
            discussion_id: discussion.current._id,
            title: title.current.value,
            description: description.current.value,
        }))
        .then((res) => {
            const status = res.payload.status;
            if (status !== 200) {
                setResponse(res.payload.message);
                return;
            }
            setResponse(res.payload.message);
            setTimeout(() => {
                dispatch(togglePopUpWindow({ component: null }));
            }, 2000);
        });
    };

    return (
        <div>
            {!user.isLoggedIn ? (
                <p>no access sir</p>
            ) : (
                <div>
                    <h1>Edit discussion</h1>
                    <input type="text" placeholder="title" defaultValue={discussion.current.title} ref={title} />
                    <br />
                    <input type="text" placeholder="description" defaultValue={discussion.current.description} ref={description} />
                    <br />
                    <input type="submit" value="Submit" onClick={ () => updateDiscussion() } />
                    <p>{ response }</p>
                </div>
            )}
        </div>
    );
};

export default EditDiscussion;

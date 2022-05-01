import { useRef } from "react";
import { updateTopicDiscussion } from "../../slices/discussion.slice";
import useDispatchHandler from "../../hooks/useDispatchHandler";

const EditDiscussion = (discussion) => {
    const title = useRef(discussion.current.title);
    const description = useRef(discussion.current.description);
    const { handle, isLoading, error, response } = useDispatchHandler();

    const updateDiscussion = () => {
        // TODO check if values change
        handle(updateTopicDiscussion({
            discussion_id: discussion.current._id,
            title: title.current.value,
            description: description.current.value,
        }), { popDown: true })
    };

    return (
        <div>
            <h1>Edit discussion</h1>
            <input type="text" placeholder="title" defaultValue={discussion.current.title} ref={title} />
            <br />
            <input type="text" placeholder="description" defaultValue={discussion.current.description} ref={description} />
            <br />
            <input type="submit" value="Submit" onClick={ () => updateDiscussion() } />
            {response && <p>{ response.message }</p>}
            {isLoading && <h1>Loading...</h1>}
            {error && <h1>{error}</h1>}
        </div>
    );
};

export default EditDiscussion;

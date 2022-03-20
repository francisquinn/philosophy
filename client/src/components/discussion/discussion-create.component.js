import { useRef } from "react";
import { createTopicDiscussion } from "../../slices/discussion.slice";
import { useDispatch, useSelector } from "react-redux";

const CreateDiscussion = () => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user);
    const title = useRef(null);
    const description = useRef(null);


    const submitDiscussion = () => {
        dispatch(createTopicDiscussion({
            title: title.current.value,
            description: description.current.value,
            topic_url: "test" // testing
        }));
    };
    return (
        <div>
            {!user.isLoggedIn ? (
                <p>no access sir</p>
            ) : (
                <div>
                    <h1>Create discussion</h1>
                    <input type="text" placeholder="title" ref={title} />
                    <br />
                    <input type="text" placeholder="description" ref={description} />
                    <br />
                    <input type="submit" value="Submit" onClick={() => submitDiscussion()} />
                </div>
            )}
        </div>
    );
};

export default CreateDiscussion;

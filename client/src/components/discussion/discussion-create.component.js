import { useRef } from "react";
import { createTopicDiscussion } from "../../slices/discussion.slice";
import { useSelector } from "react-redux";
import useDispatchHandler from "../../hooks/useDispatchHandler";

const CreateDiscussion = () => {
    const { handle, isLoading, error, response } = useDispatchHandler();
    const user = useSelector((state) => state.user);
    const title = useRef(null);
    const description = useRef(null);

    const submitDiscussion = () => {
        handle(createTopicDiscussion({
            title: title.current.value,
            description: description.current.value,
            topic_url: "test" // testing
        }), { popDown: true });
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
                    <p>{response}</p>
                    {isLoading && <h1>Loading...</h1>}
                    {error && <h1>{error}</h1>}
                </div>
            )}
        </div>
    );
};

export default CreateDiscussion;

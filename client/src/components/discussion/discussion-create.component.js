import { createTopicDiscussion } from "../../slices/discussion.slice";
import { useSelector } from "react-redux";
import Form from "../utils/form.component";
import FormInput from "../utils/form-input.component";

const CreateDiscussion = () => {
    const state = useSelector((state) => state);
    const user = state.user;
    const topic = state.topics.topic;
    
    return (
        <>
            {!user.isLoggedIn ? (
                <p>no access sir</p>
            ) : (
                <Form action={ createTopicDiscussion } config={{ popDown: true }}>
                    <FormInput type="text" placeholder="topic id" name="topic_id" defaultValue={ topic._id } />  { /* pass topic id not url and select dropdown */}
                    <FormInput type="text" placeholder="title" name="title" />
                    <FormInput type="text" placeholder="description" name="description" />
                    <div className="form-item">
                        <button type="submit" className="btn-form-org-primary w-100" data-login>
                            CREATE
                        </button>
                    </div>
                </Form>
            )}
        </>
    );
};

export default CreateDiscussion;

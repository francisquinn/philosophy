import { updateTopicDiscussion } from "../../slices/discussion.slice";
import Form from "../utils/form.component";
import FormInput from "../utils/form-input.component";

const EditDiscussion = (discussion) => {

    return (
        <Form action={ updateTopicDiscussion } config={{ popDown: true }}>
            <FormInput type="hidden" name="disscusion_id" value={ discussion.current._id } />
            <FormInput type="text" placeholder="title" name="title" defaultValue={ discussion.current.title } />
            <FormInput type="text" placeholder="description" name="description" defaultValue={ discussion.current.description } />
            <div className="form-item">
                <button type="submit" className="btn-form-org-primary w-100" data-login>
                    EDIT
                </button>
            </div>
        </Form>
    );
};

export default EditDiscussion;

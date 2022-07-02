import {
  userRegister
} from "../../slices/user.slice";
import { navigate } from "../../slices/popup.slice";
import { useDispatch } from "react-redux";
import Form from "../utils/form.component";
import FormInput from "../utils/form-input.component";

const Register = () => {
  const dispatch = useDispatch();

  return (
    <>
      <Form action={ userRegister } config={{}}>
        <FormInput type="text" placeholder="username" name="username" />
        <FormInput type="email" placeholder="email" name="email" />
        <FormInput type="password" placeholder="password" name="password" />
        <div className="form-item">
            <button type="submit" className="btn-form-turq-primary" style={{ width: "100%" }}>
              REGISTER
            </button>
        </div>
      </Form>
      <p className="mt-3">
        Already have an account? <span className="text-org-primary" onClick={() => dispatch(navigate({ component: "LOGIN" }))}>Login</span>
      </p>
    </>
  );
};

export default Register;

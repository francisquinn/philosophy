import { useDispatch } from "react-redux";
import {
  userLogin
} from "../../slices/user.slice";
import { navigate } from "../../slices/popup.slice";
import Form from "../utils/form.component";
import FormInput from "../utils/form-input.component";

const Login = () => {
  const dispatch = useDispatch();

  // const handleformInputs = () => {
  //   const b = document.querySelector('[data-login]');
  //   if (email.current.value.length > 1 && password.current.value.length >= 8) {
  //     b.classList.remove('btn-disabled');
  //   } else {
  //     b.classList.add('btn-disabled');
  //   }
  // };

  return (
    <>
      <Form action={ userLogin } config={{ reload: true }}>
        <FormInput type="text" placeholder="email" name="email" />
        <FormInput type="password" placeholder="password" name="password" />
        <div className="form-item">
          <button type="submit" className="btn-form-org-primary w-100" data-login>
            LOGIN
          </button>
        </div>
      </Form>
      <p className="mt-3">
        new to philosophy? <span className="text-turq-primary" onClick={() => dispatch(navigate({ component: "REGISTER" }))}>create an account</span>
      </p>
    </>
  );
};

export default Login;

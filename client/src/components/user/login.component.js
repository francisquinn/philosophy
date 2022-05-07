import { useDispatch } from "react-redux";
import {
  userLogin
} from "../../slices/user.slice";
import { navigate } from "../../slices/popup.slice";
import { useRef } from "react";
import useDispatchHandler from "../../hooks/useDispatchHandler";

const Login = () => {
  const { handle, isLoading, error } = useDispatchHandler();
  /* User details */
  const email = useRef(null);
  const password = useRef(null);
  const dispatch = useDispatch();

  const submitLoginForm = (e) => {
    e.preventDefault();
    handle(
      userLogin({
        email: email.current.value,
        password: password.current.value,
      }), { reload: true });
  };

  return (
    <div>
      {error && <h1>{ error }</h1>}
        <div>
          <form onSubmit={ submitLoginForm }>
            <h1>login</h1>
            <input type="text" placeholder="email" ref={email} />
            <br />
            <input type="password" placeholder="password" ref={password} />
            <br />
            <button type="submit">
              {isLoading && (
                <span
                  className="spinner-border spinner-border-sm"
                  role="status"
                  aria-hidden="true"
                ></span>
              )}
              submit
            </button>
            <span onClick={() => dispatch(navigate({ component: "REGISTER" }))}>
              create an account
            </span>
          </form>
        </div>
    </div>
  );
};

export default Login;

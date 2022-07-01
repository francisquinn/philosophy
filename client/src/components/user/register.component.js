import {
  userRegister
} from "../../slices/user.slice";
import { navigate } from "../../slices/popup.slice";
import { useRef } from "react";
import useDispatchHandler from "../../hooks/useDispatchHandler";
import { useDispatch } from "react-redux";

const Register = () => {
  const dispatch = useDispatch();
  /* User details */
  const username = useRef(null);
  const email = useRef(null);
  const password = useRef(null);
  const { handle, isLoading, error, response } = useDispatchHandler();

  const submitRegForm = (e) => {
    e.preventDefault();
    handle(
      userRegister({
        username: username.current.value,
        email: email.current.value,
        password: password.current.value,
      }), {})
  };

  return (
    <>
      {error && <h1>{error}</h1>}
      {isLoading && <h1>loading...</h1>}
        <form className="form-container" onSubmit={submitRegForm}>
          <h1>register</h1>
          <div className="form-item">
            <input type="text" className="form-input" placeholder="username" ref={username} />
          </div>
          <div className="form-item">
            <input type="text" className="form-input" placeholder="email" ref={email} />
          </div>
          <div className="form-item">
            <input type="password" className="form-input" placeholder="password" ref={password} />
          </div>
          <div className="form-item">
            <button type="submit" className="btn-form-turq-primary" style={{ width: "100%" }}>
              REGISTER
            </button>
          </div>
          <p className="mt-3">
            Already have an account? <span className="text-org-primary" onClick={() => dispatch(navigate({ component: "LOGIN" }))}>Login</span>
          </p>
          {response && <p>{ response.message }</p>}
        </form> 
    </>
  );
};

export default Register;

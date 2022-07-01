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

  const handleformInputs = () => {
    const b = document.querySelector('[data-login]');
    if (email.current.value.length > 1 && password.current.value.length >= 8) {
      b.classList.remove('btn-disabled');
    } else {
      b.classList.add('btn-disabled');
    }
  };
 
  const submitLoginForm = (e) => {
    e.preventDefault();
    handle(
      userLogin({
        email: email.current.value,
        password: password.current.value,
      }), { reload: true });
  };

  return (
    <>
      {error && <h1>{ error }</h1>}
        <form className="form-container" onSubmit={ submitLoginForm } onChange={ handleformInputs }>
          <h1>login</h1>
          <div className="form-item">
            <input type="text" className="form-input" placeholder="email" ref={email} />
          </div>
          <div className="form-item">
            <input type="password" className="form-input" placeholder="password" ref={password} />
          </div>
          <div className="form-item">
            <button type="submit" className="btn-form-org-primary btn-disabled w-100" data-login>
              {isLoading && (
                <span
                  className="spinner-border spinner-border-sm"
                  role="status"
                  aria-hidden="true"
                ></span>
              )}
              LOGIN
            </button>
          </div>
          <p className="mt-3">
            new to philosophy? <span className="text-turq-primary" onClick={() => dispatch(navigate({ component: "REGISTER" }))}>create an account</span>
          </p>
        </form>
    </>
  );
};

export default Login;

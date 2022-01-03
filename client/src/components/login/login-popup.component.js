import { useSelector, useDispatch } from "react-redux";
import {
  toggleLoginWindow,
  toggleRegisterWindow,
  //userLogin
} from "../../slices/login.slice";
//import useDispatchRequest from "../../hooks/useDispatchRequest";
import { useEffect, useRef } from "react";

const LoginWindow = () => {
  const login = useSelector((state) => state.login);
  const email = useRef(null);
  const password = useRef(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const elements = document.getElementById("app-body");
    if (login.window) {
      elements.style.opacity = 0.3;
      elements.style.pointerEvents = "none";
    } else {
      elements.style.opacity = 1;
      elements.style.pointerEvents = "auto";
    }
  }, [login.window, login.register]);

  const submitForm = (e) => {
    e.preventDefault();
    //const {isLoading, isError} = useDispatchRequest(userLogin(email, password))
    alert("Form submitted!" + email.current.value + " " + password.current.value)
  }

  return (
    <div>
      {login.window && (
        <div className="login-window">
          {login.login && (
            <>
              <form onSubmit={submitForm}>
                <h1>login</h1>
                <input type="text" placeholder="email" ref={email} />
                <br />
                <input type="password" placeholder="password" ref={password} />
                <br />
                <button type="submit">submit</button>
                <span onClick={() => dispatch(toggleRegisterWindow())}>
                  create an account
                </span>
              </form>
            </>
          )}
          {login.register && (
            <>
              <h1>register</h1>
              <input type="text" placeholder="username" />
              <br />
              <input type="text" placeholder="email" />
              <br />
              <input type="password" placeholder="password" />
              <br />
              <button type="submit">submit</button>
              <span onClick={() => dispatch(toggleRegisterWindow())}>
                back to login
              </span>
            </>
          )}
          <button onClick={() => dispatch(toggleLoginWindow())}>Close</button>
        </div>
      )}
    </div>
  );
};

export default LoginWindow;

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
  const firstName = useRef(null);
  const lastName = useRef(null);
  const username = useRef(null);
  const email = useRef(null);
  const password = useRef(null);
  const { handle, isLoading, error, response } = useDispatchHandler();

  const submitRegForm = (e) => {
    e.preventDefault();
    handle(
      userRegister({
        firstName: firstName.current.value,
        lastName: lastName.current.value,
        username: username.current.value,
        email: email.current.value,
        password: password.current.value,
      }), {})
  };

  return (
    <div>
      {error && <h1>{error}</h1>}
      {isLoading && <h1>loading...</h1>}
        <div>
            <form onSubmit={submitRegForm}>
            <h1>register</h1>
            <input type="text" placeholder="first" ref={firstName} />
            <br />
            <input type="text" placeholder="last" ref={lastName} />
            <br />
            <input type="text" placeholder="username" ref={username} />
            <br />
            <input type="text" placeholder="email" ref={email} />
            <br />
            <input type="password" placeholder="password" ref={password} />
            <br />
            <button type="submit">submit</button>
            <p onClick={() => dispatch(navigate({ component: "LOGIN" }))}>
                login
            </p>
            {response && <p>{ response.message }</p>}
            </form> 
        </div>
    </div>
  );
};

export default Register;

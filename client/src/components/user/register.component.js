import { useDispatch } from "react-redux";
import {
  userRegister
} from "../../slices/user.slice";
import { navigate } from "../../slices/popup.slice";
import { useRef, useState } from "react";

const SignUp = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setError] = useState(null);
  const [response, setResponse] = useState(null);
  /* User details */
  const firstName = useRef(null);
  const lastName = useRef(null);
  const username = useRef(null);
  const email = useRef(null);
  const password = useRef(null);
  const dispatch = useDispatch();

  const submitRegForm = (e) => {
    e.preventDefault();
    setIsLoading(true);
    dispatch(
      userRegister({
        firstName: firstName.current.value,
        lastName: lastName.current.value,
        username: username.current.value,
        email: email.current.value,
        password: password.current.value,
      })
    )
      .then((res) => {
          const status = res.payload.status;
          if (status === 400) {
            setResponse(res.payload.message);
            return;
          }

          if (status === 200) {
              setResponse(res.payload.message);
              // show success message with link to login
              return;
          }
      })
      .catch((err) => console.log(err.message));
    setIsLoading(false);
    setError(false);
  };

  return (
    <div>
      {isError && <h1>Error...</h1>}
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
            <p>{response}</p>
            </form> 
        </div>
    </div>
  );
};

export default SignUp;

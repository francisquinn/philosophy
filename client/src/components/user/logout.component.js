import useDispatchHandler from "../../hooks/useDispatchHandler";
import { logout } from "../../slices/user.slice";
import { useDispatch } from "react-redux";
import { userLoggedState } from "../../slices/user.slice";

const Logout = () => {
    const dispatch = useDispatch();
    const { handle, isLoading, error, response } = useDispatchHandler();

    const loggedOut = () => {
        handle(logout(), {});
        window.location.reload();
        dispatch(userLoggedState(false));
    };

  return (
    <div>
        <p>Are you sure you want to logout?</p>
        <button onClick={ () => loggedOut() }>Yes</button>
        <p>{ response }</p>
        {isLoading && <h1>Loading...</h1>}
        {error && <h1>{error}</h1>}
    </div>
  );
};

export default Logout;

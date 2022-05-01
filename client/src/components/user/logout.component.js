import { logout } from "../../slices/user.slice";
import { useDispatch } from "react-redux";
import { userLoggedState } from "../../slices/user.slice";

const Logout = () => {
    const dispatch = useDispatch();

    const loggedOut = () => {
        dispatch(logout())
          .then(() => {
            window.location.reload();
            dispatch(userLoggedState(false));
          })
          .catch((err) => console.log(err));
    };

  return (
    <div>
        <p>Are you sure you want to logout?</p>
        <button onClick={ () => loggedOut() }>Yes</button>
    </div>
  );
};

export default Logout;

import useWindowDimensions from "../../hooks/useWindowDimensions";
import { useSelector, useDispatch } from "react-redux";
import { toggleMenu } from "../../slices/menu.slice";
import Icon from "@mdi/react";
import { mdiMenu } from "@mdi/js";
import { Link } from "react-router-dom";
import { togglePopUpWindow } from "../../slices/popup.slice";

const NavBar = () => {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const { width } = useWindowDimensions();

  // const logout = () => {
  //   localStorage.removeItem('token');
  //   window.location.reload();
  //   dispatch(userLoggedState(false));
  // };

  return (
    <div>
      {width > 575 ? (
        <div className="navbar pt-2 pb-2 bg-primary">
            <span>philosophy</span>
            <span>{width}</span>
            {state.user.isLoggedIn ? (
              <div>
                <button onClick={() => dispatch(togglePopUpWindow({ component: "CREATE" }))}>Create discussion</button>
                <button onClick={() => dispatch(togglePopUpWindow({ component: "LOGOUT" })) }>Logout</button>
              </div>
            ) : (
                <div>
                  <div className="login-item">
                    <button onClick={() => dispatch(togglePopUpWindow({ component: "LOGIN" }))}>Login</button>
                  </div>
                  <div className="signup-item">
                    <button onClick={() => dispatch(togglePopUpWindow({ component: "REGISTER" }))}>Register</button>
                  </div>
                </div>
              )
            }
        </div>
      ) : (
        <div className="navbar pt-2 pb-2 bg-primary justify-center">
          <Icon
            id="hamburger"
            onClick={() => dispatch(toggleMenu())}
            path={mdiMenu}
            size={1.5}
          />
          <span>philosophy</span>
          {state.menu.toggle && (
            <div className="nav-menu-mobile">
              {state.menu.items.map((item) => (
                <div className="menu-item-mobile" key={item.id}>
                  <Link to={item.route}  onClick={() => dispatch(toggleMenu())}>{item.text}</Link>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default NavBar;

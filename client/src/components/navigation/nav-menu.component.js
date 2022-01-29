import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { togglePopUpWindow } from "../../slices/popup.slice";
import useWindowDimensions from "../../hooks/useWindowDimensions";

const NavMenu = () => {
  const { width } = useWindowDimensions();
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  
  return (
    <div>
      {width > 575 && (
        <div className="nav-menu">
          {state.menu.items.map((item) => (
            <div className="menu-item" key={item.id}>
              <Link to={item.route}>{item.text}</Link>
            </div>
          ))}
          <div className="login-item">
            <button onClick={() => dispatch(togglePopUpWindow({ component: "login" }))}>Login</button>
          </div>
          <div className="signup-item">
            <button onClick={() => dispatch(togglePopUpWindow({ component: "sign up" }))}>Register</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default NavMenu;

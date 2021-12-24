import useWindowDimensions from "../../hooks/useWindowDimensions";
import { useSelector, useDispatch } from "react-redux";
import { toggle } from "../../slices/menu.slice";
import Icon from "@mdi/react";
import { mdiMenu } from "@mdi/js";
import { Link } from "react-router-dom";

const NavBar = () => {
  const menu = useSelector((state) => state.menu);
  const dispatch = useDispatch();

  const { width } = useWindowDimensions();
  return (
    <div className="navbar">
      {width > 575 ? (
        <div>
          <span>philosophy</span>
          <span>{width}</span>
        </div>
      ) : (
        <div>
          <Icon
            id="hamburger"
            onClick={() => dispatch(toggle())}
            path={mdiMenu}
            size={1.5}
          />
          {menu.value && (
            <div className="nav-menu-mobile">
              <Link to="/"  onClick={() => dispatch(toggle())}>Home</Link>
              <Link to="/about"  onClick={() => dispatch(toggle())}>About</Link>
              <Link to="/topics"  onClick={() => dispatch(toggle())}>About</Link>
            </div>
          
          )}
        </div>
      )}
    </div>
  );
};

export default NavBar;

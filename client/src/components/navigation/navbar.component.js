import useWindowDimensions from "../../hooks/useWindowDimensions";
import { useSelector, useDispatch } from "react-redux";
import { toggleMenu } from "../../slices/menu.slice";
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
            onClick={() => dispatch(toggleMenu())}
            path={mdiMenu}
            size={1.5}
          />
          {menu.toggle && (
            <div className="nav-menu-mobile">
              {menu.items.map((item) => (
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

import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import useWindowDimensions from "../../hooks/useWindowDimensions";

const NavMenu = () => {
  const { width } = useWindowDimensions();
  const state = useSelector((state) => state.menu);
  
  return (
    <div>
      {width > 575 && (
        <div className="nav-menu">
          {state.items.map((item) => (
            <div className="menu-item" key={item.id}>
              <Link to={item.route}>{item.text}</Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default NavMenu;

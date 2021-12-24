import { Link } from "react-router-dom";
import useWindowDimensions from "../../hooks/useWindowDimensions";

const NavMenu = () => {
  const { width } = useWindowDimensions();
  return (
    <div>
      {width > 575 && (
        <div className="nav-menu">
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/topics">Topics</Link>
        </div>
      )}
    </div>
  );
};

export default NavMenu;

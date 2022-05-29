import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import useWindowDimensions from "../../hooks/useWindowDimensions";

const NavMenu = () => {
  const { width } = useWindowDimensions();
  const state = useSelector((state) => state.menu);
  
  return (
    <>
      {width > 700 && (
        <div className="nav-menu">
          {state.items.map((item) => (
            <div className="p-2" key={item.id}>
              <Link to={item.route}>{item.text}</Link>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default NavMenu;

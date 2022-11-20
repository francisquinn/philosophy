import useWindowDimensions from "../../hooks/useWindowDimensions";
import { useSelector, useDispatch } from "react-redux";
import { togglePopUpWindow } from "../../slices/popup.slice";
import NavFooter from "./navfooter.component";

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
    <>
      {width > 720 ? (
        <div className="navbar">
          <div>
            philosophy{width}
          </div>
            {state.user.isLoggedIn ? (
              <>
                <button onClick={() => dispatch(togglePopUpWindow({ component: "CREATE" }))}>Create discussion</button>
                <button onClick={() => dispatch(togglePopUpWindow({ component: "LOGOUT" })) }>Logout</button>
              </>
            ) : (
              <div>
                <button className="btn" onClick={() => dispatch(togglePopUpWindow({ component: "CREATE" }))}>Create</button>
                <button className="ml-2 btn-turq-primary" onClick={() => dispatch(togglePopUpWindow({ component: "LOGIN" }))}>Login</button>
              </div>
                
              )
            }
        </div>
      ) : (
        <>
          <div className="navbar">
            {/* <Icon
              id="hamburger"
              onClick={() => dispatch(toggleMenu())}
              path={mdiMenu}
              size={1.5}
            /> */}
            philosophy{width}
            {state.user.isLoggedIn ? (
              <button onClick={() => dispatch(togglePopUpWindow({ component: "LOGOUT" })) }>Logout</button>
            ) : (
              <button className="ml-2 btn-turq-primary" onClick={() => dispatch(togglePopUpWindow({ component: "LOGIN" }))}>Login</button>
              )
            }
            {/* {state.menu.toggle && (
              <div className="nav-menu-mobile">
                {state.menu.items.map((item) => (
                  <div className="menu-item-mobile" key={item.id}>
                    <Link to={item.route}  onClick={() => dispatch(toggleMenu())}>{item.text}</Link>
                  </div>
                ))}
              </div>
            )} */}
          </div>
          <NavFooter />
        </>
      )}
    </>
  );
};

export default NavBar;

import { useSelector, useDispatch } from "react-redux";
import { toggleMenu } from "../../slices/menu.slice";
import { Link } from "react-router-dom";
import { togglePopUpWindow } from "../../slices/popup.slice";

const NavFooter = () => {
    const menu = useSelector((state) => state.menu);
    const dispatch = useDispatch();

    return (
        <div className="nav-footer d-flex justify-space-between">
            {menu.footerItems.map((item) => (
                <div key={item.id}>
                    {item.popup ? (
                        <span onClick={() => dispatch(togglePopUpWindow({ component: "CREATE" }))}>{item.text}</span>
                    ) : (
                        <Link to={item.route} onClick={() => dispatch(toggleMenu())}>{item.text}</Link>
                    )}
                    
                </div>
            ))}
       
            
        </div> 
    );
};

export default NavFooter;

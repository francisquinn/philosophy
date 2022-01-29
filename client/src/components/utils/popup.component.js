import { useSelector, useDispatch } from "react-redux";
import { togglePopUpWindow } from "../../slices/popup.slice";
import { useEffect } from "react";
import Login from "../user/login.component";
import SignUp from "../user/register.component";

const PopUpWindow = () => {
  const popup = useSelector((state) => state.popup);
  const dispatch = useDispatch();

  console.log(popup.component)

  useEffect(() => {
    const elements = document.getElementById("app-body");
    if (popup.window) {
      elements.style.opacity = 0.3;
      elements.style.pointerEvents = "none";
    } else {
      elements.style.opacity = 1;
      elements.style.pointerEvents = "auto";
    }
  }, [popup.window]);

  return (
    <div>
    {popup.window &&
    <>
       {popup.component === "login" && <Login />}
       {popup.component === "sign up" && <SignUp />}
        <p>{popup.component}</p>
        <button onClick={() => dispatch(togglePopUpWindow({ component: null }))}>Close</button>
    </>
    }
    </div>
  );
};

export default PopUpWindow;

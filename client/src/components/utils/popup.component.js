import { useSelector, useDispatch } from "react-redux";
import { togglePopUpWindow } from "../../slices/popup.slice";
import { useEffect } from "react";
import Login from "../user/login.component";
import SignUp from "../user/register.component";
/** Discussion */
import EditDiscussion from "../discussion/discussion-edit.component";
import DeleteDiscussion from "../discussion/discussion-delete.component";

const PopUpWindow = () => {
  const state = useSelector((state) => state);
  const popup = state.popup;
  const discussion = state.discussions.current;
  const dispatch = useDispatch();

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
       {popup.component === "LOGIN" && <Login />}
       {popup.component === "REGISTER" && <SignUp />}
       {popup.component === "EDIT" && <EditDiscussion current={discussion} />}
       {popup.component === "DELETE" && <DeleteDiscussion current={discussion} />}
        <p>{popup.component}</p>
        <button onClick={() => dispatch(togglePopUpWindow({ component: null }))}>Close</button>
    </>
    }
    </div>
  );
};

export default PopUpWindow;

import { useSelector, useDispatch } from "react-redux";
import { togglePopUpWindow } from "../../slices/popup.slice";
import React, { useEffect } from "react";
/** Discussion */
const DeleteDiscussion = React.lazy(() => import('../discussion/discussion-delete.component'));
const EditDiscussion = React.lazy(() => import('../discussion/discussion-edit.component'));
const CreateDiscussion = React.lazy(() => import('../discussion/discussion-create.component'));
/** User */
const Login = React.lazy(() => import('../user/login.component'));
const Register = React.lazy(() => import('../user/register.component'));
const Logout = React.lazy(() => import('../user/logout.component'));

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
       {popup.component === "REGISTER" && <Register />}
       {popup.component === "LOGOUT" && <Logout />}
       {popup.component === "EDIT" && <EditDiscussion current={discussion} />}
       {popup.component === "CREATE" && <CreateDiscussion />}
       {popup.component === "DELETE" && <DeleteDiscussion current={discussion} />}
        <p>{popup.component}</p>
        <button onClick={() => dispatch(togglePopUpWindow({ component: null }))}>Close</button>
    </>
    }
    </div>
  );
};

export default PopUpWindow;

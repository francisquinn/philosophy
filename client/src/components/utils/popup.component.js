import { useSelector, useDispatch } from "react-redux";
import { togglePopUpWindow } from "../../slices/popup.slice";
import { resetForm } from "../../slices/form.slice";
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
  const popup = useSelector((state) => state.popup);
  const discussion = useSelector((state) => state.discussions.current);
  const dispatch = useDispatch();

  useEffect(() => {
    const appBody = document.getElementById("app-body");
    const body = document.getElementsByTagName("body")[0];
    if (popup.window) {
      appBody.classList.add('popup-container-active');
      body.style.overflow = 'hidden';
    } else {
      appBody.classList.remove('popup-container-active');
      body.style.overflow = '';
    }
  }, [popup.window]);

  return (
    <>
    {popup.window &&
      <div className="popup-container">
        <div className="popup-wrapper">
          {popup.component === "LOGIN" && <Login />}
          {popup.component === "REGISTER" && <Register />}
          {popup.component === "LOGOUT" && <Logout />}
          {popup.component === "EDIT" && <EditDiscussion current={discussion} />}
          {popup.component === "CREATE" && <CreateDiscussion />}
          {popup.component === "DELETE" && <DeleteDiscussion current={discussion} />}
          <button className="popup-close" onClick={() => {
            dispatch(resetForm());
            dispatch(togglePopUpWindow({ component: null }))}
          }>Close</button>
        </div>
      </div>
    }
    </>
  );
};

export default PopUpWindow;

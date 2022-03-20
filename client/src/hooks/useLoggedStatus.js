import { useDispatch  } from "react-redux";
import { retrieveUserInfo, userLoggedState } from "../slices/user.slice";
import { useEffect } from "react";

export default function useUserLoggedStatus() {
    const dispatch = useDispatch();
    console.log(localStorage)
    useEffect(() => {
        if (localStorage.getItem('token')) {
            dispatch(userLoggedState(true));
            dispatch(retrieveUserInfo());
        }
        // eslint-disable-next-line
    }, []); 
}
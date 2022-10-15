import { useDispatch  } from "react-redux";
import {  userLoggedState, checkUserLoggedStatus } from "../slices/user.slice";
import { renderApp } from "../slices/app.slice";
import { useEffect } from "react";

export default function useUserLoggedStatus() {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(checkUserLoggedStatus())
            .unwrap()
            .then((response) => {
                dispatch(renderApp(true));
                if (response.error) return;
                dispatch(userLoggedState(true));
            })
            .catch((err) => {
                dispatch(renderApp(true))
                console.log(err)
            });
        // eslint-disable-next-line
    }, []); 
}
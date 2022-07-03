import { useDispatch  } from "react-redux";
import {  userLoggedState, checkUserLoggedStatus } from "../slices/user.slice";
import { renderApp } from "../slices/app.slice";
import { useEffect } from "react";

export default function useUserLoggedStatus() {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(checkUserLoggedStatus())
            .unwrap()
            .then(() => {
                // setTimeout(() => {
                    dispatch(userLoggedState(true))
                    dispatch(renderApp(true))
                // }, 3000)
                
            })
            .catch((err) => {
                dispatch(renderApp(true))
                console.log(err)
            });
        // eslint-disable-next-line
    }, []); 
}
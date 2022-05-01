import { useDispatch  } from "react-redux";
import {  userLoggedState, checkUserLoggedStatus } from "../slices/user.slice";
import { useEffect } from "react";

export default function useUserLoggedStatus() {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(checkUserLoggedStatus())
            .unwrap()
            .then(() => dispatch(userLoggedState(true)))
            .catch((err) => {
                console.log(err)
            });
        // eslint-disable-next-line
    }, []); 
}
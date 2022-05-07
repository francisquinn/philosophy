import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { togglePopUpWindow } from "../slices/popup.slice";

const useDispatchHandler = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [response, setResponse] = useState(null);

    const handle = async (action, config) => {
        setIsLoading(true);
        dispatch(action)
            .unwrap()
            .then((res) => {
                setIsLoading(false);
                setResponse(res);
                handleConfig(config);
            })
            .catch((err) => {
                setIsLoading(false);
                setError(err.message);
            });
    }

    const handleConfig = (config) => {
        if (config.reload) {
            window.location.reload();
            return;
        }
        
        if (config.popDown) {
            setTimeout(() => {
                if (config.nav) {
                    navigate(-1); 
                }
                dispatch(togglePopUpWindow({ component: null }));
            }, 2000)
        }
    };
    
    return { handle, isLoading, error, response };
}

export default useDispatchHandler;
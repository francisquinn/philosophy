import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";

const useDispatchRequest = (action) => {
  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(null);

  useEffect(() => {
    const abort = new AbortController();
    dispatch(action, { signal: abort.signal })
      .then((res) => {
        setData(res.payload)
        setIsLoading(false);
      })
      .catch((err) => {
        if (err.name === "AbortError") {
          console.log("fetch aborted");
        } else {
          setIsLoading(false);
          setIsError(err.message);
        }
      });
    return () => console.log("cleanup");
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return { data, isLoading, isError };
};

export default useDispatchRequest;

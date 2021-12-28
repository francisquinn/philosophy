import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";

const useDispatchFetch = (action) => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(null);

  useEffect(() => {
    const abort = new AbortController();
    dispatch(action, { signal: abort.signal })
      .then(setIsLoading(false))
      .catch((err) => {
        if (err.name === "AbortError") {
          console.log("fetch aborted");
        } else {
          setIsLoading(false);
          setIsError(err.message)
        }
      });
    return () => console.log("cleanup");
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return { isLoading, isError };
};

export default useDispatchFetch;

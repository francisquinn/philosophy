import { useEffect, useState } from "react";

function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height,
  };
}

export default function useWindowDimensions() {
    const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

    useEffect(() => {
        function resize() {
            setWindowDimensions(getWindowDimensions());
        }
        window.addEventListener('resize', resize);
        return () => window.removeEventListener('resize', resize);
    }, [])
    return windowDimensions;
}

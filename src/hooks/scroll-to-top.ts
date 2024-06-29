import {  useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";

export function useScrollToTop() {
    const { pathname } = useLocation();
  
    useLayoutEffect(() => {
        setTimeout(()=>{
            window.scrollTo({
                top: 0,
                behavior: "smooth",
              });;
        },500)
    }, [pathname]);
  }
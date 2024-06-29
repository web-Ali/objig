/* eslint-disable no-restricted-imports */
import { Outlet } from "react-router-dom";

import { useScrollToTop } from "../../hooks/scroll-to-top";
import { Header } from "../header";

export function Layout() {
  useScrollToTop()
   
    return (
      <div className="pb-10">
        <Header />
        <Outlet />
      </div>
    );
  }
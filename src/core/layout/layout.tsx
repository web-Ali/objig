/* eslint-disable no-restricted-imports */
import { Outlet } from "react-router-dom";

import Logo from '../../assets/images/1664893191_25-amiel-club-p-chernaya-kirpichnaya-stena-fon-vkontakte-28.jpg'
import { useScrollToTop } from "../../hooks/scroll-to-top";
import { Header } from "../header";

export function Layout() {
  useScrollToTop()
   
    return (
      <div className="pb-10 h-screen bg-cover overflow-hidden" style={{backgroundImage: `url(${Logo})`}}>
        <Header />
        <Outlet />
      </div>
    );
  }
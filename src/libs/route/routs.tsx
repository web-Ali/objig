/* eslint-disable no-restricted-imports */
import {
    createBrowserRouter,
  } from "react-router-dom";

import { NotFound404 } from "../../core/404";
import { Layout } from "../../core/layout/layout";
import { Main } from "../../core/main";
  
 export const router = createBrowserRouter([
  {
    element: <Layout />,
    children:[
      {
      path: "/",
      element: <Main />,
      },
      {
        path: '*',
        element: <NotFound404 />,
      },
     
    ],
  }
]);
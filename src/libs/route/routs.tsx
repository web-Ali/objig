/* eslint-disable no-restricted-imports */
import {
    createBrowserRouter,
  } from "react-router-dom";

import { NotFound404 } from "../../core/404";
import { AddUser } from "../../core/add-user/add-user";
import { Layout } from "../../core/layout/layout";
import { UserCard } from "../../core/user-card/user-card";
import { UsersList } from "../../core/users-list";
import { getCookie } from "../../service/utils";
  
 export const router = createBrowserRouter([
  {
    element: <Layout />,
    children:[
      {
      path: "/",
      element: <UsersList />,
      },
      {
        path: '*',
        element: <NotFound404 />,
      },
      {
        path: "/:userId",
        element: <UserCard />,
      },
      {
        path: "/add",
        element: <AddUser />,
      },
      ...(getCookie('token') ? [ {
        path: "/edit/:userId",
        element: <AddUser editMode />,
      }] : [])
    ],
  }
]);
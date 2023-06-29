import { createBrowserRouter } from "react-router-dom";
import { Suspense, lazy } from "react";
import { Spin } from "antd";
import Home from "@/pages/Home";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import Undefined from "@/pages/404";
import MainLayout from "@/layouts/MainLayout";
import ManageLayout from "@/layouts/ManageLayout";
import QuestionLayout from "@/layouts/QuestionLayout";
import List from "@/pages/manage/List";
import Star from "@/pages/manage/Star";
import Edit from "@/pages/question/edit";
import Stat from "@/pages/question/stat";
// import Transh from "@/pages/manage/Transh";
const Trash = lazy(() => import("@/pages/manage/Trash"));
const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "manage",
        element: <ManageLayout />,
        children: [
          {
            path: "list",
            element: <List />,
          },
          {
            path: "star",
            element: <Star />,
          },
          {
            path: "trash",
            element: (
              <Suspense
                fallback={
                  <Spin tip="Loading" size="large">
                    <div className="content" />
                  </Spin>
                }
              >
                <Trash />;
              </Suspense>
            ),
          },
        ],
      },
      {
        path: "*",
        element: <Undefined />,
      },
    ],
  },
  {
    path: "question",
    element: <QuestionLayout />,
    children: [
      {
        path: "edit/:id",
        element: <Edit />,
      },
      {
        path: "stat/:id",
        element: <Stat />,
      },
    ],
  },
]);

export default router;
export const HOME_PATH = "/";

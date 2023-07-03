import { createBrowserRouter } from "react-router-dom";
import { ChangeEvent, Suspense, lazy } from "react";
import { Spin, Space } from "antd";
import Home from "@/pages/Home";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import Undefined from "@/pages/404";
// import MainLayout from "@/layouts/MainLayout";
import ManageLayout from "@/layouts/ManageLayout";
import QuestionLayout from "@/layouts/QuestionLayout";
import List from "@/pages/manage/List";
import Star from "@/pages/manage/Star";
import Edit from "@/pages/question/edit";
import Stat from "@/pages/question/stat";
// import Transh from "@/pages/manage/Transh";
const MainLayout = lazy(() => import("@/layouts/MainLayout"));
const Trash = lazy(() => import("@/pages/manage/Trash"));
const loading: React.CSSProperties = {
  position: "absolute",
  left: "50%",
  top: "50%",
  transform: "translate(-50%,-50%)",
}
function App() {
  return (
    <Suspense
      fallback={
        <Spin size="large" style={loading} />
      }
    >
      <MainLayout />
    </Suspense >
  );
}
const router = createBrowserRouter([

  {
    path: "/",
    element: <App />,
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
export const HOME_PATHNAME = "/";
export const MANAGER_INDEX_PATHNAME = "/manager";
export const REGISTER_PATHNAME = "/register";

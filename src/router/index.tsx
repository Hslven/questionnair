import { createBrowserRouter } from 'react-router-dom';
import MainLayout from '@/layouts/MainLayout';
import ManageLayout from '@/layouts/ManageLayout';
import QuestionLayout from '@/layouts/QuestionLayout';
import Home from '@/pages/Home';
import Login from '@/pages/Login';
import Register from '@/pages/Register';
import Undefined from '@/pages/404';
import List from '@/pages/manage/List'
import Stat from '@/pages/question/stat';
import Edit from '@/pages/question/edit';

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout></MainLayout>,
    children: [
      {
        path: '/',
        element: <Home></Home>,
      },
      {
        path: 'login',
        element: <Login />,
      },
      {
        path: 'register',
        element: <Register />,
      },
      {
        path: 'manageLayout',
        element: <ManageLayout />,
        children: [
          {
            path: 'list',
            element: <List />
          }
        ]
      },
      {
        path: '*',
        element: <Undefined />,
      }
    ]
  },
  {
    path: 'question',
    element: <QuestionLayout />,
    children: [
      {
        path: 'edit/:id',
        element: <Edit />
      }, {
        path: 'stat/:id',
        element: <Stat />
      }
    ]

  }
]);

export default router;
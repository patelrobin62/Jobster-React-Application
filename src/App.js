import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { AddJob, AllJobs, Error,Landing,PrivateRoute,Profile,Register, SharedLayout ,Stats} from './Pages'
import {ToastContainer} from 'react-toastify'
import "react-toastify/dist/ReactToastify.css";
import index from 'toastify';


const App = () => {
const router = createBrowserRouter([
  {
    path: "/",
    element: <Landing />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <SharedLayout />
      </PrivateRoute>
    ),
    children: [
      {
        index: true,
        element: <Stats />,
      },
      {
        path: "/dashboard/addJob",
        element: <AddJob />,
      },
      {
        path: "/dashboard/allJobs",
        element: <AllJobs />,
      },
      {
        path: "/dashboard/profile",
        element: <Profile />,
      },
    ],
  },
  {
    path: "*",
    element: <Error />,
  },
]);
  return (
    <>
      <RouterProvider router={router} />
      <ToastContainer position='top-center'/>
    </>
  );
}

export default App
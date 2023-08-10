import React from "react";
import {useRef} from "react"


import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import reportWebVitals from "./reportWebVitals";

import Layout from "./Pages/Layout";
import ErrorPage from "./Pages/ErrorPage";
import EmployeeList from "./Pages/EmployeeList";
import EmployeeCreator from "./Pages/EmployeeCreator";
import EmployeeUpdater from "./Pages/EmployeeUpdater";

import EquipmentList from "./Pages/EquipmentList";
import EquipmentCreator from "./Pages/EquipmentCreator";
import EquipmentUpdater from "./Pages/EquipmentUpdater";

import EmployeeSearch from "./Pages/EmployeeSearch";

import MissingEmployees from "./Pages/MissingEmployees";

import HeaderNameOrder from "./Pages/HeaderNameOrder";


import "./index.css";
import TableTest from "./Pages/TableTest";
import FormTest from "./Pages/FormTest";

 




const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/equipment",
        element: <EquipmentList/>
      },
      {
        path: "/createEquipment",
        element: <EquipmentCreator/>
      },
      {
        path: "/updateEquipment/:id",
        element: <EquipmentUpdater/>
      },
      {
        path: "/",
        element: <EmployeeList />,
      },
      {
        path: "/create",
        element: <EmployeeCreator />,
      },
      {
        path: "/update/:id",
        element: <EmployeeUpdater />,
      },
      {
        path: "/employees/:search",
        element: <EmployeeSearch/>
      },
      {
        path: "/missing",
        element: <MissingEmployees/>
      },
      {
        path: "/table-test",
        element: <TableTest />,
      },
      {
        path: "/form-test",
        element: <FormTest />,
      },
      {
        path: "/employees/level/asc",
        element: <HeaderNameOrder/>
      },
      {
        path: "/employees/level/des",
        element: <HeaderNameOrder/>
      },
      {
        path: "/employees/position/asc",
        element: <HeaderNameOrder/>
      },
      {
        path: "/employees/position/des",
        element: <HeaderNameOrder/>
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

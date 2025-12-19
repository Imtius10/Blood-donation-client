import { createBrowserRouter } from "react-router";
import RootLayout from "../Layouts/RootLayout";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Login/Login";
import Register from "../Pages/Register/Register";

import DashboardLayouts from "../DashboardLayouts/DashboardLayouts";


import ManageDashboard from "../Dashboard/ManageDashboard/ManageDashboard";

import CreateDonationRequest from "../Dashboard/AddRequest/CreateDonationRequest";
import AllUsers from "../Dashboard/AllUsers/AllUsers";
import PrivateRoutes from "../Private/PrivateRoutes";
import MyDonationRequests from "../Dashboard/MyDonationRequest/MyDonationRequests";
import Donate from "../Dashboard/Donate/Donate";
import PaymentSuccess from "../PaymentSuccess/PaymentSuccess";





const router = createBrowserRouter([
    {
        path: "/",
        element: <RootLayout></RootLayout>,
        children: [
            {
                index: true,
                element:<Home></Home>
            },
            {
                path: '/login',
                element:<Login></Login>
            },
            {
                path: '/register',
                element:<Register></Register>
            },
            {
                path: '/donate',
                element:<Donate></Donate>
            },
            {
                path: '/payment-success',
                element:<PaymentSuccess></PaymentSuccess>
            }
        ]
    },
    {
        path: "/dashboard",
        element: <PrivateRoutes><DashboardLayouts /></PrivateRoutes>,
        children: [
           // { path: "test", element: <Test /> },
            {
                path: 'add-request',
                element:<CreateDonationRequest></CreateDonationRequest>
            },
            {
                path: 'manageproduct',
                element:<ManageDashboard></ManageDashboard>
            },
            {
                path: 'all-user',
                element:<AllUsers></AllUsers>
            },
            {
                path: 'my-requests',
                element:<MyDonationRequests></MyDonationRequests>
            }
        ],
    },
])

export default router
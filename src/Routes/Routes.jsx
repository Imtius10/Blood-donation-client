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
import SearchRequest from "../Pages/SearchRequest/SearchRequest";
import DashboardHome from "../Dashboard/DashboardHome";
import DashboardProfile from "../Dashboard/DashboardProfile";
import EditDonationRequest from "../Dashboard/EditDonationRequest";





const router = createBrowserRouter([
    {
        path: "/",
        element: <RootLayout></RootLayout>,
        children: [
            {
                index: true,
                element: <Home></Home>
            },
            {
                path: '/login',
                element: <Login></Login>
            },
            {
                path: '/register',
                element: <Register></Register>
            },
            {
                path: '/donate',
                element: <Donate></Donate>
            },
            {
                path: '/payment-success',
                element: <PaymentSuccess></PaymentSuccess>
            },
            {
                path: '/search-request',
                element: <SearchRequest></SearchRequest>
            }
        ]
    },
    {
        path: "/dashboard",
        element: <PrivateRoutes><DashboardLayouts /></PrivateRoutes>,
        children: [
            {
                index: true, 
                element: <DashboardHome />
            },
            {
                path: 'add-request',
                element: <CreateDonationRequest />
            },
            {
                path: 'manageproduct',
                element: <ManageDashboard />
            },
            {
                path: 'all-user',
                element: <AllUsers />
            },
            {
                path: 'my-requests',
                element: <MyDonationRequests />
            },
            {
                path: "profile",
                element: <DashboardProfile />
            },
            {
                path: "edit-request/:id",
                element: <EditDonationRequest />
            }

        ],
    }

])

export default router
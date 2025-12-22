import { createBrowserRouter } from "react-router";
import RootLayout from "../Layouts/RootLayout";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Login/Login";
import Register from "../Pages/Register/Register";

import DashboardLayouts from "../DashboardLayouts/DashboardLayouts";

import ManageDashboard from "../Dashboard/ManageDashboard/ManageDashboard";
import CreateDonationRequest from "../Dashboard/AddRequest/CreateDonationRequest";
import AllUsers from "../Dashboard/AllUsers/AllUsers";
import MyDonationRequests from "../Dashboard/MyDonationRequest/MyDonationRequests";
import DashboardHome from "../Dashboard/DashboardHome";
import DashboardProfile from "../Dashboard/DashboardProfile";
 import EditDonationRequest from "../Dashboard/EditDonationRequest";

import PrivateRoutes from "../Private/PrivateRoutes";
import AdminRoute from "../Private/AdminRoute";
import VolunteerRoute from "../Private/VolunteerRoute";
import DonorRoute from "../Private/DonorRoute";

import Donate from "../Dashboard/Donate/Donate";
import PaymentSuccess from "../PaymentSuccess/PaymentSuccess";
import SearchRequest from "../Pages/SearchRequest/SearchRequest";
import AllUserRequests from "../Dashboard/Admin/AllUserRequests";
import AdminDonationStats from "../Dashboard/Admin/AdminDonationStats";
import AdminDonationRequestsPage from "../Dashboard/Admin/AdminDonationRequestsPage";
import AdminDonationRequests from "../Dashboard/Admin/AdminDonationRequests";
import ErrorPage from "../Pages/Error/ErrorPage";
import UpdateDonationRequest from "../Dashboard/Update/UpdateDonationRequest";
//import EditDonationRequest from "../Dashboard/Update/EditDonationRequest";

const router = createBrowserRouter([
    {
        path: "/",
        element: <RootLayout />,
        errorElement:<ErrorPage></ErrorPage>,
        children: [
            { index: true, element: <Home /> },
            { path: "/login", element: <Login /> },
            { path: "/register", element: <Register /> },
            { path: "/donate", element: <Donate /> },
            { path: "/payment-success", element: <PaymentSuccess /> },
            { path: "/search-request", element: <SearchRequest /> },
            {
                path: 'donation-requests',
                element: (
                    <PrivateRoutes>
                        <AdminDonationRequestsPage></AdminDonationRequestsPage>
                    </PrivateRoutes>
                )
            }
        ],
    },

    {
        path: "/dashboard",
        element: (
            <PrivateRoutes>
                <DashboardLayouts />
            </PrivateRoutes>
        ),
        errorElement: <ErrorPage></ErrorPage>,
        children: [
            // ✅ Everyone
            { index: true, element: <DashboardHome /> },

            { path: "profile", element: <DashboardProfile /> },

           {
      path: "edit-request/:id", 
      element: <UpdateDonationRequest />
    },
           

            {
                path: "add-request",
                element: (
                    
                        <CreateDonationRequest />
                    
                ),
            },
            
              {
                path: "my-requests",
                element: (
                    <DonorRoute>
                        <MyDonationRequests />
                    </DonorRoute>
                ),
            },

            // 🌐 Admin only
            {
                path: "all-user",
                element: (
                    <AdminRoute>
                        <AllUsers />
                    </AdminRoute>
                ),
            },

            {
                path: "manageproduct",
                element: (
                    <AdminRoute>
                        <ManageDashboard />
                    </AdminRoute>
                ),
            },
            {
                path: "all-requests",
                element: (
                    <AdminRoute>
                        <AllUserRequests />
                    </AdminRoute>
                ),
            },
            {
                path: 'all-donation',
                element: (
                    <AdminRoute>
                        <AdminDonationStats></AdminDonationStats>
                    </AdminRoute>
                )
            },
           

        ],
    },
]);

export default router;

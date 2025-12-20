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

const router = createBrowserRouter([
    {
        path: "/",
        element: <RootLayout />,
        children: [
            { index: true, element: <Home /> },
            { path: "/login", element: <Login /> },
            { path: "/register", element: <Register /> },
            { path: "/donate", element: <Donate /> },
            { path: "/payment-success", element: <PaymentSuccess /> },
            { path: "/search-request", element: <SearchRequest /> },
        ],
    },

    {
        path: "/dashboard",
        element: (
            <PrivateRoutes>
                <DashboardLayouts />
            </PrivateRoutes>
        ),
        children: [
            // ✅ Everyone
            { index: true, element: <DashboardHome /> },

            { path: "profile", element: <DashboardProfile /> },

            // 🩸 Donor only
            {
                path: "my-requests",
                element: (
                    <DonorRoute>
                        <MyDonationRequests />
                    </DonorRoute>
                ),
            },

            // 🤝 Volunteer + Admin
            {
                path: "add-request",
                element: (
                    <VolunteerRoute>
                        <CreateDonationRequest />
                    </VolunteerRoute>
                ),
            },

            {
                path: "edit-request/:id",
                element: (
                    <VolunteerRoute>
                        <EditDonationRequest />
                    </VolunteerRoute>
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
        ],
    },
]);

export default router;

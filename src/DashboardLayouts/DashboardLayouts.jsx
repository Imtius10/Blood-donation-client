import { Outlet } from "react-router";
import Sidebar from "../Dashboard/MainDashboard.jsx/AdminSidebar";


const DashboardLayouts = () => {
    return (
        <div className="flex min-h-screen bg-gray-100">
            {/* Sidebar stays fixed on the left */}
            <Sidebar />

            {/* Main Content Area */}
            <main className="flex-1 p-8">
                <div className="max-w-7xl mx-auto">
                    <Outlet />
                </div>
            </main>
        </div>
    );
};

export default DashboardLayouts;
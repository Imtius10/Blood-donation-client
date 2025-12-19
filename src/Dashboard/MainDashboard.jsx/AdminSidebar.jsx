import { useState, useContext } from "react";
import { NavLink } from "react-router";
import {
    LayoutDashboard,
    Users,
    Droplet,
    ClipboardList,
    BarChart3,
    Settings,
    ChevronLeft,
    ChevronRight,
    LogOut,
} from "lucide-react";
import { AuthContext } from "../../AuthProvider/AuthProvider";

export default function AdminSidebar() {
    const [collapsed, setCollapsed] = useState(false);
    const { role, logoutUser } = useContext(AuthContext);

    const linkStyle = ({ isActive }) =>
        `flex items-center gap-3 px-3 py-2 rounded-lg transition
     ${isActive
            ? "bg-red-600 text-white"
            : "text-slate-300 hover:bg-slate-800 hover:text-white"
        }`;

    return (
        <aside
            className={`h-screen bg-slate-900 text-white transition-all duration-300
      ${collapsed ? "w-20" : "w-64"}`}
        >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-slate-700">
                {!collapsed && (
                    <h1 className="font-bold text-lg text-red-500">Blood Admin</h1>
                )}
                <button
                    onClick={() => setCollapsed(!collapsed)}
                    className="p-2 hover:bg-slate-800 rounded"
                >
                    {collapsed ? <ChevronRight /> : <ChevronLeft />}
                </button>
            </div>

            {/* Navigation */}
            <nav className="p-3 space-y-1">
                <NavLink to="/dashboard" className={linkStyle}>
                    <LayoutDashboard size={20} />
                    {!collapsed && "Dashboard"}
                </NavLink>

                {
                    role == 'admin' && (
                        <NavLink to="/dashboard/add-request" className={linkStyle}>
                            <Droplet size={20} />
                            {!collapsed && "Create Blood Request"}
                        </NavLink>
                    )
               }

                <NavLink to="/dashboard/all-user" className={linkStyle}>
                    <Users size={20} />
                    {!collapsed && "Donors & Users"}
                </NavLink>

                <NavLink to="/dashboard/my-requests" className={linkStyle}>
                    <ClipboardList size={20} />
                    {!collapsed && "Donation Requests"}
                </NavLink>

                <NavLink to="/dashboard/analytics" className={linkStyle}>
                    <BarChart3 size={20} />
                    {!collapsed && "Donation Analytics"}
                </NavLink>

                <NavLink to="/dashboard/settings" className={linkStyle}>
                    <Settings size={20} />
                    {!collapsed && "Settings"}
                </NavLink>
            </nav>

            {/* Logout */}
            <div className="p-3 border-t border-slate-700">
                <button
                    onClick={logoutUser}
                    className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg
          text-red-400 hover:bg-red-500/10 transition
          ${collapsed && "justify-center"}`}
                >
                    <LogOut size={20} />
                    {!collapsed && "Logout"}
                </button>
            </div>
        </aside>
    );
}

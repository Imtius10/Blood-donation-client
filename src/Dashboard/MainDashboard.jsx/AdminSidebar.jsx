import { useState, useContext } from "react";
import { NavLink } from "react-router";
import {
  LayoutDashboard,
  Users,
  Droplet,
  ClipboardList,
  BarChart3,
  ChevronLeft,
  ChevronRight,
  LogOut,
  User,
  Home,
  Loader2,
} from "lucide-react";
import { AuthContext } from "../../AuthProvider/AuthProvider";

export default function DashboardSidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const {
    user,
    role,
    loading: authLoading,
    logoutUser,
  } = useContext(AuthContext);

  const linkStyle = ({ isActive }) =>
    `flex items-center gap-3 px-3 py-2 rounded-lg transition
      ${
        isActive
          ? "bg-red-600 text-white"
          : "text-slate-300 hover:bg-slate-800 hover:text-white"
      }`;

  if (authLoading || !role) {
    // Wait until AuthProvider fetches role
    return (
       <aside className="h-screen w-64 bg-slate-900 flex flex-col items-center justify-center">
      <Loader2 className="animate-spin text-red-500 w-10 h-10 mb-4" />
      <p className="text-gray-400 text-center">Loading menu...</p>
    </aside>
    );
  }

  return (
    <aside
      className={`h-screen bg-slate-900 text-white transition-all duration-300 ${
        collapsed ? "w-20" : "w-64"
      }`}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-slate-700">
        {!collapsed && (
          <h1 className="font-bold text-lg text-red-500">Blood Dashboard</h1>
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

        <NavLink to="/dashboard/profile" className={linkStyle}>
          <User size={20} />
          {!collapsed && "Update My Profile"}
        </NavLink>

        <NavLink to="/dashboard/add-request" className={linkStyle}>
          <Droplet size={20} />
          {!collapsed && "Create Blood Request"}
        </NavLink>

        <NavLink to="/dashboard/my-requests" className={linkStyle}>
          <ClipboardList size={20} />
          {!collapsed && "Donation Requests"}
        </NavLink>

        {/* ADMIN */}
        {role === "admin" && (
          <>
            <NavLink to="/dashboard/all-user" className={linkStyle}>
              <Users size={20} />
              {!collapsed && "User Management"}
            </NavLink>
            <NavLink to="/dashboard/all-requests" className={linkStyle}>
              <BarChart3 size={20} />
              {!collapsed && "All Users"}
            </NavLink>
            <NavLink to="/dashboard/all-donation" className={linkStyle}>
              <BarChart3 size={20} />
              {!collapsed && "All Donation Status"}
            </NavLink>
          </>
        )}

        {/* VOLUNTEER */}
        {role === "volunteer" && (
          <>
            <NavLink to="/dashboard/all-requests" className={linkStyle}>
              <ClipboardList size={20} />
              {!collapsed && "Manage Requests"}
            </NavLink>

           
          </>
        )}

        {/* DONOR */}
      </nav>

      {/* Logout & Home */}
      <div className="p-3 border-t border-slate-700 flex gap-2 mt-auto">
        <button
          onClick={logoutUser}
          className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-red-400 hover:bg-red-500/10 transition ${
            collapsed && "justify-center"
          }`}
        >
          <LogOut size={20} />
          {!collapsed && "Logout"}
        </button>

        <NavLink to={"/"}>
          <button
            className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sky-400 hover:bg-sky-500/10 transition ${
              collapsed && "justify-center"
            }`}
          >
            <Home size={20} />
            {!collapsed && "Home"}
          </button>
        </NavLink>
      </div>
    </aside>
  );
}

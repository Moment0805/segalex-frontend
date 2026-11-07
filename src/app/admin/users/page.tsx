"use client";

import React, { useState } from "react";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { useMarketplace } from "@/context/MarketplaceContext";
import { showToast } from "@/components/ui/Toast";
import { UserRole } from "@/types";
import { Users, Shield, UserCheck, Eye, Search } from "lucide-react";

export default function AdminUsersPage() {
  const { userRole, setUserRole } = useMarketplace();

  const [users, setUsers] = useState([
    {
      id: "usr-1",
      name: "Lead System Admin (The Edge Studio)",
      email: "admin@theedgestudio.design",
      role: "admin" as UserRole,
      status: "Active",
      lastActive: "Just now",
    },
    {
      id: "usr-2",
      name: "Mr Segun (MD)",
      email: "segun@segalexglobal.com",
      role: "agent" as UserRole,
      status: "Active (Verified Agent)",
      lastActive: "10 mins ago",
    },
    {
      id: "usr-3",
      name: "Dr. Babatunde Adele",
      email: "babatunde.adele@example.com",
      role: "buyer" as UserRole,
      status: "Active (Verified Buyer)",
      lastActive: "1 hour ago",
    },
    {
      id: "usr-4",
      name: "Folashade Balogun",
      email: "folashade@apexhaven.ng",
      role: "agent" as UserRole,
      status: "Active (Verified Agent)",
      lastActive: "Yesterday",
    },
    {
      id: "usr-5",
      name: "Anonymous Web Visitor",
      email: "visitor_guest@lagosweb.ng",
      role: "visitor" as UserRole,
      status: "Active Session",
      lastActive: "Today",
    },
  ]);

  const handleRoleChange = (userId: string, newRole: UserRole) => {
    setUsers((prev) =>
      prev.map((u) => (u.id === userId ? { ...u, role: newRole } : u))
    );
    showToast("User Role Adjusted", `Role updated to ${newRole.toUpperCase()}.`);
  };

  return (
    <div className="min-h-screen flex bg-[#FAFAF7] text-stone-900">
      <AdminSidebar />

      <main className="flex-1 p-6 sm:p-10 overflow-y-auto space-y-6 max-w-7xl">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-ink font-display uppercase tracking-tight">
            Platform Users & Access Control
          </h1>
          <p className="text-xs text-stone-500 mt-0.5">
            Audit user permissions, assign administrative roles, and inspect active sessions.
          </p>
        </div>

        {/* User Table */}
        <div className="bg-white rounded-2xl border border-stone-200 shadow-sm overflow-hidden">
          <div className="p-4 bg-[#FAFAF7] border-b border-stone-200">
            <h3 className="font-bold text-xs uppercase tracking-wide text-stone-700">
              Registered Accounts Directory
            </h3>
          </div>

          <div className="overflow-x-auto text-xs">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-stone-200 bg-stone-50 text-[10px] font-black uppercase text-stone-500">
                  <th className="p-4">User</th>
                  <th className="p-4">Email</th>
                  <th className="p-4">Assigned Role</th>
                  <th className="p-4">Account Status</th>
                  <th className="p-4">Last Activity</th>
                  <th className="p-4 text-right">Switch Role Simulation</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {users.map((u) => (
                  <tr key={u.id} className="hover:bg-stone-50">
                    <td className="p-4 font-bold text-stone-900">{u.name}</td>
                    <td className="p-4 text-stone-600 font-mono text-[11px]">{u.email}</td>
                    <td className="p-4 font-black uppercase text-[10px] font-mono">
                      <span
                        className={`px-2 py-0.5 rounded ${
                          u.role === "admin"
                            ? "bg-[#151314] text-white"
                            : u.role === "agent"
                            ? "bg-[#008751] text-white"
                            : u.role === "buyer"
                            ? "bg-purple-100 text-purple-800"
                            : "bg-stone-100 text-stone-700"
                        }`}
                      >
                        {u.role}
                      </span>
                    </td>
                    <td className="p-4 text-stone-600">{u.status}</td>
                    <td className="p-4 text-stone-400 text-[11px]">{u.lastActive}</td>
                    <td className="p-4 text-right">
                      <select
                        value={u.role}
                        onChange={(e) => handleRoleChange(u.id, e.target.value as UserRole)}
                        className="p-1.5 bg-[#FAFAF7] border border-stone-200 rounded font-bold text-xs text-stone-800 focus:outline-none"
                      >
                        <option value="visitor">Visitor</option>
                        <option value="buyer">Buyer</option>
                        <option value="agent">Agent</option>
                        <option value="admin">Admin</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}


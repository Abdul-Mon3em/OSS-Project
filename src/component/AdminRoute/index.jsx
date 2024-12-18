import React from "react";
import { useAuth } from "../../hooks/useAuth.jsx";
import NotFound from "../NotFound/index.jsx";
import AuthRoute from "../AuthRoute/index.jsx";
function AdminRoute({ children }) {
  const { user } = useAuth();
  return (user.token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjMzMzNjMWEzLTNjYWUtNDcwMC04ZTk1LWVhZjk3ZWIwNTFlZiIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL25hbWUiOiJ5eSIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL2VtYWlsYWRkcmVzcyI6Inl5QGdtYWlsLmNvbSIsImp0aSI6IjFmYWQ5MDg2LWY5MmMtNGQxNS05NTVkLTRhNmQ4YjM1MjE0NCIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IkFkbWluIiwiaXNBZG1pbiI6IlRydWUiLCJleHAiOjE3MzYwMjk3MDAsImlzcyI6Imh0dHA6Ly9sb2NhbGhvc3Q6NDQyMjUiLCJhdWQiOiJodHRwOi8vbG9jYWxob3N0OjU1NTUifQ.0Q-6GZg6eDCwrt4MzmPLwuPO6bQNMlf-Fu0pCfubX9E" ? (
      <div>{children}</div>
    ) : (
      <NotFound message={"this page is only for Admins"} />
    ));
}

function AdminRouteExport({ children }) {
  return (
    <AuthRoute>
      <AdminRoute>{children}</AdminRoute>
    </AuthRoute>
  );
}
export default AdminRouteExport;

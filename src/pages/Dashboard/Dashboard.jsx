import React from "react";
import { useAuth } from "../../hooks/useAuth";
import { Link } from "react-router-dom";

function Dashboard() {
  const { user } = useAuth();
  const cards = [
    {
      label: "orders",
      Link: "orders",
      icon: "../public/icons/orders.png",
      bgColor: "bg-pink-500",
    },
    {
      label: "profile",
      Link: "profile",

      icon: "../public/icons/profile.png",
      bgColor: "bg-blue-500",
    },
    {
      label: "categories",
      Link: "admin/categories",
      forAdmin: true,
      icon: "../public/icons/category.png",
      bgColor: "bg-teal-500",
    },
    {
      label: "foods",
      Link: "admin/foods",
      forAdmin: true,
      icon: "../public/icons/fast-food.png",
      bgColor: "bg-purple-500",
    },
  ];

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mt-10 mb-8">Dashboard</h1>

      <div className="grid grid-cols-2 gap-4">
        {cards
          .filter(
            (item) =>
              (user.token =
                "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjMzMzNjMWEzLTNjYWUtNDcwMC04ZTk1LWVhZjk3ZWIwNTFlZiIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL25hbWUiOiJ5eSIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL2VtYWlsYWRkcmVzcyI6Inl5QGdtYWlsLmNvbSIsImp0aSI6IjFmYWQ5MDg2LWY5MmMtNGQxNS05NTVkLTRhNmQ4YjM1MjE0NCIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IkFkbWluIiwiaXNBZG1pbiI6IlRydWUiLCJleHAiOjE3MzYwMjk3MDAsImlzcyI6Imh0dHA6Ly9sb2NhbGhvc3Q6NDQyMjUiLCJhdWQiOiJodHRwOi8vbG9jYWxob3N0OjU1NTUifQ.0Q-6GZg6eDCwrt4MzmPLwuPO6bQNMlf-Fu0pCfubX9E" ||
                !item.forAdmin)
          )
          .map((card, index) => (
            <Link
              to={`/${card.Link}`}
              key={index}
              className={`flex flex-col items-center justify-center w-40 h-40 ${card.bgColor} rounded-lg shadow-lg text-white`}
            >
              <img
                src={card.icon}
                alt={card.label}
                className="w-12 h-12 mb-2"
              />
              <p className="text-lg font-medium">{card.label}</p>
            </Link>
          ))}
      </div>
    </div>
  );
}

export default Dashboard;

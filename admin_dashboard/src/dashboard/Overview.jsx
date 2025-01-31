import React, { useEffect, useState } from "react";
import axios from "axios";
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";

function Overview() {
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalOrders: 0,
  });

  const [productDistribution, setProductDistribution] = useState([
    { name: "Electronics", value: 400 },
    { name: "Clothing", value: 300 },
    { name: "Home & Kitchen", value: 200 },
    { name: "Sports", value: 100 },
  ]);

  const topSellingProducts = [
    { name: "iPhone 15", sales: 120 },
    { name: "Samsung Galaxy S22", sales: 90 },
    { name: "MacBook Pro", sales: 80 },
    { name: "Sony Headphones", sales: 70 },
    { name: "Nike Shoes", sales: 60 },
  ];

  // Fetch stats from the API
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/dashboard-stats");
        setStats(response.data.data);
      } catch (error) {
        console.error("Error fetching stats:", error.message);
      }
    };

    fetchStats();
  }, []);

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  return (
    <div className="grid gap-4 md:grid-cols-2">
      {/* Products Card */}
        {/* Products Card */}
        <div className="rounded-lg bg-white p-6 shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Total Products</p>
              <h3 className="mt-1 text-3xl font-semibold">{stats.totalProducts}</h3>
            </div>
            <div className="rounded-full bg-blue-100 p-3">
              <svg
                className="h-6 w-6 text-blue-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                />
              </svg>
            </div>
          </div>
          <div className="mt-4">
            <div className="h-2 w-full rounded-full bg-gray-200">
              <div
                className="h-full rounded-full bg-blue-500"
                style={{ width: "75%" }}
              ></div>
            </div>
          </div>
        </div>

        {/* Orders Card */}
        <div className="rounded-lg bg-white p-6 shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Total Orders</p>
              <h3 className="mt-1 text-3xl font-semibold">{stats.totalOrders}</h3>
            </div>
            <div className="rounded-full bg-purple-100 p-3">
              <svg
                className="h-6 w-6 text-purple-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                />
              </svg>
            </div>
          </div>
          <div className="mt-4">
            <div className="h-2 w-full rounded-full bg-gray-200">
              <div
                className="h-full rounded-full bg-purple-500"
                style={{ width: "65%" }}
              ></div>
            </div>
          </div>
        </div>

        {/* Pie Chart - Product Distribution by Category */}
        <div className="col-span-full rounded-lg bg-white p-6 shadow-lg">
          <h3 className="mb-4 text-lg font-semibold">Product Distribution by Category</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={productDistribution}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                fill="#8884d8"
                paddingAngle={5}
                dataKey="value"
                label
              >
                {productDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Bar Chart - Top Selling Products */}
        <div className="col-span-full rounded-lg bg-white p-6 shadow-lg">
          <h3 className="mb-4 text-lg font-semibold">Top Selling Products</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={topSellingProducts}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="sales" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>

    </div>
  );
}

export default Overview;
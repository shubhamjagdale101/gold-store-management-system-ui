import React, { useEffect, useState } from "react";
import { useSelector } from 'react-redux';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
  CartesianGrid,
} from "recharts";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  const { isLoggedIn } = useSelector((state) => state.admin);

  // Dummy stores
  const stores = [
    {
      id: 1,
      name: "Main Gold Store",
      totalGold: 1000,
      totalAmount: 500000,
      goldTaken: 300,
      goldGiven: 200,
      amountTaken: 120000,
      amountGiven: 80000,
      createdAt: "2024-01-01",
    },
    {
      id: 2,
      name: "Branch Store A",
      totalGold: 750,
      totalAmount: 320000,
      goldTaken: 200,
      goldGiven: 100,
      amountTaken: 90000,
      amountGiven: 50000,
      createdAt: "2024-03-15",
    },
  ];

  const [selectedStore, setSelectedStore] = useState(stores[0]);
  const [goldStats, setGoldStats] = useState([])
  const [amountStats, setAmountStats] = useState([])

  useEffect(() => {
  if (!isLoggedIn) {
    navigate("/login");
  }
}, [isLoggedIn, navigate]);

  const fetchDashboardData = async (durationStr) => {
    try {
      let duration = 0;
      if(durationStr == "Today"){
        duration = 1;
      } else if(durationStr == "Week") {
        duration = 7;
      } else {
        duration = 30;
      }

      const response = await fetch(`http://localhost:8080/dashboard/?duration=${duration}`, {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const res = await response.json();
      if (response.ok) {
        console.log("report " + duration + " " + res)
        const goldReport = {
          label : durationStr,
          taken: res.data.goldTaken,
          given: res.data.goldGiven,
          total: res.data.totalGoldTransaction,
        }
        const amountReport = {
          label : durationStr,
          taken: res.data.amountTaken,
          given: res.data.amountGiven,
          total: res.data.totalAmountTransaction,
        }
        setGoldStats((prev) => [...prev, goldReport]);
        setAmountStats((prev) => [...prev, amountReport]);
      } else {
        console.error("Error fetching dashboard data:", res.message);
      }
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    }
  }

  useEffect(() => {
    fetchDashboardData("Today");
    fetchDashboardData("Week");
    fetchDashboardData("Month");
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-800">Store Dashboard</h1>
        <p className="text-gray-600">Overview of your gold store performance</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-6 mb-6">
        {/* Navigation Buttons */}
        <div className="bg-white rounded-xl shadow-md p-6 w-full lg:w-3/4">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Quick Actions
          </h3>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => navigate("/transactions")}
              className="px-5 py-2.5 bg-gray-600 text-white rounded-lg font-medium hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition duration-200 flex items-center gap-2"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                />
              </svg>
              View Transactions
            </button>
            <button
              onClick={() => navigate("/customers")}
              className="px-5 py-2.5 bg-gray-600 text-white rounded-lg font-medium hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition duration-200 flex items-center gap-2"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              View Customers
            </button>
            <button
              onClick={() => navigate("/stores")}
              className="px-5 py-2.5 bg-gray-600 text-white rounded-lg font-medium hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition duration-200 flex items-center gap-2"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                />
              </svg>
              Visit Stores
            </button>
            <button
              onClick={() => navigate("/transactions/create")}
              className="px-5 py-2.5 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-200 flex items-center gap-2"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
              </svg>
              Create Transaction
            </button>
            <button
              onClick={() => navigate("/stores/create")}
              className="px-5 py-2.5 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-200 flex items-center gap-2"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
              </svg>
              Create Store
            </button>
            <button
              onClick={() => navigate("/customers/create")}
              className="px-5 py-2.5 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-200 flex items-center gap-2"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
              </svg>
              Create Customer
            </button>
          </div>
        </div>

        {/* Store Selector */}
        <div className="bg-white rounded-xl shadow-md p-6 w-full lg:w-1/4">
          <div className="flex flex-col sm:flex-row lg:flex-col items-start sm:items-center lg:items-start gap-4">
            <label className="text-sm font-medium text-gray-700">
              Select Store:
            </label>
            <select
              value={selectedStore.id}
              onChange={(e) =>
                setSelectedStore(
                  stores.find((s) => s.id === parseInt(e.target.value))
                )
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition duration-200"
            >
              {stores.map((store) => (
                <option key={store.id} value={store.id}>
                  {store.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Store Info */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden mb-6">
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-4 text-white">
          <h2 className="text-lg font-semibold">Store Information</h2>
        </div>
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-sm font-medium text-gray-500 mb-1">
              Store Name
            </h3>
            <p className="text-lg font-semibold text-gray-800">
              {selectedStore.name}
            </p>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-sm font-medium text-gray-500 mb-1">
              Total Gold
            </h3>
            <p className="text-lg font-semibold text-gray-800">
              {selectedStore.totalGold.toLocaleString()}g
            </p>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-sm font-medium text-gray-500 mb-1">
              Total Amount
            </h3>
            <p className="text-lg font-semibold text-gray-800">
              ₹{selectedStore.totalAmount.toLocaleString()}
            </p>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-sm font-medium text-gray-500 mb-1">
              Gold Taken
            </h3>
            <p className="text-lg font-semibold text-amber-600">
              {selectedStore.goldTaken.toLocaleString()}g
            </p>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-sm font-medium text-gray-500 mb-1">
              Gold Given
            </h3>
            <p className="text-lg font-semibold text-emerald-600">
              {selectedStore.goldGiven.toLocaleString()}g
            </p>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-sm font-medium text-gray-500 mb-1">
              Amount Taken
            </h3>
            <p className="text-lg font-semibold text-red-600">
              ₹{selectedStore.amountTaken.toLocaleString()}
            </p>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-sm font-medium text-gray-500 mb-1">
              Amount Given
            </h3>
            <p className="text-lg font-semibold text-blue-600">
              ₹{selectedStore.amountGiven.toLocaleString()}
            </p>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-sm font-medium text-gray-500 mb-1">
              Created At
            </h3>
            <p className="text-lg font-medium text-gray-800">
              {selectedStore.createdAt}
            </p>
          </div>
        </div>
      </div>

      {/* Stats Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Gold Stats */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="bg-gradient-to-r from-amber-500 to-amber-600 p-4 text-white">
            <h3 className="text-lg font-semibold">Gold Statistics</h3>
          </div>
          <div className="p-6">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart
                data={goldStats}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="label" />
                <YAxis />
                <Tooltip
                  formatter={(value, name) => {
                    if (name === "Total Transactions") {
                      return [`${value.toFixed(2)}g`, "Total Gold Transactions"];
                    }
                    return [`${value.toFixed(2)}g`, name];
                  }}
                  labelFormatter={(label) => `Time Period: ${label}`}
                />
                <Legend />
                <Bar
                  dataKey="taken"
                  name="Gold Taken"
                  fill="#f59e0b"
                  radius={[4, 4, 0, 0]}
                />
                <Bar
                  dataKey="given"
                  name="Gold Given"
                  fill="#10b981"
                  radius={[4, 4, 0, 0]}
                />
                <Bar
                  dataKey="total"
                  name="Total Transactions"
                  fill="#8b5cf6"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Amount Stats */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-4 text-white">
            <h3 className="text-lg font-semibold">Amount Statistics</h3>
          </div>
          <div className="p-6">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart
                data={amountStats}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="label" />
                <YAxis />
                <Tooltip
                  formatter={(value, name) => {
                    if (name === "Total Transactions") {
                      return [
                        `₹${value.toLocaleString(undefined, {
                          maximumFractionDigits: 2,
                        })}`,
                        "Total Amount Transactions",
                      ];
                    }
                    return [
                      `₹${value.toLocaleString(undefined, {
                        maximumFractionDigits: 2,
                      })}`,
                      name,
                    ];
                  }}
                  labelFormatter={(label) => `Time Period: ${label}`}
                />
                <Legend />
                <Bar
                  dataKey="taken"
                  name="Amount Taken"
                  fill="#ef4444"
                  radius={[4, 4, 0, 0]}
                />
                <Bar
                  dataKey="given"
                  name="Amount Given"
                  fill="#3b82f6"
                  radius={[4, 4, 0, 0]}
                />
                <Bar
                  dataKey="total"
                  name="Total Transactions"
                  fill="#8b5cf6"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
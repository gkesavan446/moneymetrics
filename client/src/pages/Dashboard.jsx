import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from "recharts";

import {
  Wallet,
  TrendingDown,
  Landmark,
  PiggyBank
} from "lucide-react";

import api from "../services/api";
import { useAuth } from "../context/AuthContext";


function Dashboard() {
  const { user } = useAuth();

  const [summary, setSummary] = useState(null);
  const [monthlySummary, setMonthlySummary] = useState([]);
  const [expenseByCategory, setExpenseByCategory] = useState([]);
  const [recentTransactions, setRecentTransactions] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");


  useEffect(() => {
    const getDashboardData = async () => {
      try {
        setLoading(true);
        setError("");

        const [
          summaryResponse,
          monthlyResponse,
          categoryResponse,
          transactionsResponse
        ] = await Promise.all([
          api.get("/dashboard/summary"),
          api.get("/dashboard/monthly"),
          api.get("/dashboard/expense-by-category"),
          api.get("/transactions?page=1&limit=5")
        ]);

        setSummary(summaryResponse.data);

        setMonthlySummary(
          monthlyResponse.data.monthlySummary
        );

        setExpenseByCategory(
          categoryResponse.data.expenseByCategory
        );

        setRecentTransactions(
          transactionsResponse.data.transactions
        );

      } catch (error) {
        setError(
          error.response?.data?.message ||
          "Failed to load dashboard"
        );
      } finally {
        setLoading(false);
      }
    };

    getDashboardData();

  }, []);


  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[300px]">
        <p className="text-gray-500">
          Loading dashboard...
        </p>
      </div>
    );
  }


  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-xl p-4">
        <p className="text-red-600">
          {error}
        </p>
      </div>
    );
  }


  const savingsPercentage =
    summary?.totalIncome > 0
      ? (
          (summary.balance /
            summary.totalIncome) *
          100
        ).toFixed(1)
      : 0;


  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec"
  ];


  const formattedMonthlySummary =
    monthlySummary.map((item) => ({
      ...item,

      monthLabel:
        `${monthNames[item.month - 1]} ${item.year}`
    }));


  const PIE_COLORS = [
    "#3B82F6",
    "#EF4444",
    "#F59E0B",
    "#8B5CF6",
    "#14B8A6",
    "#F97316",
    "#EC4899",
    "#6366F1"
  ];


  return (
    <div className="w-full">

      {/* Header */}

      <div className="mb-6">

        <h2 className="text-xl sm:text-2xl font-bold text-gray-800">
          Good evening, {user?.name.slice(0,1).toUpperCase() + user?.name.slice(1)    } 👋
        </h2>

        <p className="text-sm sm:text-base text-gray-500 mt-1">
          Here's your financial overview.
        </p>

      </div>


      {/* Summary Cards */}

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">

        {/* Income */}

        <div className="bg-white rounded-xl border border-gray-200 p-5 flex items-center gap-4">

          <div className="w-12 h-12 rounded-xl bg-emerald-100 flex items-center justify-center shrink-0">

            <Wallet
              className="text-emerald-600"
              size={24}
            />

          </div>


          <div className="min-w-0">

            <p className="text-sm text-gray-500">
              Total Income
            </p>

            <h3 className="text-xl sm:text-2xl font-bold text-emerald-600 mt-1 break-words">
              ₹
              {summary?.totalIncome?.toLocaleString(
                "en-IN"
              )}
            </h3>

          </div>

        </div>


        {/* Expenses */}

        <div className="bg-white rounded-xl border border-gray-200 p-5 flex items-center gap-4">

          <div className="w-12 h-12 rounded-xl bg-red-100 flex items-center justify-center shrink-0">

            <TrendingDown
              className="text-red-500"
              size={24}
            />

          </div>


          <div className="min-w-0">

            <p className="text-sm text-gray-500">
              Total Expenses
            </p>

            <h3 className="text-xl sm:text-2xl font-bold text-red-500 mt-1 break-words">
              ₹
              {summary?.totalExpense?.toLocaleString(
                "en-IN"
              )}
            </h3>

          </div>

        </div>


        {/* Balance */}

        <div className="bg-white rounded-xl border border-gray-200 p-5 flex items-center gap-4">

          <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center shrink-0">

            <Landmark
              className="text-blue-600"
              size={24}
            />

          </div>


          <div className="min-w-0">

            <p className="text-sm text-gray-500">
              Current Balance
            </p>

            <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mt-1 break-words">
              ₹
              {summary?.balance?.toLocaleString(
                "en-IN"
              )}
            </h3>

          </div>

        </div>


        {/* Savings */}

        <div className="bg-white rounded-xl border border-gray-200 p-5 flex items-center gap-4">

          <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center shrink-0">

            <PiggyBank
              className="text-purple-600"
              size={24}
            />

          </div>


          <div className="min-w-0">

            <p className="text-sm text-gray-500">
              Savings
            </p>

            <h3 className="text-xl sm:text-2xl font-bold text-purple-600 mt-1">
              {savingsPercentage}%
            </h3>

          </div>

        </div>

      </div>


      {/* Charts */}

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-6 mt-6">


        {/* Income vs Expenses */}

        <div className="bg-white rounded-xl border border-gray-200 p-4 sm:p-5">

          <div className="mb-5">

            <h3 className="text-base sm:text-lg font-semibold text-gray-800">
              Income vs Expenses
            </h3>

            <p className="text-sm text-gray-500 mt-1">
              Monthly financial activity
            </p>

          </div>


          {formattedMonthlySummary.length === 0 ? (

            <div className="h-72 flex items-center justify-center">

              <p className="text-gray-500 text-sm">
                No monthly data available.
              </p>

            </div>

          ) : (

            <div className="w-full h-64 sm:h-72 lg:h-80">

              <ResponsiveContainer
                width="100%"
                height="100%"
              >

                <LineChart
                  data={formattedMonthlySummary}
                  margin={{
                    top: 10,
                    right: 10,
                    left: 0,
                    bottom: 10
                  }}
                >

                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="#e5e7eb"
                  />

                  <XAxis
                    dataKey="monthLabel"
                    tick={{
                      fontSize: 12
                    }}
                  />

                  <YAxis
                    tick={{
                      fontSize: 12
                    }}
                  />

                  <Tooltip />

                  <Legend />


                  <Line
                    type="monotone"
                    dataKey="income"
                    name="Income"
                    stroke="#059669"
                    strokeWidth={2}
                    activeDot={{
                      r: 6
                    }}
                  />


                  <Line
                    type="monotone"
                    dataKey="expense"
                    name="Expenses"
                    stroke="#ef4444"
                    strokeWidth={2}
                    activeDot={{
                      r: 6
                    }}
                  />

                </LineChart>

              </ResponsiveContainer>

            </div>

          )}

        </div>


        {/* Expenses by Category */}

        <div className="bg-white rounded-xl border border-gray-200 p-4 sm:p-5">

          <div className="mb-5">

            <h3 className="text-base sm:text-lg font-semibold text-gray-800">
              Expenses by Category
            </h3>

            <p className="text-sm text-gray-500 mt-1">
              Where your money is going
            </p>

          </div>


          {expenseByCategory.length === 0 ? (

            <div className="h-72 flex items-center justify-center">

              <p className="text-gray-500 text-sm">
                No expense data available.
              </p>

            </div>

          ) : (

            <div className="w-full h-72 sm:h-80">

              <ResponsiveContainer
                width="100%"
                height="100%"
              >

                <PieChart>

                  <Pie
                    data={expenseByCategory}
                    dataKey="total"
                    nameKey="category"
                    cx="50%"
                    cy="45%"
                    outerRadius={90}
                    label
                  >

                    {expenseByCategory.map(
                      (entry, index) => (

                        <Cell
                          key={index}
                          fill={
                            PIE_COLORS[
                              index %
                                PIE_COLORS.length
                            ]
                          }
                        />

                      )
                    )}

                  </Pie>

                  <Tooltip />

                  <Legend />

                </PieChart>

              </ResponsiveContainer>

            </div>

          )}

        </div>

      </div>


      {/* Recent Transactions */}

      <div className="bg-white rounded-xl border border-gray-200 p-4 sm:p-5 mt-6">

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-5">

          <div>

            <h3 className="text-base sm:text-lg font-semibold text-gray-800">
              Recent Transactions
            </h3>

            <p className="text-sm text-gray-500 mt-1">
              Your latest financial activity
            </p>

          </div>


          <Link
            to="/transactions"
            className="text-sm font-medium text-emerald-600 hover:text-emerald-700"
          >
            View all
          </Link>

        </div>


        {recentTransactions.length === 0 ? (

          <div className="py-8 text-center">

            <p className="text-gray-500 text-sm">
              No transactions yet.
            </p>

          </div>

        ) : (

          <div className="overflow-x-auto">

            <table className="w-full text-sm min-w-[650px]">

              <thead>

                <tr className="border-b border-gray-200 bg-gray-50/70 text-left text-gray-500">

                  <th className="py-3 px-3 font-medium">
                    Description
                  </th>

                  <th className="py-3 px-3 font-medium">
                    Category
                  </th>

                  <th className="py-3 px-3 font-medium">
                    Type
                  </th>

                  <th className="py-3 px-3 font-medium">
                    Date
                  </th>

                  <th className="py-3 px-3 text-right font-medium">
                    Amount
                  </th>

                </tr>

              </thead>


              <tbody>

                {recentTransactions.map(
                  (transaction) => (

                    <tr
                      key={transaction._id}
                      className="border-b border-gray-100 last:border-b-0 hover:bg-gray-50/70 transition"
                    >

                      <td className="py-3 px-3 font-medium text-gray-800">
                        {transaction.description}
                      </td>


                      <td className="py-3 px-3 text-gray-600">
                        {transaction.category}
                      </td>


                      <td className="py-3 px-3">

                        <span
                          className={`inline-block px-2.5 py-1 rounded-full text-xs font-medium ${
                            transaction.type ===
                            "income"
                              ? "bg-emerald-100 text-emerald-700"
                              : "bg-red-100 text-red-600"
                          }`}
                        >
                          {transaction.type}
                        </span>

                      </td>


                      <td className="py-3 px-3 text-gray-600 whitespace-nowrap">

                        {new Date(
                          transaction.date
                        ).toLocaleDateString(
                          "en-IN"
                        )}

                      </td>


                      <td
                        className={`py-3 px-3 text-right font-semibold whitespace-nowrap ${
                          transaction.type ===
                          "income"
                            ? "text-emerald-600"
                            : "text-red-500"
                        }`}
                      >

                        {transaction.type ===
                        "income"
                          ? "+"
                          : "-"}

                        ₹
                        {transaction.amount.toLocaleString(
                          "en-IN"
                        )}

                      </td>

                    </tr>

                  )
                )}

              </tbody>

            </table>

          </div>

        )}

      </div>

    </div>
  );
}

export default Dashboard;
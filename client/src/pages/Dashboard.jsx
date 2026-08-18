import { useEffect, useState } from "react";
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
      <div className="flex items-center justify-center h-64">
        <p className="text-gray-500">
          Loading dashboard...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <p className="text-red-600">
          {error}
        </p>
      </div>
    );
  }

  const savingsPercentage =
    summary?.totalIncome > 0
      ? (
          (summary.balance / summary.totalIncome) *
          100
        ).toFixed(1)
      : 0;

  return (
    <div>
      {/* Dashboard Header */}

      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800">
          Good evening, {user?.name} 👋
        </h2>

        <p className="text-gray-500 mt-1">
          Here's your financial overview.
        </p>
      </div>


      {/* Summary Cards */}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">

        {/* Total Income */}

        <div className="bg-white rounded-xl border p-5">
          <p className="text-sm text-gray-500">
            Total Income
          </p>

          <h3 className="text-2xl font-bold text-emerald-600 mt-2">
            ₹
            {summary?.totalIncome?.toLocaleString("en-IN")}
          </h3>
        </div>


        {/* Total Expenses */}

        <div className="bg-white rounded-xl border p-5">
          <p className="text-sm text-gray-500">
            Total Expenses
          </p>

          <h3 className="text-2xl font-bold text-red-500 mt-2">
            ₹
            {summary?.totalExpense?.toLocaleString("en-IN")}
          </h3>
        </div>


        {/* Current Balance */}

        <div className="bg-white rounded-xl border p-5">
          <p className="text-sm text-gray-500">
            Current Balance
          </p>

          <h3 className="text-2xl font-bold text-gray-800 mt-2">
            ₹
            {summary?.balance?.toLocaleString("en-IN")}
          </h3>
        </div>


        {/* Savings */}

        <div className="bg-white rounded-xl border p-5">
          <p className="text-sm text-gray-500">
            Savings
          </p>

          <h3 className="text-2xl font-bold text-blue-600 mt-2">
            {savingsPercentage}%
          </h3>
        </div>

      </div>


      {/* Charts */}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">

        {/* Income vs Expenses */}

        <div className="bg-white rounded-xl border p-5">

          <div className="mb-5">
            <h3 className="text-lg font-semibold text-gray-800">
              Income vs Expenses
            </h3>

            <p className="text-sm text-gray-500">
              Monthly financial activity
            </p>
          </div>

          <div className="w-full h-80">

            <ResponsiveContainer
              width="100%"
              height="100%"
            >
              <LineChart data={monthlySummary}>

                <CartesianGrid
                  strokeDasharray="3 3"
                />

                <XAxis
                  dataKey="month"
                />

                <YAxis />

                <Tooltip />

                <Legend />

                <Line
                  type="monotone"
                  dataKey="income"
                  name="Income"
                  stroke="#059669"
                  strokeWidth={2}
                />

                <Line
                  type="monotone"
                  dataKey="expense"
                  name="Expenses"
                  stroke="#ef4444"
                  strokeWidth={2}
                />

              </LineChart>
            </ResponsiveContainer>

          </div>

        </div>


        {/* Expenses by Category */}

        <div className="bg-white rounded-xl border p-5">

          <div className="mb-5">
            <h3 className="text-lg font-semibold text-gray-800">
              Expenses by Category
            </h3>

            <p className="text-sm text-gray-500">
              Where your money is going
            </p>
          </div>

          <div className="w-full h-80">

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
                  cy="50%"
                  outerRadius={100}
                  label
                >

                  {expenseByCategory.map(
                    (entry, index) => (
                      <Cell key={index} />
                    )
                  )}

                </Pie>

                <Tooltip />

                <Legend />

              </PieChart>
            </ResponsiveContainer>

          </div>

        </div>

      </div>


      {/* Recent Transactions */}

      <div className="bg-white rounded-xl border p-5 mt-6">

        <div className="flex items-center justify-between mb-5">

          <div>
            <h3 className="text-lg font-semibold text-gray-800">
              Recent Transactions
            </h3>

            <p className="text-sm text-gray-500">
              Your latest financial activity
            </p>
          </div>

          <a
            href="/transactions"
            className="text-sm text-emerald-600 hover:underline"
          >
            View all
          </a>

        </div>


        {recentTransactions.length === 0 ? (

          <p className="text-gray-500 text-sm">
            No transactions yet.
          </p>

        ) : (

          <div className="overflow-x-auto">

            <table className="w-full text-sm">

              <thead>
                <tr className="border-b text-left text-gray-500">

                  <th className="py-3">
                    Description
                  </th>

                  <th className="py-3">
                    Category
                  </th>

                  <th className="py-3">
                    Date
                  </th>

                  <th className="py-3 text-right">
                    Amount
                  </th>

                </tr>
              </thead>

              <tbody>

                {recentTransactions.map(
                  (transaction) => (

                    <tr
                      key={transaction._id}
                      className="border-b last:border-b-0"
                    >

                      <td className="py-3">
                        {transaction.description}
                      </td>

                      <td className="py-3 text-gray-600">
                        {transaction.category}
                      </td>

                      <td className="py-3 text-gray-600">
                        {new Date(
                          transaction.date
                        ).toLocaleDateString("en-IN")}
                      </td>

                      <td
                        className={`py-3 text-right font-semibold ${
                          transaction.type === "income"
                            ? "text-emerald-600"
                            : "text-red-500"
                        }`}
                      >
                        {transaction.type === "income"
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













// import { useEffect, useState } from "react";
// import api from "../services/api.js";
// import { useAuth } from "../context/AuthContext.jsx";

// function Dashboard() {
//   const { user } = useAuth();

//   const [summary, setSummary] = useState(null);
//   const [monthlySummary, setMonthlySummary] = useState([]);
//   const [expenseByCategory, setExpenseByCategory] = useState([]);

//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     const getDashboardData = async () => {
//       try {
//         setLoading(true);
//         setError("");

//         const [ summaryResponse,
//           monthlyResponse,
//           categoryResponse
//         ] = await Promise.all([
//           api.get("/dashboard/summary"),
//           api.get("/dashboard/monthly"),
//           api.get("/dashboard/expense-by-category")
//         ]);

//         setSummary(summaryResponse.data);
//         setMonthlySummary(
//           monthlyResponse.data.monthlySummary
//         );
//         setExpenseByCategory(
//           categoryResponse.data.expenseByCategory
//         );
//       } catch (error) {
//         setError(
//           error.response?.data?.message ||
//             "Failed to load dashboard"
//         );
//       } finally {
//         setLoading(false);
//       }
//     };

//     getDashboardData();
//   }, []);

//   if (loading) {
//     return <p>Loading dashboard...</p>;
//   }

//   if (error) {
//     return <p className="text-red-500">{error}</p>;
//   }

//   return (
//     <div>
//       <h2 className="text-2xl font-bold">
//         Good evening, {user?.name} 👋
//       </h2>

//       <p className="text-gray-500 mt-1">
//         Here's your financial overview.
//       </p>

//       <div className="mt-6">
//         <p>Total Income: ₹{summary?.totalIncome}</p>
//         <p>Total Expenses: ₹{summary?.totalExpense}</p>
//         <p>Balance: ₹{summary?.balance}</p>
//       </div>

//       <div className="mt-6">
//         <h3 className="font-semibold">
//           Monthly Summary
//         </h3>

//         <pre>
//           {JSON.stringify(monthlySummary, null, 2)}
//         </pre>
//       </div>

//       <div className="mt-6">
//         <h3 className="font-semibold">
//           Expense by Category
//         </h3>

//         <pre>
//           {JSON.stringify(expenseByCategory, null, 2)}
//         </pre>
//       </div>
//     </div>
//   );
// }

// export default Dashboard;
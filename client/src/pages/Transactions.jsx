import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Plus, Pencil, Trash2 } from "lucide-react";
import api from "../services/api.js";

function Transactions() {
  const [transactions, setTransactions] = useState([]);
  const [page, setPage] = useState(1);
 

  const [pagination, setPagination] = useState({
    totalPages: 1,
    totalTransactions: 0
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [type, setType] = useState("");
  const [category, setCategory] = useState("");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [sort, setSort] = useState("latest");

  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  const limit = 10;

  const handleClearFilters = () => {
    setSearch("");
    setType("");
    setCategory("");
    setFrom("");
    setTo("");
    setSort("latest");
    setPage(1);
  };

    useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 700);

    return () => {
      clearTimeout(timer);
    };
  }, [search]);

  useEffect(() => {
    const getTransactions = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await api.get(
          `/transactions?page=${page}&limit=${limit}&search=${debouncedSearch}&type=${type}&category=${category}&from=${from}&to=${to}&sort=${sort}`
        );

        setTransactions(response.data.transactions);

        // setPagination({
        //   totalPages: response.data.pagination.totalPages,
        //   totalTransactions: esponse.data.pagination.totalTransactions
        // });
        setPagination(response.data.pagination);
      } catch (error) {
        setError(
          error.response?.data?.message ||
            "Failed to load transactions"
        );
      } finally {
        setLoading(false);
      }
    };
    getTransactions();
  }, [page, debouncedSearch, type, category, from, to, sort]);

  const handlePrevious = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const handleNext = () => {
    if (page < pagination.totalPages) {
      setPage(page + 1);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this transaction?"
    );

    if (!confirmDelete) return;

    try {
      await api.delete(`/transactions/${id}`);

      setTransactions((prev) =>
        prev.filter(
          (transaction) =>
            transaction._id !== id
        )
      );

      setPagination((prev) => ({
        ...prev,
        totalTransactions:
          prev.totalTransactions - 1
      }));
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Failed to delete transaction"
      );
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[300px]">
        <p className="text-gray-500">
          Loading transactions...
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

  return (
    <div className="w-full">

      {/* Header */}

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">

        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-800">
            Transactions
          </h2>

          <p className="text-sm sm:text-base text-gray-500 mt-1">
            Manage your income and expenses.
          </p>
        </div>

        <Link
          to="/transactions/add"
          className="inline-flex items-center justify-center gap-2 bg-emerald-600 text-white px-4 py-2.5 rounded-lg hover:bg-emerald-700 transition w-full sm:w-auto"
        >
          <Plus size={18} />
          Add Transaction
        </Link>

      </div>


      {/* Filters */}

      <div className="bg-white rounded-xl border border-gray-200 p-4 sm:p-5 mb-6">

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-6 gap-4">

          {/* Search */}

          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1.5">
              Search
            </label>

            <input
              type="text"
              placeholder="Search description or category..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              className="w-full h-11 border border-gray-300 rounded-lg px-4 text-sm outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
            />
          </div>


          {/* Type */}

          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1.5">
              Type
            </label>

            <select
              value={type}
              onChange={(e) => {
                setType(e.target.value);
                setPage(1);
              }}
              className="w-full h-11 border border-gray-300 rounded-lg px-4 text-sm outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
            >
              <option value="">
                All Types
              </option>

              <option value="income">
                Income
              </option>

              <option value="expense">
                Expense
              </option>
            </select>
          </div>


          {/* Category */}

          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1.5">
              Category
            </label>

            <select
              value={category}
              onChange={(e) => {
                setCategory(e.target.value);
                setPage(1);
              }}
              className="w-full h-11 border border-gray-300 rounded-lg px-4 text-sm outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
            >
              <option value="">
                All Categories
              </option>

              <option value="Salary">
                Salary
              </option>

              <option value="Freelance">
                Freelance
              </option>

              <option value="Business">
                Business
              </option>

              <option value="Investment">
                Investment
              </option>

              <option value="Food">
                Food
              </option>

              <option value="Transport">
                Transport
              </option>

              <option value="Shopping">
                Shopping
              </option>

              <option value="Bills">
                Bills
              </option>

              <option value="Entertainment">
                Entertainment
              </option>

              <option value="Health">
                Health
              </option>

              <option value="Education">
                Education
              </option>

              <option value="Travel">
                Travel
              </option>

              <option value="Other">
                Other
              </option>
            </select>
          </div>


          {/* From */}

          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1.5">
              From
            </label>

            <input
              type="date"
              value={from}
              onChange={(e) => {
                setFrom(e.target.value);
                setPage(1);
              }}
              className="w-full h-11 border border-gray-300 rounded-lg px-4 text-sm outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
            />
          </div>


          {/* To */}

          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1.5">
              To
            </label>

            <input
              type="date"
              value={to}
              onChange={(e) => {
                setTo(e.target.value);
                setPage(1);
              }}
              className="w-full h-11 border border-gray-300 rounded-lg px-4 text-sm outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
            />
          </div>


          {/* Sort */}

          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1.5">
              Sort
            </label>

            <select
              value={sort}
              onChange={(e) => {
                setSort(e.target.value);
                setPage(1);
              }}
              className="w-full h-11 border border-gray-300 rounded-lg px-4 text-sm outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
            >
              <option value="latest">
                Latest
              </option>

              <option value="oldest">
                Oldest
              </option>
            </select>
          </div>

        </div>


        {/* Clear Filters */}

        <div className="mt-4">

          <button
            onClick={handleClearFilters}
            className="w-full sm:w-auto px-4 py-2 border border-gray-300 rounded-lg text-sm text-gray-700 hover:bg-gray-300 transition"
          >
            Clear Filters
          </button>

        </div>

      </div>


      {/* Transaction Table */}

      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">

        {transactions.length === 0 ? (

          <div className="p-8 sm:p-12 text-center">

            <p className="text-gray-500">
              No transactions found.
            </p>

            <Link
              to="/transactions/add"
              className="inline-block mt-3 text-sm font-medium text-emerald-600 hover:text-emerald-700"
            >
              Add your first transaction
            </Link>

          </div>

        ) : (

          <div className="overflow-x-auto">

            <table className="w-full min-w-[800px] text-sm">

              <thead>

                <tr className="border-b border-gray-200 bg-gray-50/70 text-left text-gray-500">

                  <th className="px-5 py-4 font-medium">
                    Description
                  </th>

                  <th className="px-5 py-4 font-medium">
                    Type
                  </th>

                  <th className="px-5 py-4 font-medium">
                    Category
                  </th>

                  <th className="px-5 py-4 font-medium">
                    Date
                  </th>

                  <th className="px-5 py-4 text-right font-medium">
                    Amount
                  </th>

                  <th className="px-5 py-4 text-center font-medium">
                    Actions
                  </th>

                </tr>

              </thead>


              <tbody>

                {transactions.map(
                  (transaction) => (

                    <tr
                      key={transaction._id}
                      className="border-b border-gray-100 last:border-b-0 hover:bg-gray-50/70 transition"
                    >

                      {/* Description */}

                      <td className="px-5 py-4 font-medium text-gray-800">
                        {transaction.description}
                      </td>


                      {/* Type */}

                      <td className="px-5 py-4">

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


                      {/* Category */}

                      <td className="px-5 py-4 text-gray-600">
                        {transaction.category}
                      </td>


                      {/* Date */}

                      <td className="px-5 py-4 text-gray-600 whitespace-nowrap">

                        {new Date(
                          transaction.date
                        ).toLocaleDateString(
                          "en-IN"
                        )}

                      </td>


                      {/* Amount */}

                      <td
                        className={`px-5 py-4 text-right font-semibold whitespace-nowrap ${
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


                      {/* Actions */}

                      <td className="px-5 py-4">

                        <div className="flex items-center justify-center gap-2">

                          <Link
                            to={`/transactions/edit/${transaction._id}`}
                            className="p-2 border border-blue-200 rounded-lg text-blue-600 hover:bg-blue-50 hover:border-blue-300 transition"
                            title="Edit transaction"
                          >
                            <Pencil size={16} />
                          </Link>


                          <button
                            onClick={() =>
                              handleDelete(
                                transaction._id
                              )
                            }
                            className="p-2 border border-red-200 rounded-lg text-red-500 hover:bg-red-50 hover:border-red-300 transition"
                            title="Delete transaction"
                          >
                            <Trash2 size={16} />
                          </button>

                        </div>

                      </td>

                    </tr>

                  )
                )}

              </tbody>

            </table>

          </div>

        )}

      </div>


      {/* Pagination */}

      {pagination.totalTransactions > 0 && (

        <div className="bg-white border border-gray-200 rounded-xl px-4 sm:px-5 py-4 mt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

          <p className="text-sm text-gray-500 text-center sm:text-left">
            Total:{" "}
            <span className="font-medium text-gray-700">
              {pagination.totalTransactions}
            </span>{" "}
            transactions
          </p>


          <div className="flex items-center justify-center gap-2 sm:gap-3">

            <button
              onClick={handlePrevious}
              disabled={page === 1}
              className="px-3 sm:px-4 py-2 border border-gray-300 rounded-lg text-sm text-gray-700 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-50 transition"
            >
              Previous
            </button>


            <span className="text-sm text-gray-600 whitespace-nowrap">
              Page{" "}
              <span className="font-medium text-gray-800">
                {page}
              </span>{" "}
              of{" "}
              <span className="font-medium text-gray-800">
                {pagination.totalPages}
              </span>
            </span>


            <button
              onClick={handleNext}
              disabled={
                page ===
                pagination.totalPages
              }
              className="px-3 sm:px-4 py-2 border border-emerald-300 rounded-lg text-sm text-emerald-700 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-emerald-50 transition"
            >
              Next
            </button>

          </div>

        </div>

      )}

    </div>
  );
}

export default Transactions;
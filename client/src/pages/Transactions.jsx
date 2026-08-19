import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from '../services/api.js';


function Transactions() {

  const [transactions, setTransactions] = useState();
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
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
    const getTransactions = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await api.get(
        `/transactions?page=${page}&limit=${limit}&search=${search}&type=${type}&category=${category}&from=${from}&to=${to}&sort=${sort}`
        );
        // console.log("check123", response)
        setTransactions(response.data.transactions);
        setPagination({
          totalPages: response.data.totalPages,
          totalTransactions: response.data.totalTransactions
        });
      } catch (error) {
        setError(error.response?.data?.message || "Failed to load transactions");
      } finally {
        setLoading(false);
      }
    }
    getTransactions();
  }, [page, search, type, category, from, to, sort])

  const handlePrevious = () => {
    if (page > 1) {
      setPage(page - 1)
    }
  };

  const handleNext = () => {
    if (page < pagination.totalPages) {
      setPage(page + 1)
    }
  };

  const handleDelete = async (id) => {

    const confirmDelete = window.confirm( "Are you sure you want to delete this transaction?");

    if(!confirmDelete) return ;

    try {
      await api.delete(`/transactions/${id}`);

      setTransactions((prev)=> prev.filter(transaction => transaction._id !== id));
      setPagination((prev)=> ({...prev, totalTransactions: prev.totalTransactions - 1}));

    } catch (error) {
      setError(error.response?.data?.message || "Failed to delete transaction");
    }
  }

  if (loading) {
    return <p>Loading Transactions....</p>
  }

  if (error) {
    return <p className="text-red-500"> {error} </p>
  }


  return (
    <div>

      {/* Header */}

      <div className="flex items-center justify-between mb-6">

        <div>
          <h2 className="text-2xl font-bold text-gray-800">
            Transactions
          </h2>

          <p className="text-gray-500 mt-1">
            Manage your income and expenses.
          </p>
        </div>

        <Link
          to="/transactions/add"
          className="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700"
        >
          + Add Transaction
        </Link>

      </div>
{/* 
      <div className="bg-white rounded-xl border p-4 mb-6">

        <input
          type="text"
          placeholder="Search by description or category..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
          className="w-full border rounded-lg px-4 py-2"
        />

      </div> */}

      <div className="bg-white rounded-xl border p-4 mb-6">

  <div className="grid grid-cols-1 md:grid-cols-6 gap-4">

    {/* Search */}

    <input
      type="text"
      placeholder="Search by description or category..."
      value={search}
      onChange={(e) => {
        setSearch(e.target.value);
        setPage(1);
      }}
      className="border rounded-lg px-4 py-2"
    />


    {/* Type */}

    <select
      value={type}
      onChange={(e) => {
        setType(e.target.value);
        setPage(1);
      }}
      className="border rounded-lg px-4 py-2"
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


    {/* Category */}

    <select
      value={category}
      onChange={(e) => {
        setCategory(e.target.value);
        setPage(1);
      }}
      className="border rounded-lg px-4 py-2"
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

    <input
  type="date"
  value={from}
  onChange={(e) => {
    setFrom(e.target.value);
    setPage(1);
  }}
  className="border rounded-lg px-4 py-2"
/>

<input
  type="date"
  value={to}
  onChange={(e) => {
    setTo(e.target.value);
    setPage(1);
  }}
  className="border rounded-lg px-4 py-2"
/>
<select
  value={sort}
  onChange={(e) => {
    setSort(e.target.value);
    setPage(1);
  }}
  className="border rounded-lg px-4 py-2"
>
  <option value="latest">
    Latest
  </option>

  <option value="oldest">
    Oldest
  </option>
</select>

  </div>
  <button
  onClick={handleClearFilters}
  className="mt-4 px-4 py-2 border rounded-lg hover:bg-gray-50"
>
  Clear Filters
</button>

</div>


      {/* Transaction Table */}

      <div className="bg-white rounded-xl border overflow-hidden">

        {transactions.length === 0 ? (

          <div className="p-8 text-center">
            <p className="text-gray-500">
              No transactions found.
            </p>
          </div>

        ) : (

          <div className="overflow-x-auto">

            <table className="w-full text-sm">

              <thead>
                <tr className="border-b bg-gray-50 text-left text-gray-500">

                  <th className="px-5 py-4">
                    Description
                  </th>

                  <th className="px-5 py-4">
                    Type
                  </th>

                  <th className="px-5 py-4">
                    Category
                  </th>

                  <th className="px-5 py-4">
                    Date
                  </th>

                  <th className="px-5 py-4 text-right">
                    Amount
                  </th>

                  <th className="px-5 py-4 text-right">
                    Actions
                  </th>

                </tr>
              </thead>

              <tbody>

                {transactions.map((transaction) => (

                  <tr
                    key={transaction._id}
                    className="border-b last:border-b-0 hover:bg-gray-50"
                  >

                    <td className="px-5 py-4">
                      {transaction.description}
                    </td>

                    <td className="px-5 py-4">
                      <span
                        className={
                          transaction.type === "income"
                            ? "text-emerald-600"
                            : "text-red-500"
                        }
                      >
                        {transaction.type}
                      </span>
                    </td>

                    <td className="px-5 py-4 text-gray-600">
                      {transaction.category}
                    </td>

                    <td className="px-5 py-4 text-gray-600">
                      {new Date(
                        transaction.date
                      ).toLocaleDateString("en-IN")}
                    </td>

                    <td
                      className={`px-5 py-4 text-right font-semibold ${transaction.type === "income"
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

                    <td className="px-5 py-4 text-right">
                      <div className="flex justify-end gap-2">

                        <Link
                          to={`/transactions/edit/${transaction._id}`}
                          className="text-blue-600 hover:text-blue-800"
                        >
                          Edit
                        </Link>

                        <button
                         onClick={() => handleDelete(transaction._id)}
                          className="text-red-500 hover:text-red-700"
                        >
                          Delete
                        </button>

                        </div>
                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

        )}

      </div>


      {/* Pagination */}

      {pagination.totalTransactions > 0 && (

        <div className="flex items-center justify-between mt-5">

          <p className="text-sm text-gray-500">
            Total: {pagination.totalTransactions} transactions
          </p>

          <div className="flex items-center gap-3">

            <button
              onClick={handlePrevious}
              disabled={page === 1}
              className="px-4 py-2 border rounded-lg disabled:opacity-50"
            >
              Previous
            </button>

            <span className="text-sm">
              Page {page} of {pagination.totalPages}
            </span>

            <button
              onClick={handleNext}
              disabled={page === pagination.totalPages}
              className="px-4 py-2 border rounded-lg disabled:opacity-50"
            >
              Next
            </button>

          </div>

        </div>

      )}

    </div>
  )
};

export default Transactions;
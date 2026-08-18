import { useEffect, useState } from "react";
import {Link} from "react-router-dom";
import api from '../services/api.js';


function Transactions(){

    const [transactions, setTransactions] = useState();
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState("");
    const [pagination, setPagination] =useState({
        totalPages: 1,
        totalTransactions: 0
    });

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const limit = 10;

    useEffect(()=>{
        const getTransactions = async () => {
            try {
                setLoading(true);
                setError("");

                const response = await api.get(`/transactions?page=${page}&limit=${limit}&search=${search}`);
                console.log("check123", response)
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
    },[page])

    const handlePrevious = () => {
        if(page > 1){
            setPage(page - 1)
        }
    };

    const handleNext = () => {
        if(page < pagination.totalPages){
            setPage(page + 1)
        }
    };

    if(loading){
        return <p>Loading Transactions....</p>
    }

    if(error){
        return  <p className="text-red-500"> {error} </p>
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
                      className={`px-5 py-4 text-right font-semibold ${
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
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Plus } from "lucide-react";
import api from "../services/api.js";

function AddTransaction() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    type: "",
    category: "",
    amount: "",
    description: "",
    date: ""
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const incomeCategories = [
    "Salary",
    "Freelance",
    "Business",
    "Investment",
    "Other"
  ];

  const expenseCategories = [
    "Food",
    "Transport",
    "Shopping",
    "Bills",
    "Entertainment",
    "Health",
    "Education",
    "Travel",
    "Other"
  ];

  const categories =
    formData.type === "income"
      ? incomeCategories
      : formData.type === "expense"
      ? expenseCategories
      : [];

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleTypeChange = (e) => {
    setFormData({
      ...formData,
      type: e.target.value,
      category: ""
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError("");

      await api.post("/transactions", {
        ...formData,
        amount: Number(formData.amount)
      });

      navigate("/transactions");

    } catch (error) {
      setError(
        error.response?.data?.message ||
        "Failed to create transaction"
      );

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto">

      {/* Header */}

      <div className="mb-6">

        <button
          onClick={() =>
            navigate("/transactions")
          }
          className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-800 mb-4"
        >
          <ArrowLeft size={17} />
          Back to Transactions
        </button>

        <h2 className="text-xl sm:text-2xl font-bold text-gray-800">
          Add Transaction
        </h2>

        <p className="text-sm sm:text-base text-gray-500 mt-1">
          Add a new income or expense.
        </p>

      </div>


      {/* Form Card */}

      <div className="bg-white border border-gray-200 rounded-xl p-4 sm:p-6">

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 rounded-lg px-4 py-3 mb-5 text-sm">
            {error}
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >

          {/* Type + Category */}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Type
              </label>

              <select
                name="type"
                value={formData.type}
                onChange={handleTypeChange}
                className="w-full h-11 border border-gray-300 rounded-lg px-4 outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                required
              >
                <option value="">
                  Select type
                </option>

                <option value="income">
                  Income
                </option>

                <option value="expense">
                  Expense
                </option>
              </select>
            </div>


            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Category
              </label>

              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                disabled={!formData.type}
                className="w-full h-11 border border-gray-300 rounded-lg px-4 outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
                required
              >
                <option value="">
                  Select category
                </option>

                {categories.map((category) => (
                  <option
                    key={category}
                    value={category}
                  >
                    {category}
                  </option>
                ))}
              </select>
            </div>

          </div>


          {/* Amount + Date */}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Amount
              </label>

              <input
                type="number"
                name="amount"
                step="0.01"
                min="0.01"
                value={formData.amount}
                onChange={handleChange}
                placeholder="Enter amount"
                className="w-full h-11 border border-gray-300 rounded-lg px-4 outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                required
              />
            </div>


            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Date
              </label>

              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className="w-full h-11 border border-gray-300 rounded-lg px-4 outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                required
              />
            </div>

          </div>


          {/* Description */}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Description
            </label>

            <input
              type="text"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Enter description"
              className="w-full h-11 border border-gray-300 rounded-lg px-4 outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
              required
            />
          </div>


          {/* Buttons */}

          <div className="flex flex-col-reverse sm:flex-row gap-3 pt-2">

            <button
              type="button"
              onClick={() =>
                navigate("/transactions")
              }
              className="w-full sm:w-auto border border-gray-300 text-gray-700 px-5 py-2.5 rounded-lg hover:bg-gray-50 transition"
            >
              Cancel
            </button>


            <button
              type="submit"
              disabled={loading}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-emerald-600 text-white px-5 py-2.5 rounded-lg hover:bg-emerald-700 disabled:opacity-50 transition"
            >
              <Plus size={18} />

              {loading
                ? "Adding..."
                : "Add Transaction"}
            </button>

          </div>

        </form>

      </div>

    </div>
  );
}

export default AddTransaction;
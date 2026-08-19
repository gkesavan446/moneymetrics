import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api.js";

function AddTransaction(){

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

    const incomeCategories = ["Salary", "Freelance", "Business", "Investment", "Other"];

    const expenseCategories = ["Food", "Transport", "Shopping", "Bills", 
        "Entertainment", "Health", "Education", "Travel",  "Other"];

    const categories = formData.type === "income" ? incomeCategories : 
                formData.type === "expense" ? expenseCategories : [];
    
    const handleChange = (e) => {
        const { name, value} = e.target;
        setFormData({
            ...formData, [name]: value
        })
    };

    const handleTypeChange = (e) => {
        setFormData({
            ...formData,
            type: e.target.value,
            category: ""
        })
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setLoading(true);
            setError("");

            await api.post("/transactions", {
                ...formData, amount: Number(formData.amount)
            })
            navigate("/transactions")
        } catch (error) {
            setError(error.response?.data?.message || "Failed to create transaction");
        } finally {
            setLoading(false);
        }
    };


    return (
        <div className="max-w-2xl">

      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800">
          Add Transaction
        </h2>

        <p className="text-gray-500 mt-1">
          Add a new income or expense.
        </p>
      </div>

      <div className="bg-white border rounded-xl p-6">

        {error && (
          <p className="text-red-500 mb-4">
            {error}
          </p>
        )}

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >

          {/* Type */}

          <div>
            <label className="block text-sm font-medium mb-1">
              Type
            </label>

            <select
              name="type"
              value={formData.type}
              onChange={handleTypeChange}
              className="w-full border rounded-lg px-4 py-2"
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


          {/* Category */}

          <div>
            <label className="block text-sm font-medium mb-1">
              Category
            </label>

            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              disabled={!formData.type}
              className="w-full border rounded-lg px-4 py-2 disabled:bg-gray-100"
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


          {/* Amount */}

          <div>
            <label className="block text-sm font-medium mb-1">
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
              className="w-full border rounded-lg px-4 py-2"
              required
            />
          </div>


          {/* Description */}

          <div>
            <label className="block text-sm font-medium mb-1">
              Description
            </label>

            <input
              type="text"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Enter description"
              className="w-full border rounded-lg px-4 py-2"
              required
            />
          </div>


          {/* Date */}

          <div>
            <label className="block text-sm font-medium mb-1">
              Date
            </label>

            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="w-full border rounded-lg px-4 py-2"
              required
            />
          </div>


          {/* Buttons */}

          <div className="flex gap-3">

            <button
              type="submit"
              disabled={loading}
              className="bg-emerald-600 text-white px-5 py-2 rounded-lg hover:bg-emerald-700 disabled:opacity-50"
            >
              {loading
                ? "Adding..."
                : "Add Transaction"}
            </button>

            <button
              type="button"
              onClick={() => navigate("/transactions")}
              className="border px-5 py-2 rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>

          </div>

        </form>

      </div>

    </div>
  
    )
}

export default AddTransaction;
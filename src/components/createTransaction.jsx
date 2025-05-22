import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { resetAdmin } from '../reducers/admin';
import { useDispatch } from 'react-redux';

const CreateTransaction = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const [form, setForm] = useState({
    customer_id: '',
    type: 'buy',
    gold_weight: '',
    gold_price: '',
    description: '',
    store_name: '',
    payment_method: 'cash',
  });
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Prepare the transaction data
    const transactionData = {
      ...form,
      customer_id: parseInt(form.customer_id),
      gold_weight: parseFloat(form.gold_weight),
      gold_price: parseFloat(form.gold_price)
    };

    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const response = await fetch("http://localhost:8080/transactions/", {
        method: "POST",
        credentials: 'include',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(transactionData),
      });

      const res = await response.json();
      
      if (response.ok) {
        setSuccess("Transaction created successfully!");
        // Reset form after successful submission
        setForm({
          customer_id: '',
          type: 'buy',
          gold_weight: '',
          gold_price: '',
          description: '',
          store_name: '',
          payment_method: 'cash',
        });
        // Optionally redirect after a delay
        setTimeout(() => navigate('/transactions'), 500);
      } else {
        if (response.status === 401) {
          console.log("Unauthorized access, redirecting to login");
          dispatch(resetAdmin());
          navigate('/login');
        } else {
          setError(res.error || "Failed to create transaction");
        }
      }
    } catch (error) {
      setError(error.message || "An error occurred while creating transaction");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="bg-gradient-to-r from-yellow-600 to-orange-500 p-6 text-white">
          <h1 className="text-2xl font-bold">Create Transaction</h1>
          <p className="text-yellow-100">Enter transaction details carefully</p>
        </div>

        <div className="p-6 md:p-8">
          {success && (
            <div className="mb-4 p-4 bg-green-50 text-green-700 rounded-lg border border-green-200 flex items-center">
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              {success}
            </div>
          )}
          {error && (
            <div className="mb-4 p-4 bg-red-50 text-red-700 rounded-lg border border-red-200 flex items-center">
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="text-sm font-medium text-gray-700">Customer ID *</label>
                <input
                  type="number"
                  name="customer_id"
                  value={form.customer_id}
                  onChange={handleChange}
                  required
                  className="w-full mt-1 px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700">Transaction Type *</label>
                <select
                  name="type"
                  value={form.type}
                  onChange={handleChange}
                  required
                  className="w-full mt-1 px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                >
                  <option value="buy">Buy</option>
                  <option value="sell">Sell</option>
                </select>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700">Gold Weight (g) *</label>
                <input
                  type="number"
                  name="gold_weight"
                  value={form.gold_weight}
                  onChange={handleChange}
                  min="0.01"
                  step="0.01"
                  required
                  className="w-full mt-1 px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700">Gold Price (₹/g) *</label>
                <input
                  type="number"
                  name="gold_price"
                  value={form.gold_price}
                  onChange={handleChange}
                  min="0.01"
                  step="0.01"
                  required
                  className="w-full mt-1 px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700">Store Name *</label>
                <input
                  type="text"
                  name="store_name"
                  value={form.store_name}
                  onChange={handleChange}
                  required
                  className="w-full mt-1 px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700">Payment Method</label>
                <select
                  name="payment_method"
                  value={form.payment_method}
                  onChange={handleChange}
                  className="w-full mt-1 px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                >
                  <option value="cash">Cash</option>
                  <option value="borrowed_gold">Borrowed Gold</option>
                  <option value="borrowed_money">Borrowed Money</option>
                  <option value="upi">UPI</option>
                </select>
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">Description</label>
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                rows={3}
                className="w-full mt-1 px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
              />
            </div>

            <div className="flex flex-col sm:flex-row justify-end gap-3 pt-4">
              <button
                type="button"
                onClick={() => navigate('/dashboard')}
                disabled={loading}
                className="px-5 py-2 rounded-lg border border-gray-300 hover:bg-gray-100 transition disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition disabled:opacity-50 flex items-center justify-center"
              >
                {loading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Creating...
                  </>
                ) : (
                  'Create Transaction'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateTransaction;
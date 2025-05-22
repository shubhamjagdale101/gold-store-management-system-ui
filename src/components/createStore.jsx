import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { resetAdmin } from '../reducers/admin';
import { useDispatch } from 'react-redux';

const CreateStore = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Form state
  const [storeData, setStoreData] = useState({
    name: '',
    totalGold: '',
    totalAmount: '',
    goldTaken: '',
    amountTaken: '',
    goldGiven: '',
    amountGiven: '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStoreData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      // Prepare the data with proper number conversions
      const payload = {
        ...storeData,
        totalGold: parseFloat(storeData.totalGold),
        totalAmount: parseFloat(storeData.totalAmount),
        goldTaken: parseFloat(storeData.goldTaken),
        amountTaken: parseFloat(storeData.amountTaken),
        goldGiven: parseFloat(storeData.goldGiven),
        amountGiven: parseFloat(storeData.amountGiven),
      };

      const response = await fetch("http://localhost:8080/stores", {
        method: "POST",
        credentials: 'include',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess("Store created successfully!");
        // Reset form after successful submission
        setStoreData({
          name: '',
          totalGold: '',
          totalAmount: '',
          goldTaken: '',
          amountTaken: '',
          goldGiven: '',
          amountGiven: '',
        });
        // Optionally redirect after a delay
        setTimeout(() => navigate('/stores'), 500);
      } else {
        if (response.status === 401) {
          console.log("Unauthorized access, redirecting to login");
          dispatch(resetAdmin());
          navigate('/login');
        } else {
          setError(data.error || "Failed to create store");
        }
      }
    } catch (err) {
      setError(err.message || "An error occurred while creating the store");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-white rounded-xl shadow-lg overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-6 text-white">
          <h1 className="text-2xl font-bold">Create New Store</h1>
          <p className="text-blue-100">Fill in the details below to register a new store</p>
        </div>

        {/* Form Container */}
        <div className="p-6 md:p-8">
          {/* Status Messages */}
          {success && (
            <div className="mb-6 p-4 bg-green-50 text-green-700 rounded-lg border border-green-200 flex items-center">
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              {success}
            </div>
          )}
          {error && (
            <div className="mb-6 p-4 bg-red-50 text-red-700 rounded-lg border border-red-200 flex items-center">
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Store Name */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Store Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={storeData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition duration-200"
                  placeholder="e.g. Main Branch"
                  required
                />
              </div>

              {/* Total Gold */}
              <div>
                <label htmlFor="totalGold" className="block text-sm font-medium text-gray-700 mb-1">
                  Total Gold (grams) <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type="number"
                    id="totalGold"
                    name="totalGold"
                    value={storeData.totalGold}
                    onChange={handleChange}
                    className="w-full pl-4 pr-12 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition duration-200"
                    placeholder="0.00"
                    step="0.01"
                    min="0"
                    required
                  />
                  <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500">g</span>
                </div>
              </div>

              {/* Total Amount */}
              <div>
                <label htmlFor="totalAmount" className="block text-sm font-medium text-gray-700 mb-1">
                  Total Amount (₹) <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type="number"
                    id="totalAmount"
                    name="totalAmount"
                    value={storeData.totalAmount}
                    onChange={handleChange}
                    className="w-full pl-4 pr-12 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition duration-200"
                    placeholder="0.00"
                    step="0.01"
                    min="0"
                    required
                  />
                  <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500">₹</span>
                </div>
              </div>

              {/* Gold Taken */}
              <div>
                <label htmlFor="goldTaken" className="block text-sm font-medium text-gray-700 mb-1">
                  Gold Taken (grams) <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type="number"
                    id="goldTaken"
                    name="goldTaken"
                    value={storeData.goldTaken}
                    onChange={handleChange}
                    className="w-full pl-4 pr-12 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition duration-200"
                    placeholder="0.00"
                    step="0.01"
                    min="0"
                    required
                  />
                  <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500">g</span>
                </div>
              </div>

              {/* Amount Taken */}
              <div>
                <label htmlFor="amountTaken" className="block text-sm font-medium text-gray-700 mb-1">
                  Amount Taken (₹) <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type="number"
                    id="amountTaken"
                    name="amountTaken"
                    value={storeData.amountTaken}
                    onChange={handleChange}
                    className="w-full pl-4 pr-12 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition duration-200"
                    placeholder="0.00"
                    step="0.01"
                    min="0"
                    required
                  />
                  <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500">₹</span>
                </div>
              </div>

              {/* Gold Given */}
              <div>
                <label htmlFor="goldGiven" className="block text-sm font-medium text-gray-700 mb-1">
                  Gold Given (grams) <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type="number"
                    id="goldGiven"
                    name="goldGiven"
                    value={storeData.goldGiven}
                    onChange={handleChange}
                    className="w-full pl-4 pr-12 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition duration-200"
                    placeholder="0.00"
                    step="0.01"
                    min="0"
                    required
                  />
                  <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500">g</span>
                </div>
              </div>

              {/* Amount Given */}
              <div>
                <label htmlFor="amountGiven" className="block text-sm font-medium text-gray-700 mb-1">
                  Amount Given (₹) <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type="number"
                    id="amountGiven"
                    name="amountGiven"
                    value={storeData.amountGiven}
                    onChange={handleChange}
                    className="w-full pl-4 pr-12 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition duration-200"
                    placeholder="0.00"
                    step="0.01"
                    min="0"
                    required
                  />
                  <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500">₹</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row justify-end gap-3 pt-4">
              <button
                type="button"
                onClick={() => navigate('/dashboard')}
                disabled={loading}
                className="px-6 py-2.5 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-200 disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-2.5 bg-blue-600 rounded-lg font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-200 disabled:opacity-50 flex items-center justify-center"
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
                  'Create Store'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateStore;
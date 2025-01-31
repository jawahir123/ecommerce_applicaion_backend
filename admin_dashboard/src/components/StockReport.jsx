
import React, { useEffect, useState } from "react";
import axios from "axios";
import { AlertCircle, Package, ShoppingCart } from 'lucide-react';

const StockReport = () => {
  const [reportData, setReportData] = useState(null);

  useEffect(() => {
    // Fetch report data from the backend
    axios.get("http://localhost:3000/api/reports/stock")
      .then(response => setReportData(response.data))
      .catch(error => console.error("Error fetching report:", error));
  }, []);

  if (!reportData) return (
    <div className="flex items-center justify-center h-screen">
      <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
    </div>
  );

  return (
    <div className="bg-gray-100 min-h-screen p-8">
      <h2 className="text-3xl font-bold mb-8 text-gray-800">Dashboard Report</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Total Products</p>
              <p className="text-2xl font-semibold text-gray-800">{reportData.totalProducts}</p>
            </div>
            <Package className="h-10 w-10 text-blue-500" />
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Total Orders</p>
              <p className="text-2xl font-semibold text-gray-800">{reportData.totalOrders}</p>
            </div>
            <ShoppingCart className="h-10 w-10 text-green-500" />
          </div>
        </div>
      </div>
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-xl font-semibold mb-4 text-gray-800 flex items-center">
          <AlertCircle className="h-5 w-5 text-red-500 mr-2" />
          Low Stock Products
        </h3>
        <ul className="divide-y divide-gray-200">
          {reportData.lowStockProducts.map((product, index) => (
            <li key={index} className="py-3 flex justify-between items-center">
              <span className="text-gray-800">{product.name}</span>
              <span className="px-2 py-1 text-xs font-semibold rounded-full bg-red-100 text-red-800">
                Stock: {product.stock}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default StockReport;



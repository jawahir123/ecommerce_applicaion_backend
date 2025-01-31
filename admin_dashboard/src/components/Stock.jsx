import React, { useEffect, useState } from "react";
import axios from "axios";

function Stock() {
  const [stockData, setStockData] = useState([]);

  useEffect(() => {
    const fetchStockData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/stock-details");
        setStockData(response.data.data);
      } catch (error) {
        console.error("Error fetching stock data:", error.message);
      }
    };

    fetchStockData();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Stock Details</h2>
      <table className="table-auto w-full border-collapse border border-gray-300">
        <thead>
          <tr>
            <th className="border border-gray-300 p-2">Product Name</th>
            <th className="border border-gray-300 p-2">Stock</th>
          </tr>
        </thead>
        <tbody>
          {stockData.map((product) => (
            <tr key={product._id}>
              <td className="border border-gray-300 p-2">{product.name}</td>
              <td className="border border-gray-300 p-2">{product.stock}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Stock;

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';
import axios from 'axios';
import NewProduct from '../components/newProduct';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    loadProducts();
  }, []);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      filterProducts(searchTerm);
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [searchTerm, products]);

  const loadProducts = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:3000/api/products/getAll');
      console.log("API Response:", response.data);

      const fetchedProducts = response.data.products || [];
      setProducts(fetchedProducts);
      setFilteredProducts(fetchedProducts);
    } catch (error) {
      console.error("Error fetching products:", error);
      setError(error.response?.data?.message || "Server Error");
    } finally {
      setLoading(false);
    }
  };

  const filterProducts = (term) => {
    if (!term) {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter((product) =>
        product.name.toLowerCase().includes(term.toLowerCase()) ||
        (product.category && product.category.name.toLowerCase().includes(term.toLowerCase()))
      );
      setFilteredProducts(filtered);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await axios.delete(`http://localhost:3000/api/products/${id}`);
        loadProducts();
      } catch (error) {
        console.error("Error deleting product:", error);
        setError("Failed to delete product.");
      }
    }
  };

  const handleEdit = (id) => {
    if (!id) {
      console.error("Product ID is undefined");
      return;
    }
    navigate(`/products/${id}`);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <div className="p-4">
        <div className="bg-white p-4 rounded-md shadow-md">
          <h2 className="mb-4 text-xl font-bold text-gray-800">Product List</h2>
          <div className="mb-4 flex items-center">
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-md text-sm transition duration-300"
            >
              Add Product
            </button>
            <div className="flex items-center ml-4">
              <FaSearch className="text-gray-500 mr-2" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by name or category"
                className="border border-gray-300 rounded-md py-2 px-4 w-64"
              />
            </div>
          </div>

          {loading && <div className="text-center text-gray-500">Loading products...</div>}
          {error && !loading && <div className="text-red-500 mt-4">{error}</div>}

          <div className="overflow-x-auto max-h-[calc(100vh-100px)] overflow-y-auto">
            <table className="min-w-full bg-white border border-gray-200 rounded-md">
              <thead className="bg-gradient-to-tr from-indigo-600 to-purple-600 text-white font-bold">
                <tr>
                  <th>Name</th><th>Price</th><th>Category</th><th>Image</th><th>Stock</th><th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.length > 0 ? filteredProducts.map((product) => (
                  <tr key={product._id}>
                    <td>{product.name}</td>
                    <td>${product.price}</td>
                    <td>{product.category ? product.category.name : 'Uncategorized'}</td>
                    <td>
                      <img src={product.image || 'http://localhost:3000/uploads/default.jpg'} alt={product.name} className="w-16 h-16 object-cover rounded-md" />
                    </td>
                    <td>{product.stock}</td>
                    <td>
                      <button onClick={() => handleEdit(product._id)} className="bg-blue-500 text-white px-2 py-1 rounded-md">Edit</button>
                      <button onClick={() => handleDelete(product._id)} className="bg-red-500 text-white px-2 py-1 rounded-md">Delete</button>
                    </td>
                  </tr>
                )) : (
                  <tr><td colSpan="6" className="text-center py-4 text-gray-500">No products found</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl relative">
            <button onClick={() => setIsModalOpen(false)} className="absolute top-4 right-4 text-gray-500 hover:text-gray-700">&times;</button>
            <NewProduct onClose={() => setIsModalOpen(false)} />
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductList;

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

function NewProduct({ onClose }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    description: "",
    category: "",
    image: null,
    stock: "",
  });

  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [validationErrors, setValidationErrors] = useState({});

  useEffect(() => {
    fetchCategories();
    if (id) {
      fetchProductDetails();
    } else {
      setFormData({
        name: "",
        price: "",
        description: "",
        category: "",
        image: null,
        stock: "",
      });
      setImagePreview(null);
    }
  }, [id]);

  const fetchCategories = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/categories/getAll");
      if (response.data?.categories) {
        setCategories(response.data.categories);
      } else {
        throw new Error("Invalid response format");
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
      setError("Failed to load categories.");
    }
  };

  const fetchProductDetails = async () => {
    if (!id) return;

    try {
      const response = await axios.get(`http://localhost:3000/api/products/getById/${id}`);
      console.log("API Response:", response.data);
      const product = response.data.product;

      setFormData({
        name: product.name,
        price: product.price,
        description: product.description,
        category: product.category?._id || "",
        image: product.image,
        stock: product.stock,
      });

      if (product.image) {
        setImagePreview(product.image);
      }
    } catch (error) {
      console.error("Error fetching product details:", error);
      setError("Failed to load product details.");
    }
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "image" && files && files[0]) {
      const file = files[0];
      setFormData({
        ...formData,
        image: file,
      });
      setImagePreview(URL.createObjectURL(file));
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }

    // Clear validation errors when the user starts typing
    setValidationErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  };

  const validateForm = () => {
    const errors = {};

    // Validate product name
    if (!formData.name.trim()) {
      errors.name = "Product name is required.";
    } else if (!/^[A-Za-z][A-Za-z0-9\s]*$/.test(formData.name)) {
      errors.name = "Product name must start with a letter and can include numbers at the end.";
    }

    // Validate price
    if (!formData.price) {
      errors.price = "Price is required.";
    } else if (isNaN(formData.price) || parseFloat(formData.price) <= 0) {
      errors.price = "Price must be a valid positive number.";
    }

    // Validate stock
    if (!formData.stock) {
      errors.stock = "Stock is required.";
    } else if (isNaN(formData.stock) || parseInt(formData.stock) < 0) {
      errors.stock = "Stock must be a valid non-negative number.";
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0; // Return true if no errors
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (!validateForm()) {
      return; // Stop submission if validation fails
    }

    try {
      const form = new FormData();

      for (const key in formData) {
        if (key !== "image" && formData[key] !== null && formData[key] !== undefined) {
          form.append(key, formData[key]);
        }
      }

      if (formData.image instanceof File) {
        form.append("image", formData.image);
      } else if (formData.image && typeof formData.image === "string") {
        form.append("image", formData.image);
      } else {
        form.append("image", "");
      }

      const url = id
        ? `http://localhost:3000/api/products/${id}`
        : "http://localhost:3000/api/products/";

      const method = id ? "put" : "post";

      const response = await axios[method](url, form, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (response.status === 200 || response.status === 201) {
        setSuccess(id ? "Product updated successfully!" : "Product created successfully!");
        setFormData({
          name: "",
          price: "",
          description: "",
          category: "",
          image: null,
          stock: "",
        });
        setImagePreview(null);

        if (onClose) {
          onClose(response.data.updatedProduct);
        } else {
          navigate("/products");
        }
      } else {
        setError("Failed to save product.");
      }
    } catch (error) {
      console.error("Error:", error);
      if (error.response?.data?.message) {
        setError(error.response.data.message);
      } else {
        setError("An error occurred while saving the product.");
      }
    }
  };

  return (
    <div className="max-w-xl mx-auto bg-white p-6 rounded-lg shadow-lg relative">
      {onClose && (
        <button
          onClick={() => onClose()}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          &times;
        </button>
      )}

      <h2 className="text-2xl font-bold mb-4">
        {id ? "Edit Product" : "Create New Product"}
      </h2>
      {error && <div className="text-red-500 mb-4">{error}</div>}
      {success && <div className="text-green-500 mb-4">{success}</div>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700">Product Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
          {validationErrors.name && (
            <div className="text-red-500 text-sm">{validationErrors.name}</div>
          )}
        </div>

        <div>
          <label className="block text-gray-700">Price</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
          {validationErrors.price && (
            <div className="text-red-500 text-sm">{validationErrors.price}</div>
          )}
        </div>

        <div>
          <label className="block text-gray-700">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>

        <div>
          <label className="block text-gray-700">Category</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          >
            <option value="">Select a category</option>
            {categories.map((category) => (
              <option key={category._id} value={category._id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-gray-700">Image</label>
          {imagePreview && (
            <img
              src={imagePreview}
              alt="Product Preview"
              className="w-32 h-32 object-cover mb-2 rounded"
            />
          )}
          <input
            type="file"
            name="image"
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>

        <div>
          <label className="block text-gray-700">Stock</label>
          <input
            type="number"
            name="stock"
            value={formData.stock}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            min="0"
            required
          />
          {validationErrors.stock && (
            <div className="text-red-500 text-sm">{validationErrors.stock}</div>
          )}
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          {id ? "Update Product" : "Create Product"}
        </button>
      </form>
    </div>
  );
}

export default NewProduct;
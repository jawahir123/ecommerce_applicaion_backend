import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Sidebar from "./dashboard/SideBar"; 
import NewProduct from "./components/newProduct"; 
import ProductList from "./components/productList"; 
import NotFoundPage from "./components/notFoundPage"; 
import Overview from "./dashboard/Overview";
import Header from "./dashboard/Header.jsx";
import Login from "./components/Login"; // Login Component
import SignUp from "./components/SignUp";
import Stock from "./components/Stock";
import StockReport from "./components/StockReport";

function App() {
  const [loggedInUser, setLoggedInUser] = useState(null);

  // Authentication state
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Mock login function
  // const handleLogin = () => setIsAuthenticated(true);
   // Handle login to store user info
   const handleLogin = (user) => {
    setLoggedInUser(user); // Save user info
    setIsAuthenticated(true); // Set authentication state
  };

  // Protected Route component
  const ProtectedRoute = ({ element }) => {
    return isAuthenticated ? element : <Navigate to="/login" />;
  };

  return (
    <Router>
      <div className="flex">
        {/* Show Sidebar only if authenticated */}
        {isAuthenticated && <Sidebar />}

        <div className={isAuthenticated ? "ml-64 flex-grow" : "flex-grow"}>
          {isAuthenticated && <Header user={loggedInUser}/>}

          <div className="p-4">
            <Routes>
              {/* Login Route */}
              <Route path="/login" element={<Login onLogin={handleLogin} />} />
              <Route path="/signup" element={<SignUp />} />
              {/* Protected Routes */}
              <Route
                path="/"
                element={<ProtectedRoute element={<Overview />} />}
              />
              <Route
                path="/stock"
                element={<ProtectedRoute element={<Stock />}/>}
              />
              <Route
                path="/report"
                element={<ProtectedRoute element={<StockReport/>}/>}
              />
              <Route
                path="/products/new"
                element={<ProtectedRoute element={<NewProduct />} />}
              />
              <Route
                path="/products/:id"
                element={<ProtectedRoute element={<NewProduct />} />}
              />
              <Route
                path="/products"
                element={<ProtectedRoute element={<ProductList />}/>}
              />
              {/* Catch-all route */}
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;


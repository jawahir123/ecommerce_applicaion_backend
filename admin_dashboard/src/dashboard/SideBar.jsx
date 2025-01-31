import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const SideBar = () => {
  const [isProductsOpen, setIsProductsOpen] = useState(false)

  const toggleProductsDropdown = () => {
    setIsProductsOpen(!isProductsOpen)
  }

  return (
    <div className="fixed left-0 top-0 h-screen w-64 bg-blue-500 p-4 text-white">
      {/* Logo */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold">Dashboard</h1>
      </div>

      {/* Navigation */}
      <nav className="space-y-4">
        <Link to="/" className="flex items-center space-x-2 rounded-lg bg-blue-600 p-2">
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
          <span>Dashboard</span>
        </Link>
         {/* Products Dropdown */}
        <div>
          <button
            onClick={toggleProductsDropdown}
            className="flex w-full items-center justify-between rounded-lg p-2 hover:bg-blue-600"
          >
            <div className="flex items-center space-x-2">
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
              <span>Products</span>
            </div>
            <svg
              className={`h-4 w-4 transform ${isProductsOpen ? 'rotate-180' : ''}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          {isProductsOpen && (
            <div className="ml-4 mt-2 space-y-2">
              <Link to="/products/new" className="block rounded-lg p-2 hover:bg-blue-600">
                Add Product
              </Link>
              <Link to="/products" className="block rounded-lg p-2 hover:bg-blue-600">
                List Products
              </Link>
            </div>
          )}
        </div>
        <Link to="/stock" className="flex items-center space-x-2 p-2 hover:bg-blue-600">
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
          </svg>
          <span>Stock</span>
        </Link>
        <Link to="report" className="flex items-center space-x-2 p-2 hover:bg-blue-600">
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
          </svg>
          <span>Report</span>
        </Link>
      </nav>

      {/* Social Links */}
      <div className="absolute bottom-4 flex space-x-4">
        <a href="#" className="hover:text-blue-200">
          <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
          </svg>
        </a>
        <a href="#" className="hover:text-blue-200">
          <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221c.144 3.259-2.285 6.892-6.585 6.892-1.305 0-2.517-.376-3.539-1.021.181.021.364.031.549.031 1.077 0 2.068-.367 2.857-.984a2.24 2.24 0 01-2.093-1.556 2.184 2.184 0 001.012-.038c-1.151-.232-2.019-1.244-2.019-2.466v-.032c.339.189.728.303 1.14.316a2.234 2.234 0 01-.694-2.987c1.239 1.524 3.094 2.524 5.188 2.631a2.233 2.233 0 013.812-2.037c.587-.116 1.14-.331 1.637-.623a2.246 2.246 0 01-.985 1.237c.519-.062 1.013-.191 1.472-.386a4.57 4.57 0 01-1.12 1.158z"/>
          </svg>
        </a>
        <a href="#" className="hover:text-blue-200">
          <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
          </svg>
        </a>
      </div>
    </div>
  )
}

export default SideBar


# 📦 E-Commerce Backend & Admin Dashboard

## 📌 Project Overview

This repository contains the **backend API** and **admin dashboard** for managing the e-commerce system. The backend is built using **Node.js, Express, and MongoDB**, while the **admin dashboard** allows managing products, users, and orders.

---

## 🚀 Features

### 🖥️ Admin Dashboard

✅ **Product Management** – Add, edit, delete, and update products\
✅ **Order Management** – View and update order status\
✅ ** Reports** – total product, view stock \
✅ **Authentication** – Admin login with JWT authentication

### 💼 Backend API

✅ **User Authentication** – Register, login, token-based authentication\
✅ **Product API** – CRUD operations for products\
✅ **Cart API** – Manage shopping cart\
✅ **Order API** – Handle orders 
✅ **Admin API** – Manage users, products, and orders

---

## 🏗️ Tech Stack

- **Backend**: Node.js, Express.js, MongoDB, Mongoose
- **Admin Panel**: React.js, Material UI
- **Authentication**: JWT (JSON Web Tokens)
- **Database**: MongoDB (Mongoose ODM)
- **Middleware**: Express Validator, Bcrypt.js, CORS

---

## 👤 Project Structure

```
📦 backend-admin-dashboard
 └📂 backend
   ├📂 controllers     # Business logic (products, users, orders)
   ├📂 models         # MongoDB models
   ├📂 routes         # API endpoints (products, orders, users)
   ├📂 middleware     # JWT authentication, validation
   ├📂 config         # Database connection, environment variables
   ├ server.js         # Main server file
   ├ .env              # db connection string 
   └ package.json     # Dependencies
 └📂 admin-dashboard
   ├📂 src
   ├📂 components   # Reusable UI components
   ├📂 dashboard        # header,sidebar
   ├ public           # Static assets
   └ package.json     # Dependencies
```

---

## 🛠️ Installation & Setup

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/jawahir123/ecommerce_applicaion_backend.git
cd ecommerce
```

### 2️⃣ Setup Backend

```bash
cd backend
npm install
```

- **Create a **``** file** and add:

```env
MONGO_URI=mongodb://localhost:27017/ecommerce
JWT_SECRET=your_secret_key
```

- **Run Backend**

```bash
npm start
```

---

### 3️⃣ Setup Admin Dashboard

```bash
cd admin-dashboard
npm install
npm run dev
```

---

## 📞 API Endpoints

### 🔒 Authentication

| Method | Endpoint             | Description   |
| ------ | -------------------- | ------------- |
| `POST` | `/api/users/login`    | Admin login,user login   |
| `POST` | `/api/users/register` | Register user |

### 🛒 Product API

| Method   | Endpoint            | Description      |
| -------- | ------------------- | ---------------- |
| `GET`    | `/api/products`     | Get all products |
| `POST`   | `/api/products`     | Add new product  |
| `PUT`    | `/api/products/:id` | Update product   |
| `DELETE` | `/api/products/:id` | Delete product   |

### 🎂 Order API

| Method | Endpoint          | Description         |
| ------ | ----------------- | ------------------- |
| `GET`  | `/api/order`     | Get all orders      |
| `PUT`  | `/api/orders/:id` | Update order status |

---

## 💡 Admin Dashboard Features

### 👨‍💼 Admin Panel

- **Dashboard Overview:** View total products, and orders.
- **Products Management:** Add, edit, and delete products.view all product
- **stock Management:** view all stocks .

---

## 🚀 Deployment

**Deploy Backend (Node.js)**

```bash
# Install PM2 for process management
npm install -g pm2
pm start
pm2 start server.js
```

**Deploy Admin Panel (React)**

```bash
npm run build
```

Upload the `build/` folder to **Netlify, Vercel, or AWS S3**.

---

## 🐝 License

This project is for educational and development purposes. Modify and use freely.
## 📱 Mobile Application

The **mobile version** of this project is available in a separate repository. You can find it here:

👉 **[E-Commerce Mobile App Repository](https://github.com/jawahir123/ecommerce_platform)**

This Flutter-based mobile app allows customers to browse products, add to cart, and place orders.




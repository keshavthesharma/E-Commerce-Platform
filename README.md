# Full-Stack MERN E-Commerce Application

A fully responsive, production-ready full-stack e-commerce web application built with the **MERN** stack (MongoDB, Express.js, React, Node.js). Features user authentication, dynamic product filtering, a context-managed shopping cart, secure checkout routines, and deployment on Vercel.

---

## 🚀 Live Demo
* **Frontend Client:** [View Live App](https://keshav-e-commerce.vercel.app)
* **Backend API:** [API Server Status](https://server-six-coral-37.vercel.app)

---

## ✨ Features

* **User Authentication & Authorization:** Secure registration, login, and JWT-based session handling.
* **Dynamic Product Catalog:** Browse latest products retrieved in real-time from MongoDB Atlas with search and category filtering.
* **Interactive Product Details:** Dedicated views for individual product specifications.
* **State-Managed Shopping Cart:** Seamless cart management powered by React Context API and HTML5 LocalStorage persistence.
* **Checkout & Order Management:** Protected checkout workflow allowing users to input delivery details and place orders successfully.
* **Responsive Modern UI:** Clean interface styled with custom CSS and structured component layouts.

---

## 🛠️ Tech Stack

### **Frontend:**
* React.js (`react-router-dom`, `axios`)
* Context API (Global Cart State Management)
* HTML5 / CSS3

### **Backend:**
* Node.js & Express.js REST API
* Mongoose ODM
* JSON Web Tokens (JWT) for Authentication

### **Database & Deployment:**
* MongoDB Atlas (Cloud Database)
* Vercel (Serverless Backend & Frontend Hosting)

---

## 📁 Project Structure

```text
my-ecommerce/
│
├── client/                 # React Frontend
│   ├── public/             # Static assets
│   ├── src/
│   │   ├── components/     # Reusable components (Navbar, ProductCard, etc.)
│   │   ├── context/        # Context providers (CartContext)
│   │   ├── pages/          # Page views (Home, Cart, Login, Register, Checkout, ProductDetails, Profile)
│   │   ├── App.js          # Root component with routing and API defaults
│   │   └── index.js        # Application entry point
│   └── vercel.json         # Frontend SPA routing rewrites
│
└── server/                 # Node.js / Express Backend
    ├── models/             # Mongoose schemas (User, Product, Order)
    ├── routes/             # API routes
    ├── server.js           # Server entry point
    └── vercel.json         # Backend serverless configuration

# 🛍️ E-Commerce Shop Women Things

A modern, minimalistic e-commerce web application built with React. Browse products across multiple categories, manage your shopping cart, and save your favorite items.

## ✨ Features

- 🏠 **Home Page** with hot deals and featured categories
- 🔍 **Real-time Search** with product suggestions
- 📂 **Category Pages** (Beauty, Fragrances, Dresses, Bags)
- 🛒 **Shopping Cart** with quantity management
- ❤️ **Favorites/Wishlist** functionality
- 💰 **Discount Display** with original and sale prices
- 🎨 **Minimalistic UI** with clean, modern styling

## 🚀 Live Demo

[View Live Demo](#) _(https://thriving-mermaid-aaea0e.netlify.app/)_

## 🛠️ Built With

- **React** - UI library
- **React Router** - Navigation and routing
- **Context API** - State management (Cart & Favorites)
- **DummyJSON API** - Product data

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v14 or higher)
- **npm** or **yarn**

## 🔧 Installation

### 1. Clone the repository

```bash
git clone https://github.com/HannaInIT/react-project.git
cd react-project
```

### 2. Install dependencies

```bash
npm install
# or
yarn install
```

### 3. Start the development server

```bash
npm run dev
# or
yarn dev
```

The app will open at `http://localhost:5173` (or another port if 5173 is busy).

## 📁 Project Structure

```
react-project/
├── public/
├── src/
│   ├── assets/           # Images and icons
│   ├── components/       # Reusable components
│   │   ├── Header.jsx
│   │   ├── Footer.jsx
│   │   ├── ProductCard.jsx
│   │   └── PromoSlider.jsx
│   ├── context/          # Context providers
│   │   ├── CartContext.jsx
│   │   └── FavoritesContext.jsx
│   ├── pages/            # Page components
│   │   ├── Home.jsx
│   │   ├── Category.jsx
│   │   ├── ProductDetail.jsx
│   │   ├── Cart.jsx
│   │   └── Favorites.jsx
│   ├── utils/            # Utility functions
│   │   ├── priceDiscount.js
│   │   └── debounce.js
│   ├── App.jsx           # Main app component
│   ├── App.css           # Global styles
│   └── main.jsx          # Entry point
├── package.json
└── README.md
```

## 🎯 Key Features Explained

### Shopping Cart

- Add/remove products
- Adjust quantities
- Persistent storage (localStorage)
- Real-time total calculation

### Favorites

- Save products for later
- Toggle favorites from any page
- Persistent storage (localStorage)

### Search

- Real-time product search
- Debounced API calls
- Dropdown suggestions

### Product Display

- Grid layout for browsing
- Discount badges
- Price calculations
- Hover effects

## 🌐 API

This project uses the [DummyJSON API](https://dummyjson.com/) for product data.

**Endpoints used:**

- `GET /products/search?q={query}` - Search products
- `GET /products/category/{category}` - Get products by category
- `GET /products/{id}` - Get single product

## 🙏 Acknowledgments

- [DummyJSON](https://dummyjson.com/) for the API
- [React](https://react.dev/) for the framework
- [Vite](https://vitejs.dev/) for the build tool

⭐ **If you like this project, please give it a star!** ⭐

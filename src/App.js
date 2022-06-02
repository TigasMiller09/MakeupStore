import logo from './logo.svg';
import './App.css';
// import HeaderComponent from './components/HeaderComponent';
import ProductsScreen from './screens/ProductsScreen/ProductsScreen';
import SingleProductScreen from './screens/SingleProductScreen/SingleProductScreen';
import React from 'react'
import { Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <Routes>
      <Route path="/products" element={<ProductsScreen/>}/>
      <Route path="/product" element={<SingleProductScreen/>}/>
      <Route path="/" element={<ProductsScreen/>}/>
    </Routes>
  );
}

export default App;

import { useState } from 'react'
import './App.css'
import Header from './components/Header'
import ProductList from './components/ProductList'

function App() {
  return (
    <>
      <Header />
      <h2 className="text-4xl font-bold text-blue-600">Welcome to StockTrack</h2>
      <p>Manage your stock easily in one place</p>
      <ProductList />
    </>
  )
}

export default App;

import React, { useEffect, useState } from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import ProductDetail from './ProductDetail'

const PRODUCTS = [
  { id:1, name: "Red Geometric Ikat Saree", price:2499, image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=600" },
  { id:2, name: "Blue Indigo Double Ikat Saree", price:3999, image: "https://images.unsplash.com/photo-1676995304395-4302878b7258?w=600" },
  { id:3, name: "Green Floral Ikat Saree", price:2899, image: "https://images.unsplash.com/photo-1756483492198-8ca91227489b?w=600" },
  { id:4, name: "Golden Yellow Ikat Saree", price:3299, image: "https://images.unsplash.com/photo-1771929837105-122c2aab8a04?w=600" },
  { id:5, name: "Purple Abstract Ikat Saree", price:2799, image: "https://images.unsplash.com/photo-1743015346855-a2014c6e8930?w=600" },
  { id:6, name: "Orange Tie-Dye Ikat Saree", price:2199, image: "https://images.unsplash.com/photo-1622182473147-579eab905ef9?w=600" },
  { id:7, name: "Black & Grey Ikat Silk Saree", price:4499, image: "https://images.unsplash.com/photo-1572470176170-98fa8abcb741?w=600" },
  { id:8, name: "Multicolor Warp Ikat Saree", price:3499, image: "https://images.unsplash.com/photo-1610189026205-27510cfc52f8?w=600" },
  { id:9, name: "Maroon Traditional Ikat Saree", price:2599, image: "https://images.unsplash.com/photo-1761125135351-268e72e39158?w=600" },
  { id:10, name: "Pink Weft Ikat Saree", price:1899, image: "https://images.unsplash.com/photo-1750008560217-53fd7066acec?w=600" }
]

export default function Home() {
  const [products, setProducts] = useState([])

  useEffect(() => {
    // Try fetching from backend first, fall back to embedded PRODUCTS
    fetch('/api/products')
      .then(r => { if (!r.ok) throw new Error('no-api'); return r.json() })
      .then(json => setProducts(json))
      .catch(() => setProducts(PRODUCTS))
  }, [])

  return (
    <div className="container">
      <header style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
        <h1>Pochampally Hub</h1>
        <nav><Link to="/">Home</Link></nav>
      </header>

      <div className="grid">
        {products.map(p => (
          <Link to={`/product/${p.id}`} key={p.id} className="card">
            <div className="card-image">
              <img src={p.image} alt={p.name} />
            </div>
            <div className="card-body">
              <div className="card-title">{p.name}</div>
              <div className="card-price">₹{p.price}</div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/product/:id" element={<ProductDetail />} />
    </Routes>
  )
}


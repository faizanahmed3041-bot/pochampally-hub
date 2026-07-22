import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const PRODUCTS = [
  { id:1, name: "Red Geometric Ikat Saree", price:2499, image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=600" },
  { id:2, name: "Blue Indigo Double Ikat Saree", price:3999, image: "https://images.unsplash.com/photo-1676995304395-4302878b7258?w=600" },
  { id:3, name: "Green Floral Ikat Saree", price:2899, image: "https://images.unsplash.com/photo-1756483492198-8ca91227489b?w=600" }
]

export default function Home(){
  const [products,setProducts] = useState([])

  useEffect(()=>{
    fetch('/api/products').then(r=>{ if(!r.ok) throw new Error('no-api'); return r.json() }).then(j=>setProducts(j)).catch(()=>setProducts(PRODUCTS))
  },[])

  return (
    <div className="container">
      <section className="hero">
        <div>
          <h1>Beautiful Handcrafted Pochampally Ikat</h1>
          <p>Authentic weaves, vibrant colours, and timeless designs — shop curated sarees and fabrics.</p>
          <div style={{marginTop:16}}>
            <Link to="/" className="btn">Shop Now</Link>
            <Link to="/orders" className="btn ghost" style={{marginLeft:8}}>My Orders</Link>
          </div>
        </div>
        <div className="hero-image" aria-hidden>
          <img src="https://images.unsplash.com/photo-1610189026205-27510cfc52f8?w=900" alt="Pochampally fabrics" />
        </div>
      </section>

      <h2 style={{marginTop:24}}>Featured</h2>
      <div className="grid" style={{marginTop:10}}>
        {products.slice(0,6).map(p=> (
          <Link to={`/product/${p.id}`} key={p.id} className="card">
            <div className="card-image"><img src={p.image} alt={p.name} /></div>
            <div className="card-body"><div className="card-title">{p.name}</div><div className="card-price">₹{p.price}</div></div>
          </Link>
        ))}
      </div>
    </div>
  )
}

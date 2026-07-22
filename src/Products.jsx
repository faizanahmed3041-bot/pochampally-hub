import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

export default function Products(){
  const [products,setProducts] = useState([])

  useEffect(()=>{
    const fallback = [
      { id:1, name: 'Red Geometric Ikat Saree', price:2499, image:'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=600' },
      { id:2, name: 'Blue Indigo Double Ikat Saree', price:3999, image:'https://images.unsplash.com/photo-1676995304395-4302878b7258?w=600' },
      { id:3, name: 'Green Floral Ikat Saree', price:2899, image:'https://images.unsplash.com/photo-1756483492198-8ca91227489b?w=600' },
      { id:4, name: 'Golden Yellow Ikat Saree', price:3299, image:'https://images.unsplash.com/photo-1771929837105-122c2aab8a04?w=600' }
    ];

    fetch('/api/products').then(r=>{ if(!r.ok) throw new Error('no-api'); return r.json() }).then(j=>{
      if (!j || !Array.isArray(j) || j.length === 0) {
        setProducts(fallback);
      } else {
        setProducts(j);
      }
    }).catch(()=>{
      setProducts(fallback);
    })
  },[])

  return (
    <div className="container">
      <header style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
        <h2>All Products</h2>
      </header>

      <div className="grid" style={{marginTop:12}}>
        {products.map(p=> (
          <Link to={`/product/${p.id}`} key={p.id} className="card">
            <div className="card-image"><img loading="lazy" src={p.image} alt={p.name} /></div>
            <div className="card-body"><div className="card-title">{p.name}</div><div className="card-price">₹{p.price}</div></div>
          </Link>
        ))}
      </div>
    </div>
  )
}

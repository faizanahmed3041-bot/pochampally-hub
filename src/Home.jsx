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
    import('./api').then(({ getJson }) => {
      getJson('/api/products').then(j=>setProducts(j)).catch(()=>setProducts(PRODUCTS))
    }).catch(()=>setProducts(PRODUCTS))
  },[])

  return (
    <div className="container">
      <section className="hero">
        <div>
          <h1>Beautiful Handcrafted Pochampally Ikat</h1>
          <p>Authentic weaves, vibrant colours, and timeless designs — shop curated sarees and fabrics.</p>
          <div style={{marginTop:16}}>
            <Link to="/products" className="btn">Shop Now</Link>
            <Link to="/orders" className="btn ghost" style={{marginLeft:8}}>My Orders</Link>
          </div>
        </div>
        <div className="hero-image" aria-hidden>
          <img loading="lazy" src="https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=1200&q=80&auto=format&fit=crop" alt="Pochampally saree showcase" />
        </div>
      </section>

      <h2 style={{marginTop:24}}>Featured</h2>
      <div className="grid" style={{marginTop:10}}>
        {products.slice(0,6).map(p=> (
          <Link to={`/product/${p.id}`} key={p.id} className="card">
            <div className="card-image"><img loading="lazy" src={p.image} alt={p.name} /></div>
            <div className="card-body"><div className="card-title">{p.name}</div><div className="card-price">₹{p.price}</div></div>
          </Link>
        ))}
      </div>

      <section className="about" style={{marginTop:28}}>
        <h2>About Pochampally Ikat</h2>
        <div style={{display:'flex',gap:16,marginTop:12,alignItems:'center'}}>
          <div style={{flex:1}}>
            <p>Pochampally Ikat is a traditional handloom dyeing technique from Telangana, India. Known for its geometric patterns and vibrant colours, Ikat involves resist-dyeing the yarns prior to weaving, creating designs with a characteristic blurred edge. Each piece is handcrafted by skilled weavers and often takes several days to complete.</p>
            <p style={{marginTop:8}}>Our collection celebrates authentic craftsmanship — from pure cotton everyday sarees to luxurious silk weaves for special occasions.</p>
          </div>
          <div style={{flex:'0 0 320px'}}>
            <img loading="lazy" src="https://images.unsplash.com/photo-1771929837105-122c2aab8a04?w=900&q=80&auto=format&fit=crop" alt="weaving saree" style={{width:'100%',borderRadius:8}} />
          </div>
        </div>
      </section>
    </div>
  )
}

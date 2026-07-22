import React, { useEffect, useState } from 'react'

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

export default function App() {
  const [products, setProducts] = useState([])

  useEffect(() => {
    // Try fetching from backend first, fall back to embedded PRODUCTS
    fetch('/api/products')
      .then(r => { if (!r.ok) throw new Error('no-api'); return r.json() })
      .then(json => setProducts(json))
      .catch(() => setProducts(PRODUCTS))
  }, [])

  return (
    <div style={{fontFamily: 'system-ui, -apple-system, Segoe UI, Roboto, sans-serif', padding: 24}}>
      <h1 style={{marginBottom:16}}>Pochampally Hub</h1>
      <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(220px, 1fr))', gap:16}}>
        {products.map(p => (
          <div key={p.id} style={{border:'1px solid #eee', borderRadius:8, overflow:'hidden', background:'#fff'}}>
            <div style={{height:200, background:'#fafafa', display:'flex', alignItems:'center', justifyContent:'center'}}>
              <img src={p.image} alt={p.name} style={{maxWidth:'100%', maxHeight:'100%', objectFit:'cover'}} />
            </div>
            <div style={{padding:12}}>
              <div style={{fontWeight:600}}>{p.name}</div>
              <div style={{color:'#6b7280', marginTop:6}}>₹{p.price}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}


import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'

export default function ProductDetail(){
  const { id } = useParams()
  const [product,setProduct] = useState(null)

  useEffect(()=>{
    fetch('/api/products').then(r=>{ if(!r.ok) throw new Error('no-api'); return r.json() }).then(list=>{
      const p = list.find(x=>String(x.id)===String(id))
      setProduct(p)
    }).catch(()=>setProduct(null))
  },[id])

  if(!product) return (
    <div className="container"><Link to="/">← Back</Link><p>Product not found or loading.</p></div>
  )

  return (
    <div className="container">
      <Link to="/">← Back</Link>
      <h2 style={{marginTop:12}}>{product.name}</h2>
      <div style={{display:'flex',gap:24,marginTop:12}}>
        <div style={{flex:'0 0 420px'}}>
          <img loading="lazy" src={product.image} alt={product.name} style={{width:'100%',borderRadius:8}} />
        </div>
        <div>
          <p style={{color:'#6b7280'}}>₹{product.price}</p>
          <p>{product.description}</p>
        </div>
      </div>
    </div>
  )
}

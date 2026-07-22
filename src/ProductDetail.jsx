import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'

export default function ProductDetail() {
  const { id } = useParams()
  const [product, setProduct] = useState(null)
  const [lightbox, setLightbox] = useState(null)

  useEffect(() => {
    fetch('/api/products')
      .then(r => { if (!r.ok) throw new Error('no-api'); return r.json() })
      .then(list => {
        const p = list.find(x => String(x.id) === String(id))
        setProduct(p)
      })
      .catch(() => {
        // fallback to fetch from main bundle if available
        // try to read window.__PRODUCTS__ if we injected it (not required)
        setProduct(null)
      })
  }, [id])

  if (!product) return (
    <div style={{padding:24}}>
      <Link to="/">← Back</Link>
      <p>Product not found or loading.</p>
    </div>
  )

  return (
    <div style={{padding:24}}>
      <Link to="/">← Back</Link>
      <div style={{display:'flex', gap:24, marginTop:12}}>
        <div style={{flex:'0 0 420px'}}>
          <img src={product.image} alt={product.name} style={{width:'100%', borderRadius:8, cursor:'zoom-in'}} onClick={() => setLightbox(product.image)} />
        </div>
        <div>
          <h2>{product.name}</h2>
          <p style={{color:'#6b7280'}}>₹{product.price} <span style={{textDecoration:'line-through', color:'#9ca3af', marginLeft:8}}>₹{product.originalPrice}</span></p>
          <p style={{marginTop:12}}>{product.description}</p>
          <p style={{marginTop:12}}><strong>Material:</strong> {product.material}</p>
          <p><strong>Occasion:</strong> {product.occasion}</p>
        </div>
      </div>

      {lightbox && (
        <div className="lightbox" onClick={() => setLightbox(null)}>
          <img src={lightbox} alt="zoom" />
        </div>
      )}
    </div>
  )
}

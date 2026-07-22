import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { PRODUCTS as FALLBACK_PRODUCTS } from './productData'

export default function ProductDetail(){
  const { id } = useParams()
  const [product,setProduct] = useState(null)

  useEffect(()=>{
    import('./api').then(({ getJson }) => {
      getJson('/api/products').then(list=>{
        const p = list.find(x=>String(x.id)===String(id))
        setProduct(p || FALLBACK_PRODUCTS.find(x=>String(x.id)===String(id)))
      }).catch(()=>{
        setProduct(FALLBACK_PRODUCTS.find(x=>String(x.id)===String(id)))
      })
    }).catch(()=>{
      setProduct(FALLBACK_PRODUCTS.find(x=>String(x.id)===String(id)))
    })
  },[id])

  if(!product) return (
    <div className="container"><Link to="/">← Back</Link><p>Product not found or loading.</p></div>
  )

  return (
    <div className="container">
      <Link to="/products">← Back to Products</Link>
      <h2 style={{marginTop:12}}>{product.name}</h2>
      <div style={{display:'grid',gridTemplateColumns:'1fr 320px',gap:24,marginTop:12}}>
        <div>
          <img loading="lazy" src={product.image} alt={product.name} style={{width:'100%',borderRadius:12,boxShadow:'0 20px 40px rgba(0,0,0,0.08)'}} />
          <div style={{padding:18,background:'#fff',border:'1px solid #ede9e1',borderRadius:12,boxShadow:'0 10px 30px rgba(15,23,42,0.04)',marginTop:16}}>
            <p style={{fontWeight:700,fontSize:'1.2rem'}}>₹{product.price}</p>
            {product.originalPrice ? <p style={{color:'#6b7280',textDecoration:'line-through'}}>₹{product.originalPrice}</p> : null}
            <Link to={`/checkout/${product.id}`} className="btn" style={{marginTop:16,display:'inline-block'}}>Buy Now</Link>
          </div>
        </div>
        <div>
          <p style={{color:'#6b7280',fontSize:'0.95rem',marginBottom:10}}>{product.occasion}</p>
          <p>{product.description}</p>
          <dl style={{display:'grid',gridTemplateColumns:'auto 1fr',gap:'10px 16px',marginTop:18}}>
            <dt style={{fontWeight:700,color:'#334155'}}>Material</dt><dd>{product.material}</dd>
            <dt style={{fontWeight:700,color:'#334155'}}>Color</dt><dd>{product.color}</dd>
            <dt style={{fontWeight:700,color:'#334155'}}>Category</dt><dd>{product.category || 'Sarees'}</dd>
          </dl>
        </div>
      </div>
    </div>
  )
}

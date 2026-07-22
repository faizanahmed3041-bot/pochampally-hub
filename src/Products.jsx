import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { PRODUCTS as FALLBACK_PRODUCTS } from './productData'

export default function Products(){
  const [products,setProducts] = useState([])

  useEffect(()=>{
    const fallback = FALLBACK_PRODUCTS;

    import('./api').then(({ getJson }) => {
      getJson('/api/products').then(j=>{
        if (!j || !Array.isArray(j) || j.length === 0) {
          setProducts(fallback);
        } else {
          setProducts(j);
        }
      }).catch(()=>{
        setProducts(fallback);
      })
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
            <div className="card-body">
              <div className="card-title">{p.name}</div>
              <div className="meta"><div className="price-discount">₹{p.price}</div>{p.originalPrice ? <div className="price-original">₹{p.originalPrice}</div> : null}</div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

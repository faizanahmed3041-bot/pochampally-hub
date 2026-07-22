import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { PRODUCTS as FALLBACK_PRODUCTS } from './productData'

export default function Checkout(){
  const { id } = useParams()
  const [product, setProduct] = useState(null)
  const [quantity, setQuantity] = useState(1)
  const [customer, setCustomer] = useState({ name:'', email:'', phone:'', address:'', city:'', state:'', pincode:'' })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [statusMessage, setStatusMessage] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    import('./api').then(({ getJson }) => {
      getJson('/api/products').then(list => {
        const p = list.find(x => String(x.id) === String(id))
        setProduct(p || FALLBACK_PRODUCTS.find(x => String(x.id) === String(id)))
      }).catch(() => {
        setProduct(FALLBACK_PRODUCTS.find(x => String(x.id) === String(id)))
      })
    }).catch(() => {
      setProduct(FALLBACK_PRODUCTS.find(x => String(x.id) === String(id)))
    })
  }, [id])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!product) {
      setError('Product not loaded yet.')
      return
    }
    if (!customer.name || !customer.email || !customer.phone || !customer.address) {
      setError('Please fill in your contact and shipping information.')
      return
    }
    setError('')
    setStatusMessage('')
    setLoading(true)

    const qty = Math.max(1, Number(quantity))
    const total = product.price * qty
    const prebookingAmount = Math.round(total * 0.3)
    const remainingAmount = total - prebookingAmount

    const orderPayload = {
      customer,
      items: [{ id: product.id, name: product.name, price: product.price, quantity: qty }],
      total,
      prebookingAmount,
      remainingAmount
    }

    try {
      const { postJson } = await import('./api')
      const data = await postJson('/api/orders', orderPayload)
      navigate(`/confirmation/${data.orderId}`, { state: { order: data } })
    } catch (err) {
      console.warn('Backend unavailable, saving order locally', err)
      const fallbackOrder = {
        success: true,
        orderId: `PH${Date.now().toString(36).toUpperCase()}`,
        trackingId: `TRK${Date.now().toString(36).toUpperCase()}`,
        total,
        prebookingAmount,
        remainingAmount,
        customer,
        items: orderPayload.items,
        date: new Date().toISOString(),
        status: 'confirmed'
      }
      const stored = JSON.parse(localStorage.getItem('pochampally-orders') || '[]')
      stored.push(fallbackOrder)
      localStorage.setItem('pochampally-orders', JSON.stringify(stored))
      navigate(`/confirmation/${fallbackOrder.orderId}`, { state: { order: fallbackOrder } })
    } finally {
      setLoading(false)
    }
  }

  if (!product) {
    return (
      <div className="container">
        <Link to="/products">← Back to Products</Link>
        <p style={{marginTop:16}}>Loading product details...</p>
      </div>
    )
  }

  return (
    <div className="container">
      <Link to={`/product/${product.id}`}>← Back to {product.name}</Link>
      <h2 style={{marginTop:16}}>Checkout</h2>
      <div style={{display:'grid',gridTemplateColumns:'1fr 360px',gap:24,marginTop:20}}>
        <div>
          <div style={{padding:20,background:'#fff',border:'1px solid #ede9e1',borderRadius:12,boxShadow:'0 10px 30px rgba(15,23,42,0.04)'}}>
            <h3>{product.name}</h3>
            <img loading="lazy" src={product.image} alt={product.name} style={{width:'100%',borderRadius:12,marginTop:16}} />
            <p style={{marginTop:14,color:'#475569'}}>{product.description}</p>
            <div style={{marginTop:12,display:'flex',gap:12,alignItems:'baseline'}}>
              <span style={{fontSize:'1.25rem',fontWeight:700}}>₹{product.price}</span>
              {product.originalPrice ? <span style={{color:'#6b7280',textDecoration:'line-through'}}>₹{product.originalPrice}</span> : null}
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} style={{padding:20,background:'#fff',border:'1px solid #ede9e1',borderRadius:12,boxShadow:'0 10px 30px rgba(15,23,42,0.04)'}}>
          <h3>Order details</h3>
          <label style={{display:'block',marginTop:16}}>
            Quantity
            <input type="number" min="1" value={quantity} onChange={e=>setQuantity(e.target.value)} style={{width:'100%',marginTop:8}} />
          </label>
          <label style={{display:'block',marginTop:16}}>
            Name
            <input value={customer.name} onChange={e=>setCustomer({...customer,name:e.target.value})} style={{width:'100%',marginTop:8}} />
          </label>
          <label style={{display:'block',marginTop:16}}>
            Email
            <input type="email" value={customer.email} onChange={e=>setCustomer({...customer,email:e.target.value})} style={{width:'100%',marginTop:8}} />
          </label>
          <label style={{display:'block',marginTop:16}}>
            Phone
            <input value={customer.phone} onChange={e=>setCustomer({...customer,phone:e.target.value})} style={{width:'100%',marginTop:8}} />
          </label>
          <label style={{display:'block',marginTop:16}}>
            Address
            <textarea value={customer.address} onChange={e=>setCustomer({...customer,address:e.target.value})} rows={3} style={{width:'100%',marginTop:8,borderRadius:8}} />
          </label>
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:12,marginTop:16}}>
            <label style={{display:'block'}}>
              City
              <input value={customer.city} onChange={e=>setCustomer({...customer,city:e.target.value})} style={{width:'100%',marginTop:8}} />
            </label>
            <label style={{display:'block'}}>
              State
              <input value={customer.state} onChange={e=>setCustomer({...customer,state:e.target.value})} style={{width:'100%',marginTop:8}} />
            </label>
          </div>
          <label style={{display:'block',marginTop:16}}>
            Pincode
            <input value={customer.pincode} onChange={e=>setCustomer({...customer,pincode:e.target.value})} style={{width:'100%',marginTop:8}} />
          </label>
          <div style={{marginTop:18,display:'grid',gridTemplateColumns:'1fr 1fr',gap:12}}>
            <div style={{padding:14,background:'#f8fafc',borderRadius:10}}>
              <div style={{fontSize:'0.875rem',color:'#475569'}}>Total</div>
              <div style={{fontWeight:700,marginTop:6}}>₹{product.price * quantity}</div>
            </div>
            <div style={{padding:14,background:'#f8fafc',borderRadius:10}}>
              <div style={{fontSize:'0.875rem',color:'#475569'}}>Pay now (30%)</div>
              <div style={{fontWeight:700,marginTop:6}}>₹{Math.round(product.price * quantity * 0.3)}</div>
            </div>
          </div>
          {statusMessage && <p style={{color:'#0f766e',marginTop:16}}>{statusMessage}</p>}
          {error && <p style={{color:'#b91c1c',marginTop:16}}>{error}</p>}
          <button type="submit" className="btn" style={{width:'100%',marginTop:20}} disabled={loading}>{loading ? 'Placing order...' : 'Place Order'}</button>
        </form>
      </div>
    </div>
  )
}

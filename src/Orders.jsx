import React, { useState } from 'react'

export default function Orders(){
  const [phone, setPhone] = useState('')
  const [orders, setOrders] = useState(null)
  const [loading, setLoading] = useState(false)

  const fetchByPhone = async () => {
    setLoading(true)
    try{
      const { getJson } = await import('./api')
      const data = await getJson(`/api/orders/user/${encodeURIComponent(phone)}`)
      setOrders(data)
    }catch(e){
      const stored = JSON.parse(localStorage.getItem('pochampally-orders') || '[]')
      const filtered = stored.filter(o => o.customer?.phone === phone)
      setOrders(filtered)
      if (!filtered.length) {
        alert('Orders API not available. Showing local orders if any.')
      }
    }finally{setLoading(false)}
  }

  return (
    <div className="container">
      <h2>My Orders</h2>
      <p>Enter your phone number to view orders placed with that phone.</p>
      <div style={{display:'flex',gap:8,marginTop:8}}>
        <input value={phone} onChange={e=>setPhone(e.target.value)} placeholder="Enter phone" />
        <button onClick={fetchByPhone} className="btn">Lookup</button>
      </div>

      {loading && <p>Loading...</p>}
      {orders && orders.length===0 && <p>No orders found for this phone.</p>}
      {orders && orders.length>0 && (
        <ul style={{marginTop:16}}>
          {orders.map(o=> (
            <li key={o.id} style={{padding:12,border:'1px solid #eee',borderRadius:6,marginBottom:8}}>
              <div><strong>Order ID:</strong> {o.id}</div>
              <div><strong>Date:</strong> {new Date(o.date).toLocaleString()}</div>
              <div><strong>Status:</strong> {o.status}</div>
              <div><strong>Total:</strong> ₹{o.total}</div>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

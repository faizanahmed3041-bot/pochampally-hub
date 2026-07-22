import React, { useState } from 'react'

export default function TrackOrder(){
  const [orderId,setOrderId] = useState('')
  const [order,setOrder] = useState(null)

  const lookup = async ()=>{
    try{
      const { getJson } = await import('./api')
      const j = await getJson(`/api/orders/${encodeURIComponent(orderId)}`)
      setOrder(j)
    }catch(e){
      const stored = JSON.parse(localStorage.getItem('pochampally-orders') || '[]')
      const found = stored.find(o => o.orderId === orderId || o.id === orderId)
      if (found) {
        setOrder(found)
      } else {
        setOrder(null)
        alert('Orders API not available or order not found. Use a local order ID if placed without backend.')
      }
    }
  }

  return (
    <div className="container">
      <h2>Track Order</h2>
      <div style={{display:'flex',gap:8,marginTop:8}}>
        <input value={orderId} onChange={e=>setOrderId(e.target.value)} placeholder="Enter Order ID" />
        <button onClick={lookup} className="btn">Track</button>
      </div>

      {order && (
        <div style={{marginTop:16,padding:12,border:'1px solid #eee',borderRadius:6}}>
          <div><strong>Order ID:</strong> {order.id}</div>
          <div><strong>Status:</strong> {order.status}</div>
          <div><strong>Date:</strong> {new Date(order.date).toLocaleString()}</div>
        </div>
      )}
    </div>
  )
}

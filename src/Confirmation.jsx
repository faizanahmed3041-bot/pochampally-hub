import React from 'react'
import { Link, useLocation, useParams } from 'react-router-dom'

export default function Confirmation(){
  const { id } = useParams()
  const location = useLocation()
  const state = location.state || {}
  const order = state.order || { orderId: id }

  return (
    <div className="container">
      <h2>Order Confirmed</h2>
      <div style={{padding:20,background:'#fff',border:'1px solid #ede9e1',borderRadius:12,boxShadow:'0 10px 30px rgba(15,23,42,0.04)',marginTop:16}}>
        <p style={{fontSize:'1.1rem'}}>Your order has been placed successfully.</p>
        <p><strong>Order ID:</strong> {order.orderId || order.id}</p>
        {order.trackingId && <p><strong>Tracking ID:</strong> {order.trackingId}</p>}
        <p><strong>Total Paid:</strong> ₹{order.total || order.amount || 'N/A'}</p>
        <p>A confirmation email has been sent if email delivery is configured.</p>
      </div>
      <div style={{marginTop:20}}>
        <Link to="/products" className="btn">Continue Shopping</Link>
      </div>
    </div>
  )
}

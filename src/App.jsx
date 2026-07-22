import React from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import Home from './Home'
import ProductDetail from './ProductDetail' // may not exist after revert; keep import optional
import Orders from './Orders'
import TrackOrder from './TrackOrder'

function Nav(){
  return (
    <nav style={{padding:12, borderBottom:'1px solid #eee', background:'#fff'}}>
      <div style={{maxWidth:1100,margin:'0 auto',display:'flex',justifyContent:'space-between',alignItems:'center'}}>
        <div><Link to="/" style={{fontWeight:700,textDecoration:'none'}}>Pochampally Hub</Link></div>
        <div style={{display:'flex',gap:12}}>
          <Link to="/">Home</Link>
          <Link to="/products">Products</Link>
          <Link to="/orders">My Orders</Link>
          <Link to="/track">Track Order</Link>
        </div>
      </div>
    </nav>
  )
}

export default function App(){
  return (
    <div>
      <Nav />
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/product/:id" element={ (typeof ProductDetail!=='undefined') ? <ProductDetail/> : <Home/> } />
        <Route path="/orders" element={<Orders/>} />
        <Route path="/track" element={<TrackOrder/>} />
      </Routes>
    </div>
  )
}

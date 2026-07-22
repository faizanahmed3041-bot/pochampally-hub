import React from 'react'
import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="container">
      <h2>Page not found</h2>
      <p>It looks like the page you're trying to reach is not available.</p>
      <Link to="/" className="btn">Back to Home</Link>
    </div>
  )
}

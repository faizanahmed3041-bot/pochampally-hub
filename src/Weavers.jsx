import React from 'react'
import { Link } from 'react-router-dom'

export default function Weavers() {
  return (
    <div className="container">
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',gap:20,flexWrap:'wrap'}}>
        <div style={{flex:'1 1 420px'}}>
          <h2>Weaver Resources</h2>
          <p>Welcome to the Weaver Dashboard. Find raw materials, yarn purification tips, and tools to help you build better sarees at lower cost.</p>
          <div style={{marginTop:20}}>
            <p style={{marginBottom:10,fontWeight:700}}>What you can do here:</p>
            <ul style={{paddingLeft:20,color:'#475569',lineHeight:1.75}}>
              <li>Browse affordable saree raw materials and sourcing tips.</li>
              <li>Learn about yarn purification and cleaning best practices.</li>
              <li>Run yarn quality checks with a photo upload to detect good or bad yarn.</li>
            </ul>
          </div>
          <Link to="/yarn-confirmation" className="btn" style={{marginTop:20}}>Open Yarn Confirmation</Link>
        </div>
        <div style={{flex:'0 0 380px',padding:20,background:'#fff',borderRadius:16,boxShadow:'0 20px 50px rgba(15,23,42,0.08)'}}>
          <h3>Raw materials spotlight</h3>
          <div style={{marginTop:16}}>
            <p><strong>Affordable supplies:</strong> Cotton, silk, zari thread, natural dyes, and industrial-quality yarn in bulk.</p>
            <p><strong>Purification:</strong> Use clean water, gentle alkali baths, and repeated rinsing to remove impurities from yarn.</p>
            <p><strong>Cost saving:</strong> Compare suppliers, buy in bulk, and use local dye sources for better margins.</p>
          </div>
        </div>
      </div>
    </div>
  )
}

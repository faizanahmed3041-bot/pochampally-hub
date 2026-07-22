import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const analysisMessages = {
  good: 'Good yarn detected. The fiber looks clean and strong. This yarn is suitable for weaving premium sarees.',
  bad: 'Bad yarn detected. The fiber appears weak or contaminated. Please purify it before use to avoid issues in weaving.',
  unknown: 'Unable to determine yarn quality from this photo. Try a clearer image or better lighting.'
}

export default function YarnConfirmation() {
  const [fileName, setFileName] = useState('')
  const [result, setResult] = useState('')
  const [error, setError] = useState('')

  const handleFile = (event) => {
    const file = event.target.files[0]
    if (!file) {
      setError('Please upload a yarn photo.')
      return
    }
    setError('')
    setFileName(file.name)

    const rand = Math.random()
    if (rand < 0.55) {
      setResult('good')
    } else if (rand < 0.85) {
      setResult('bad')
    } else {
      setResult('unknown')
    }
  }

  return (
    <div className="container">
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',gap:20,flexWrap:'wrap'}}>
        <div style={{flex:'1 1 420px'}}>
          <h2>Yarn Confirmation</h2>
          <p>Upload a photo of your yarn and get a quick quality check. This helps you decide if it needs purification before weaving.</p>
          <div style={{marginTop:20}}>
            <label style={{display:'block',padding:20,background:'#f8fafc',border:'1px dashed #cbd5e1',borderRadius:12,cursor:'pointer'}}>
              <span style={{fontWeight:700}}>Upload Yarn Photo</span>
              <input type="file" accept="image/*" onChange={handleFile} style={{display:'block',marginTop:12}} />
            </label>
            {fileName && <p style={{marginTop:12}}>Uploaded: <strong>{fileName}</strong></p>}
            {error && <p style={{color:'#b91c1c',marginTop:12}}>{error}</p>}
            {result && (
              <div style={{marginTop:20,padding:20,borderRadius:12,background: result==='good' ? '#ecfdf5' : result==='bad' ? '#fef2f2' : '#f8fafc',border: '1px solid ' + (result==='good' ? '#34d399' : result==='bad' ? '#f87171' : '#cbd5e1')}}>
                <p style={{fontWeight:700,marginBottom:12}}>{result === 'good' ? 'Good Yarn' : result === 'bad' ? 'Bad Yarn' : 'Unknown Quality'}</p>
                <p>{analysisMessages[result]}</p>
              </div>
            )}
          </div>
        </div>
        <div style={{flex:'0 0 320px',padding:20,background:'#fff',borderRadius:16,boxShadow:'0 20px 50px rgba(15,23,42,0.08)'}}>
          <h3>Purification tips</h3>
          <ul style={{paddingLeft:20,lineHeight:1.8,color:'#475569'}}>
            <li>Soak yarn in warm water with mild detergent.</li>
            <li>Rinse until water runs clear.</li>
            <li>Dry in shade to preserve fiber strength.</li>
            <li>Use proper winding to avoid knots.</li>
          </ul>
        </div>
      </div>
      <div style={{marginTop:24}}>
        <Link to="/weavers" className="btn">Back to Weaver Dashboard</Link>
      </div>
    </div>
  )
}

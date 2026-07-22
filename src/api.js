const API_BASE = import.meta.env.VITE_API_BASE || ''

export function apiUrl(path) {
  if (!path.startsWith('/')) {
    path = `/${path}`
  }
  return `${API_BASE}${path}`
}

export async function getJson(path) {
  const res = await fetch(apiUrl(path))
  if (!res.ok) {
    throw new Error(`API error ${res.status}`)
  }
  return res.json()
}

export async function postJson(path, body) {
  const res = await fetch(apiUrl(path), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  })
  if (!res.ok) {
    throw new Error(`API error ${res.status}`)
  }
  return res.json()
}

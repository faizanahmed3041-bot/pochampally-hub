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

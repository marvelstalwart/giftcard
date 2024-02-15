
export default function useUrl() {
    const __isProd__ = process.env.NODE_ENV === 'production'
    const host = __isProd__ ? 'https://giftcard-server.onrender.com' : 'http://localhost:5000'
  return host
}

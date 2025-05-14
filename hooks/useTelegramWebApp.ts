import { useEffect, useState } from 'react'

export default function useTelegramWebApp() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [webApp, setWebApp] = useState<any>(null)

  useEffect(() => {
    if (typeof window !== 'undefined' && window.Telegram?.WebApp) {
      setWebApp(window.Telegram.WebApp)
    }
  }, [])

  return webApp
}
'use client'

import { Scan, Cards } from '@/components'
import { useState, useEffect } from 'react'

export default function Home() {
  const [scans, setScans] = useState([])
  useEffect(() => {
    const storedScans = sessionStorage.getItem('scans')
    if (storedScans) {
      setScans([...JSON.parse(storedScans)])
    }
  }, [])

  return (
    <div className="flex flex-col relative items-center min-h-screen p-8 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col items-center w-full">
        <section className="flex gap-2 w-full justify-center relative">
          <Scan setScans={setScans} />
        </section>
        <Cards scans={scans} setScans={setScans} />
      </main>
    </div>
  )
}

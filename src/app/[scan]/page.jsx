'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import { Spinner } from '@/components'
import Link from 'next/link'

export default function ScanPage() {
  const [isLoading, setIsLoading] = useState(true)
  const { scan: scanId } = useParams()
  const [scanData, setScanData] = useState({})

  useEffect(() => {
    setTimeout(() => {
      const storedScans = sessionStorage.getItem('scans')
      const scans = JSON.parse(storedScans) || []
      setScanData(scans.find((item) => item.id === scanId))
      setIsLoading(false)
    }, 500)
  }, [])

  const domain = scanData['Scan Info']?.[0]
  const startTime = scanData['Scan Info']?.[1]
  const endTime = scanData['Scan Info']?.[2]

  const dataColumns = ['Subdomains', 'Emails', 'IPs', 'Sources Used', 'LinkedIn Accounts']

  return (
    <div className="flex flex-col relative items-center min-h-screen p-8 font-[family-name:var(--font-geist-sans)]">
      {isLoading ? (
        <Spinner />
      ) : (
        <div className="w-full">
          <h1 className="text-xl w-full text-center flex items-center justify-center gap-2">
            Scan Details for <span className="font-bold">{domain}</span>
            <img src={`https://www.${domain}/favicon.ico`} alt="Icon" className="w-auto h-6" />
          </h1>

          <div className="flex gap-4 mt-6 flex-wrap justify-center">
            <ul>
              <li>
                Scan ID: <span className="font-bold">{scanId}</span>
              </li>
              <li>
                Domain: <span className="font-bold">{domain}</span>
              </li>
              <li className="text-lg">
                Start Time: <span className="font-bold">{startTime}</span>
              </li>
              <li className="text-lg">
                End Time: <span className="font-bold">{endTime}</span>
              </li>
            </ul>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 lg:gap-4">
              {dataColumns.map((col, index) => (
                <div
                  key={index}
                  className="flex h-full sm:w-full flex-col pl-6 pr-10 py-4 bg-gray-800 border border-gray-700 rounded-lg shadow"
                >
                  <h4 className="border-b border-b-white text-center">{col}</h4>
                  <ul className="flex flex-col gap-2">
                    {col === 'LinkedIn Accounts' &&
                      scanData[col]?.map((row, index) => (
                        <li className="text-sm" key={index}>
                          Name: {row.name} <br />
                          Title: {row.title} <br />
                          URL:{' '}
                          <Link href={row.profile_url} className="text-blue-400">
                            {row.profile_url}
                          </Link>
                        </li>
                      ))}
                    {col !== 'LinkedIn Accounts' &&
                      col !== 'Scan Info' &&
                      scanData[col]?.map((row, index) => (
                        <li className="text-sm" key={index}>
                          {row}
                        </li>
                      ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

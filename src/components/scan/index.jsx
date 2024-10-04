'use client'

import { useState, useRef } from 'react'
import { scanMock } from '@/mockData'
import { DetailsModal } from '..'

const Scan = ({ setScans }) => {
  const scanModalRef = useRef()

  const [domain, setDomain] = useState('')
  const [data, setData] = useState(undefined)
  const [isLoading, setIsLoading] = useState(true)

  const [isValid, setIsValid] = useState(true)
  const domainRegex = /^(?!:\/\/)([a-z0-9-]+\.)+[a-z]{2,}$/i

  const handleChange = (e) => {
    const value = e.target.value
    setDomain(value)
    // Validate the domain format
    setIsValid(value === '' || domainRegex.test(value))
  }

  const generateRandomId = () => {
    return 'id-' + Math.random().toString(36).substr(2, 9)
  }

  const formatDateWithTime = (date) => {
    const day = String(date.getDate()).padStart(2, '0') // Get day and pad with zero if needed
    const month = String(date.getMonth() + 1).padStart(2, '0') // Get month (0-indexed) and pad with zero
    const year = date.getFullYear() // Get full year
    const minutes = String(date.getMinutes()).padStart(2, '0') // Get minutes and pad with zero if needed
    const seconds = String(date.getSeconds()).padStart(2, '0') // Get seconds and pad with zero if needed

    return `${day}/${month}/${year} - ${minutes}:${seconds}` // Return formatted date
  }

  const handleScan = async () => {
    if (scanModalRef.current) {
      setIsLoading(true)
      scanModalRef.current.showModal()

      // try {
      //   const res = await fetch('http://localhost:3000/api/scan',{
      //     method: 'POST',
      //     body: JSON.stringify(domain),
      //     headers: {
      //       'content-type': 'application/json'
      //     }
      //   })

      //   const d = await res.json()
      //   setData({
      //     'Scan Info': [d.domain, d.startTime, d.endTime],
      //     'Sources Used': [...d.sources_used],
      //     Subdomains: [...d.subdomains],
      //     Emails: [...d.emails],
      //     IPs: [...d.ips],
      //     'LinkedIn Accounts': [...d.linkedIn_accounts]
      //   })
      //   setIsLoading(false)
      //   if(res.ok){
      //     console.log("Success")
      //   }else{
      //     console.log("Oops! Something is wrong.")
      //   }
      // } catch (error) {
      //     console.log(error)
      // }

      // Faking Request
      const randomDelay = Math.floor(Math.random() * (4000 - 1000 + 1)) + 1000
      setTimeout(() => {
        try {
          // Calculate start and end times
          const startTime = formatDateWithTime(new Date()) // Current time as start time
          const endTime = formatDateWithTime(new Date(new Date().getTime() + randomDelay)) // Add random delay for end time

          // Simulate fetching mock data with dynamic times
          const response = {
            id: generateRandomId(),
            'Scan Info': [domain, startTime, endTime],
            'Sources Used': [...scanMock.sources_used],
            Subdomains: [...scanMock.subdomains],
            Emails: [...scanMock.emails],
            IPs: [...scanMock.ips],
            'LinkedIn Accounts': [...scanMock.linkedIn_accounts]
          }

          // Update state with fetched data
          setData(response)

          const storedScans = sessionStorage.getItem('scans')
          const scans = JSON.parse(storedScans) || []
          const updatedScans = [...scans, response]

          setScans(updatedScans)
          sessionStorage.setItem('scans', JSON.stringify(updatedScans))
          setDomain('')
          setIsLoading(false)
        } catch (error) {
          console.error('Error fetching data:', error)
          setIsLoading(false)
        }
      }, randomDelay) // Use the random delay
    }
  }

  const closeModal = () => {
    if (scanModalRef.current) {
      setIsLoading(false)
      scanModalRef.current.close()
    }
  }

  return (
    <>
      <div className="flex flex-col relative">
        <input
          type="text"
          placeholder="Domain"
          value={domain}
          onChange={handleChange}
          className="bg-gray-700 border border-gray-600 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 placeholder-gray-400"
        />
        {!isValid && (
          <p className="text-red-500 text-xs absolute -bottom-4">Please enter a valid domain</p>
        )}
      </div>
      <button
        type="button"
        className="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 focus:outline-none"
        onClick={() => handleScan()}
        disabled={!isValid || !domain}
      >
        Scan
      </button>

      <DetailsModal
        ref={scanModalRef}
        closeModal={closeModal}
        domain={domain}
        isLoading={isLoading}
        data={data}
        isScanning
      />
    </>
  )
}

export default Scan

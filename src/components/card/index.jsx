'use client'

import Link from 'next/link'
import { Spinner, DetailsModal, LinkIcon } from '..'
import { useRef, useState } from 'react'
import { sortableHandle } from 'react-sortable-hoc'
import { DragIcon } from '..'

const Card = ({ data, onDelete, isLoading }) => {
  const cardModalRef = useRef()

  const DragHandle = sortableHandle(() => (
    <DragIcon className="absolute bottom-4 right-3 cursor-grab" />
  ))

  const { domain, start, end, id } = data

  const [scanData, setScanData] = useState([])
  const [isDataLoading, setDataIsLoading] = useState(false)

  const closeModal = () => {
    if (cardModalRef.current) {
      setDataIsLoading(false)
      cardModalRef.current.close()
    }
  }

  const handleShowDetails = () => {
    if (cardModalRef.current) {
      setDataIsLoading(true)
      cardModalRef.current.showModal()

      setTimeout(() => {
        const storedScans = sessionStorage.getItem('scans')
        const scans = JSON.parse(storedScans) || []
        setScanData(scans.find((item) => item.id === id))

        setDataIsLoading(false)
      }, 500)
    }
  }

  return (
    <>
      <div className="noselect relative flex w-4/5 h-full sm:w-full flex-col pl-6 pr-10 py-4 bg-gray-800 border border-gray-700 rounded-lg shadow">
        <span className="mb-2 text-2xl font-bold tracking-tight text-white flex gap-2 items-center">
          {domain}
          <img src={`https://www.${domain}/favicon.ico`} alt="Favicon" className="w-auto h-6" />
        </span>

        <Link href={`/${id}`}>
          <span className="mb-3 flex items-center gap-1 font-normal text-gray-400 ">
            ID: {id} <LinkIcon className="fill-gray-400" />
          </span>
        </Link>
        <span className="mb-3 font-normal text-gray-400">Start Time: {start}</span>
        <span className="mb-3 font-normal text-gray-400">End Time: {end}</span>
        <div>
          <button
            type="button"
            className="inline-flex w-fit items-center px-3 py-1 text-sm font-medium text-center text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-800"
            onClick={() => handleShowDetails()}
          >
            Details
          </button>
          <button
            type="button"
            className="ml-2 text-white bg-gray-800 border border-gray-600 focus:outline-none hover:bg-gray-700 focus:ring-4 focus:ring-gray-700 font-medium rounded-lg text-sm px-3 py-1"
            onClick={onDelete}
          >
            {isLoading ? <Spinner className="w-5 h-5" /> : 'Remove'}
          </button>
        </div>
        <DragHandle />
      </div>
      <DetailsModal
        ref={cardModalRef}
        closeModal={closeModal}
        domain={domain}
        isLoading={isDataLoading}
        data={scanData}
      />
    </>
  )
}

export default Card

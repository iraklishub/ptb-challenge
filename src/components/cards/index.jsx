'use client'

import { useState, useCallback } from 'react'
import { Card } from '..'
import { SortableContainer, SortableElement } from 'react-sortable-hoc'

const Cards = ({ scans, setScans }) => {
  const [isLoading, setIsLoading] = useState(false)

  const handleDelete = (id) => {
    setIsLoading(id)
    setTimeout(() => {
      const storedScans = sessionStorage.getItem('scans')
      const scans = JSON.parse(storedScans) || []
      const updatedScans = scans.filter((s) => s.id !== id)

      setScans(updatedScans)
      sessionStorage.setItem('scans', JSON.stringify(updatedScans))
      setIsLoading(false)
    }, 500)
  }

  const onDragEnd = useCallback(
    ({ oldIndex, newIndex }) => {
      const newScans = [...scans]
      const [removed] = newScans.splice(oldIndex, 1)
      newScans.splice(newIndex, 0, removed)

      setScans(newScans)
      sessionStorage.setItem('scans', JSON.stringify(newScans))
    },
    [scans]
  )

  const SortableItem = SortableElement(({ data }) => (
    <Card
      key={data.id}
      data={{
        id: data.id,
        domain: data['Scan Info'][0],
        start: data['Scan Info'][1],
        end: data['Scan Info'][2]
      }}
      isLoading={isLoading === data.id && isLoading}
      onDelete={() => handleDelete(data.id)}
    />
  ))

  const SortableList = SortableContainer(({ items }) => {
    return (
      <section className="mt-5 w-full place-items-center justify-items-center sm:w-fit lg:mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 lg:gap-4">
        {items.map((data, index) => (
          <SortableItem key={index} index={index} data={data} />
        ))}
      </section>
    )
  })

  return scans.length ? (
    <SortableList items={scans} onSortEnd={onDragEnd} axis="xy" useDragHandle />
  ) : (
    <span className="col-span-4 mt-6">No scans</span>
  )
}

export default Cards

import { Modal, Spinner } from '..'
import { forwardRef } from 'react'

const DetailsModal = forwardRef(({ closeModal, domain, isLoading, data, isScanning }, ref) => {
  const dataColumns = [
    'Scan Info',
    'Sources Used',
    'Subdomains',
    'Emails',
    'IPs',
    'LinkedIn Accounts'
  ]

  return (
    <Modal ref={ref} close={closeModal}>
      <div className="flex flex-col min-h-96 h-fit w-full items-center gap-4">
        <h3 className="text-lg font-semibold w-full text-center">Results for "{domain}"</h3>
        <div className="w-full">
          {isLoading ? (
            <div className="flex gap-2 items-center justify-center mt-6">
              <Spinner />
              <span>{isScanning ? 'Scanning' : 'Loading'}</span>
            </div>
          ) : (
            <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 lg:gap-4">
              {dataColumns.map((col, index) => (
                <div key={index}>
                  <h4 className="border-b border-b-white text-center">{col}</h4>
                  <ul className="flex flex-col gap-2">
                    {col === 'Scan Info' &&
                      data[col]?.map((rowData, index) => (
                        <li className="text-sm" key={index}>
                          {['Domain', 'Start Time', 'End Time'][index]}: {rowData}
                        </li>
                      ))}
                    {col === 'LinkedIn Accounts' &&
                      data[col]?.map((row, index) => (
                        <li className="text-sm" key={index}>
                          Name: {row.name} <br />
                          Title: {row.title} <br />
                          URL: {row.profile_url}
                        </li>
                      ))}
                    {col !== 'LinkedIn Accounts' &&
                      col !== 'Scan Info' &&
                      data[col]?.map((row, index) => (
                        <li className="text-sm" key={index}>
                          {row}
                        </li>
                      ))}
                  </ul>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </Modal>
  )
})

export default DetailsModal

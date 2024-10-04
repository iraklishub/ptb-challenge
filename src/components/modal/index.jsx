import { forwardRef } from 'react'

const Modal = forwardRef(({ children, close }, ref) => (
  <dialog
    ref={ref}
    className="p-4 w-screen sm:w-10/12 backdrop:bg-black/70 text-white bg-slate-900 rounded-lg shadow"
  >
    {children}
    <div className="w-full flex justify-end mt-6">
      <button
        type="button"
        onClick={close}
        autoFocus={true}
        className="text-white bg-gray-800 border border-gray-600 focus:outline-none hover:bg-gray-700 focus:ring-4 focus:ring-gray-700 font-medium rounded-lg text-sm px-5 py-2.5 hover:border-gray-600"
      >
        Close
      </button>
    </div>
  </dialog>
))

export default Modal

'use client'
import { useState } from "react"
import { FaLinkedinIn, FaPhone } from 'react-icons/fa'
import { MdKeyboardArrowUp, MdClose } from "react-icons/md"
import { HiOutlineUserCircle } from "react-icons/hi2" // Headset/chat/agent

export default function StickySidebar() {
  const [showPhone, setShowPhone] = useState(false)
  const [open, setOpen] = useState(true)

  if (!open) return null

  return (
    <div className="fixed top-1/2 -translate-y-1/2 right-4 z-50 flex flex-col items-center gap-3">
      {/* Close Button */}
      <button
        className="mb-2 bg-gray-300 hover:bg-gray-400 p-2 rounded-full"
        aria-label="Close sidebar"
        onClick={() => setOpen(false)}
      >
        <MdClose className="h-6 w-6 text-gray-600" />
      </button>

      {/* Chatbot/Agent/Telecaller */}
      <button className="bg-gray-200 hover:bg-gray-300 p-3 rounded-lg shadow" aria-label="Chatbot">
        <HiOutlineUserCircle className="w-7 h-7 text-indigo-600" />
      </button>

      {/* Phone Popup */}
      <button
        className="bg-gray-200 hover:bg-green-100 p-3 rounded-lg shadow relative"
        onClick={() => setShowPhone((p) => !p)}
        aria-label="Show phone number"
      >
        <FaPhone className="h-6 w-6 text-green-700" />
        {showPhone && (
          <span className="absolute left-[-215px] top-1/2 -translate-y-1/2 bg-white px-5 py-2 shadow-lg rounded-xl border text-base font-bold text-gray-900 z-50 whitespace-nowrap">
            +86-755-3360-1988
          </span>
        )}
      </button>

      {/* LinkedIn */}
      <a
        href="https://www.linkedin.com/company/sumith-electronics" target="_blank" rel="noopener"
        className="bg-[#19a44c] hover:bg-green-700 p-3 rounded-lg shadow flex items-center justify-center"
        aria-label="LinkedIn"
      >
        <FaLinkedinIn className="h-6 w-6 text-white" />
      </a>

      {/* Top/Scroll-to-Top */}
      <button
        className="bg-gray-300 hover:bg-blue-400 p-3 rounded-lg shadow mt-1"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        aria-label="Back to Top"
      >
        <MdKeyboardArrowUp className="h-6 w-6 text-blue-800" />
      </button>
    </div>
  )
}

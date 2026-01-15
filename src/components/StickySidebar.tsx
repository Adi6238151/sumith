"use client"

import { useState } from "react"
import { FaLinkedinIn, FaPhone } from "react-icons/fa"
import { MdKeyboardArrowUp, MdClose, MdKeyboardArrowLeft } from "react-icons/md"
import { HiOutlineUserCircle } from "react-icons/hi2"

type ItemId = "agent" | "phone" | "linkedin" | "top"

const ITEMS: { id: ItemId; icon: React.ComponentType<{ className?: string }> }[] =
  [
    { id: "agent", icon: HiOutlineUserCircle },
    { id: "phone", icon: FaPhone },
    { id: "linkedin", icon: FaLinkedinIn },
    { id: "top", icon: MdKeyboardArrowUp },
  ]

export default function StickySidebar() {
  const [showPhone, setShowPhone] = useState(false)
  const [open, setOpen] = useState(true)
  const [activeId, setActiveId] = useState<ItemId>("linkedin")

  const itemHeight = 44 // px – must match item button height

  // Re‑open FAB when dock is closed
  if (!open) {
    return (
      <button
        className="fixed top-1/2 right-3 z-40 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-slate-900 text-slate-100 shadow-[0_12px_30px_rgba(15,23,42,0.45)] hover:bg-slate-800 transition-colors"
        aria-label="Open quick actions"
        onClick={() => setOpen(true)}
      >
        <MdKeyboardArrowLeft className="h-5 w-5" />
      </button>
    )
  }

  return (
    <div className="fixed top-1/2 right-4 z-40 -translate-y-1/2">
      {/* Pill container */}
      <div className="relative flex flex-col rounded-[26px] bg-gradient-to-b from-slate-50 to-slate-100/95 border border-slate-200/90 shadow-[0_18px_50px_rgba(15,23,42,0.25)] overflow-hidden">
        {/* Close button */}
        <button
          className="flex h-10 w-14 items-center justify-center bg-slate-50 text-slate-600 hover:bg-slate-200 transition-colors"
          aria-label="Close sidebar"
          onClick={() => setOpen(false)}
        >
          <MdClose className="h-4 w-4" />
        </button>

        <div className="h-px w-full bg-slate-200/80" />

        {/* Items region */}
        <div className="relative">
          {/* Moving dark highlight behind icons */}
          <div
            className="absolute inset-x-0 top-0 z-0 w-full bg-slate-900 transition-transform duration-200 ease-out"
            style={{
              height: `${itemHeight}px`,
              transform: `translateY(${
                ITEMS.findIndex((i) => i.id === activeId) * itemHeight
              }px)`,
            }}
          />

          <div className="relative z-10 flex flex-col">
            {ITEMS.map((item, index) => {
              const Icon = item.icon
              const isActive = item.id === activeId
              const iconClass = isActive
                ? "h-5 w-5 text-white"
                : "h-5 w-5 text-slate-800"

              const handleMouseEnter = () => setActiveId(item.id)

              const handleClick = () => {
                if (item.id === "phone") {
                  setShowPhone((p) => !p)
                } else if (item.id === "top") {
                  window.scrollTo({ top: 0, behavior: "smooth" })
                } else if (item.id === "linkedin") {
                  window.open(
                    "https://www.linkedin.com/company/sumith-electronics",
                    "_blank",
                    "noopener"
                  )
                }
              }

              // phone needs tooltip wrapper
              if (item.id === "phone") {
                return (
                  <div key={item.id} className="relative">
                    <button
                      className="relative flex h-11 w-14 items-center justify-center transition-colors"
                      onMouseEnter={handleMouseEnter}
                      onClick={handleClick}
                      aria-label="Show phone number"
                    >
                      <Icon className={iconClass} />
                    </button>

                    {showPhone && (
                      <div className="absolute right-[120%] top-1/2 -translate-y-1/2 whitespace-nowrap rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-900 shadow-[0_18px_40px_rgba(15,23,42,0.25)]">
                        +86-755-3360-1988
                        <div className="pointer-events-none absolute left-full top-1/2 -translate-y-1/2">
                          <div className="h-2.5 w-2.5 rotate-45 rounded-[3px] border border-slate-200 bg-white border-l-0 border-t-0" />
                        </div>
                      </div>
                    )}

                    {index !== ITEMS.length - 1 && (
                      <div className="h-px w-full bg-slate-200/70" />
                    )}
                  </div>
                )
              }

              // other items
              return (
                <div key={item.id}>
                  <button
                    className="relative flex h-11 w-14 items-center justify-center transition-colors"
                    onMouseEnter={handleMouseEnter}
                    onClick={handleClick}
                    aria-label={item.id}
                  >
                    <Icon className={iconClass} />
                  </button>

                  {index !== ITEMS.length - 1 && (
                    <div className="h-px w-full bg-slate-200/70" />
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

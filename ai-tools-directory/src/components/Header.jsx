// src/components/Header.jsx
import React from 'react'

export default function Header(){
  return (
    <header className="bg-white/90 backdrop-blur sticky top-0 z-30 border-b">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-primary text-white rounded-full w-10 h-10 grid place-items-center font-bold">AI</div>
          <div>
            <div className="font-semibold">AI Tools Directory</div>
            <div className="text-xs text-gray-500">Curated & auto-updated</div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <a className="text-sm text-gray-600" href="#submit">Submit</a>
          <a className="text-sm text-gray-600" href="#login">Login</a>
        </div>
      </div>
    </header>
  )
}

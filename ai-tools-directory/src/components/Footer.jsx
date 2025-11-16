// src/components/Footer.jsx
import React from 'react'

export default function Footer(){
  return (
    <footer className="border-t bg-white/60 mt-12">
      <div className="max-w-6xl mx-auto px-6 py-6 text-sm text-gray-600 flex items-center justify-between">
        <div>© {new Date().getFullYear()} AI Tools Directory</div>
        <div>
          <a href="#privacy" className="mr-4">Privacy</a>
          <a href="#contact">Contact</a>
        </div>
      </div>
    </footer>
  )
}

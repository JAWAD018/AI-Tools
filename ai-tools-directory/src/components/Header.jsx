// src/components/Header.jsx
import React from 'react'
import {  Sparkles} from "lucide-react";

export default function Header(){
  return (
    <header>
      <div className="max-w-4xl mx-auto text-center mb-12 sm:mb-16">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600/20 to-purple-600/20 border border-blue-600/30 rounded-full mb-6 backdrop-blur-sm">
                  <Sparkles className="w-4 h-4 text-blue-400" />
                  <span className="text-sm text-zinc-300 font-medium">Discover the best AI tools</span>
                </div>
                
                <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold text-white mb-4 sm:mb-6 leading-tight">
                  <span className="block bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                    AI Tools Directory
                  </span>
                </h1>
                
                <p className="text-lg sm:text-xl text-zinc-400 max-w-2xl mx-auto leading-relaxed">
                  Explore curated AI tools to supercharge your workflow and boost productivity
                </p>
              </div>
    
    </header>
  )
}

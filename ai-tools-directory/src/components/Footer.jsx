// src/components/Footer.jsx
import React from 'react';
import { Heart, Github, Twitter, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="relative border-t border-zinc-800 bg-black mt-20">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <h3 className="text-white font-bold text-lg mb-3">AI Tools Directory</h3>
            <p className="text-zinc-400 text-sm mb-4 max-w-md">
              Discover and explore the best AI tools to supercharge your productivity and workflow.
            </p>
            <div className="flex items-center gap-3">
              <a 
                href="#twitter" 
                className="w-9 h-9 bg-zinc-900 border border-zinc-800 rounded-lg flex items-center justify-center text-zinc-400 hover:text-white hover:border-zinc-700 transition"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a 
                href="#github" 
                className="w-9 h-9 bg-zinc-900 border border-zinc-800 rounded-lg flex items-center justify-center text-zinc-400 hover:text-white hover:border-zinc-700 transition"
              >
                <Github className="w-4 h-4" />
              </a>
              <a 
                href="#email" 
                className="w-9 h-9 bg-zinc-900 border border-zinc-800 rounded-lg flex items-center justify-center text-zinc-400 hover:text-white hover:border-zinc-700 transition"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-3">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="/" className="text-zinc-400 hover:text-white transition">
                  Home
                </a>
              </li>
              <li>
                <a href="#categories" className="text-zinc-400 hover:text-white transition">
                  Categories
                </a>
              </li>
              <li>
                <a href="#about" className="text-zinc-400 hover:text-white transition">
                  About
                </a>
              </li>
              <li>
                <a href="#submit" className="text-zinc-400 hover:text-white transition">
                  Submit Tool
                </a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-3">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#privacy" className="text-zinc-400 hover:text-white transition">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#terms" className="text-zinc-400 hover:text-white transition">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#contact" className="text-zinc-400 hover:text-white transition">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-zinc-500 text-sm">
            © {new Date().getFullYear()} AI Tools Directory. All rights reserved.
          </div>
          <div className="flex items-center gap-1 text-sm text-zinc-500">
            Made with <Heart className="w-4 h-4 text-red-500 fill-red-500" /> by the community
          </div>
        </div>
      </div>
    </footer>
  );
}
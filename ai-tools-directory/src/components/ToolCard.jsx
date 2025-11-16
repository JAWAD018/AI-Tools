// src/components/ToolCard.jsx
import React from "react";
import {
  ExternalLink,
  Sparkles,
  TrendingUp,
  Camera,
  Film,
  Volume2,
  Code,
  PenTool,
  Zap,
  Package
} from "lucide-react";

// Map category → lucide icon
const categoryIcons = {
  image: Camera,
  video: Film,
  audio: Volume2,
  writing: PenTool,
  dev: Code,
  productivity: Zap,
  default: Package
};

// Normalize category name (case-insensitive)
function getCategoryKey(cat) {
  if (!cat) return "default";
  const s = cat.toLowerCase();
  if (s.includes("image")) return "image";
  if (s.includes("video")) return "video";
  if (s.includes("audio") || s.includes("sound")) return "audio";
  if (s.includes("write") || s.includes("text")) return "writing";
  if (s.includes("dev") || s.includes("code")) return "dev";
  if (s.includes("product")) return "productivity";
  return "default";
}

export default function ToolCard({ tool }) {
  const CategoryIcon = categoryIcons[getCategoryKey(tool.category)];

  return (
    <article className="group relative bg-linear-to-br from-white to-gray-50 rounded-2xl shadow-lg hover:shadow-2xl border border-gray-200 hover:border-purple-300 p-6 transition-transform duration-500 hover:scale-[1.02] overflow-hidden">
      
      {/* Hover overlay */}
      <div className="absolute inset-0 bg-linear-to-br from-purple-500/0 via-blue-500/0 to-pink-500/0 group-hover:from-purple-500/5 group-hover:via-blue-500/5 group-hover:to-pink-500/5 transition-opacity duration-500 rounded-2xl" />
      <div className="absolute top-0 left-0 right-0 h-1 bg-linear-to-r from-purple-500 via-blue-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      <div className="relative z-10 flex items-start gap-5">
        
        {/* Category Icon */}
        <div className="relative shrink-0">
          <div className="absolute inset-0 bg-linear-to-br from-purple-400 to-blue-400 rounded-xl blur-md opacity-0 group-hover:opacity-40 transition-opacity duration-500" />

          <div className="relative w-14 h-14 bg-white p-3 rounded-xl shadow-md border-2 border-gray-100 group-hover:border-purple-200 transition-colors duration-300 flex items-center justify-center">
            <CategoryIcon className="w-8 h-8 text-purple-600" />
          </div>
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-4 mb-3">
            
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-2">
                <h3 className="text-xl font-bold text-gray-900 group-hover:text-purple-700 transition-colors duration-300">
                  {tool.name}
                </h3>

                {tool.featured && (
                  <Sparkles className="w-4 h-4 text-yellow-500 animate-pulse" />
                )}
              </div>

              <p className="text-sm text-gray-600 leading-relaxed line-clamp-2 group-hover:text-gray-700">
                {tool.description || "Discover this powerful AI tool to enhance your productivity."}
              </p>
            </div>

            {/* Category badge + Button */}
            <div className="flex flex-col items-end gap-3 shrink-0">
              
              {tool.category && (
                <div className="flex items-center gap-1.5 px-3 py-1.5 bg-linear-to-r from-purple-100 to-blue-100 rounded-full border border-purple-200 transition-colors duration-300">
                  <TrendingUp className="w-3 h-3 text-purple-600" />
                  <span className="text-xs font-semibold text-purple-700">{tool.category}</span>
                </div>
              )}

              <a
                href={tool.affiliate || tool.link || "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="group/btn relative inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm text-white bg-linear-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 shadow-md hover:shadow-xl hover:shadow-purple-500/30 transition-colors transition-transform duration-300 overflow-hidden"
              >
                <span className="absolute inset-0 bg-white/20 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300" />
                <span className="relative z-10">Explore</span>
                <ExternalLink className="relative z-10 w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mt-4">
            {(tool.tags || []).slice(0, 5).map((tag, idx) => (
              <span
                key={tag}
                className="px-3 py-1.5 bg-gray-100 rounded-full text-xs font-medium text-gray-700 border border-gray-200 hover:bg-purple-100 hover:border-purple-300 hover:text-purple-700 transition-colors duration-300"
                style={{
                  animation: "fadeIn 0.4s ease-out",
                  animationDelay: `${idx * 50}ms`,
                  animationFillMode: "backwards"
                }}
              >
                {tag}
              </span>
            ))}

            {tool.tags && tool.tags.length > 5 && (
              <span className="px-3 py-1.5 bg-linear-to-r from-purple-50 to-blue-50 rounded-full text-xs font-semibold text-purple-600 border border-purple-200">
                +{tool.tags.length - 5} more
              </span>
            )}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(4px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </article>
  );
}
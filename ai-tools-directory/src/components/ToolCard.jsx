// src/components/ToolCard.jsx
import React from "react";
import { Link } from "react-router-dom";
import { ExternalLink, Sparkles, Camera, Film, Volume2, Code, PenTool, Rocket, Star } from "lucide-react";

/** icon mapper (declared outside component) */
 function getToolIcon(tool) {
  const category = (tool.category || "").toLowerCase();
  const name = (tool.name || "").toLowerCase();

  if (category.includes("image") || name.includes("image") || name.includes("midjourney") || name.includes("dalle")) return Camera;
  if (category.includes("video") || name.includes("video") || name.includes("runway")) return Film;
  if (category.includes("audio") || category.includes("music") || name.includes("audio")) return Volume2;
  if (category.includes("writing") || category.includes("text") || name.includes("gpt") || name.includes("gemini")) return PenTool;
  if (category.includes("dev") || category.includes("code") || name.includes("copilot")) return Code;
  if (category.includes("productivity")) return Rocket;
  return Star;
}

/** slugify helper */
function slugify(s = "") {
  return s
    .toString()
    .trim()
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/--+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/**
 * ToolCard
 * props:
 *  - tool: { id, name, slug?, description, tags[], link, affiliate, category, featured }
 *  - index: number
 *  - isLoaded: boolean
 */
export default function ToolCard({ tool, index = 0, isLoaded = true }) {
  const IconComp = getToolIcon(tool);
  const slug = tool.slug || slugify(tool.name || "");
  const internalPath = `/tools/${slug}`;
  const externalUrl = tool.affiliate || tool.link || "#";

  return (
    <article
      className={`group relative bg-zinc-950 border border-zinc-800 hover:border-zinc-700 rounded-lg p-5 transition-all duration-200 transform ${
        isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
      }`}
      style={{ transitionDelay: `${index * 30}ms` }}
      aria-labelledby={`tool-${tool.id}-title`}
    >
      {/* decorative overlay (pointer-events-none) */}
      <div className="absolute inset-0 pointer-events-none rounded-lg" />

      <div className="relative z-10">
        <div className="flex items-start justify-between mb-4">
          <div className="w-12 h-12 rounded-md flex items-center justify-center bg-zinc-900 border border-zinc-800">
           
            {React.createElement(IconComp, { className: "w-6 h-6 text-zinc-400", "aria-hidden": true })}
          </div>

          {tool.category && (
            <span className="px-2 py-1 bg-zinc-900 rounded text-xs text-zinc-400 border border-zinc-800">
              {tool.category}
            </span>
          )}
        </div>

        <h3 id={`tool-${tool.id}-title`} className="text-lg font-semibold text-white mb-2">
          <Link
            to={internalPath}
            className="hover:underline focus:outline-none focus:ring-2 focus:ring-zinc-700 rounded"
            aria-label={`Open details for ${tool.name}`}
            title={tool.name}
          >
            {tool.name}
          </Link>
        </h3>

        <p className="text-zinc-400 text-sm leading-relaxed mb-4 line-clamp-2">{tool.description}</p>

        <div className="flex flex-wrap gap-1.5 mb-4">
          {(tool.tags || []).slice(0, 3).map((tag) => (
            <span key={tag} className="px-2 py-1 bg-zinc-900 rounded text-xs text-zinc-400 border border-zinc-800">
              {tag}
            </span>
          ))}
          {tool.tags && tool.tags.length > 3 && (
            <span className="px-2 py-1 bg-zinc-900 rounded text-xs text-zinc-400 border border-zinc-800">
              +{tool.tags.length - 3}
            </span>
          )}
        </div>

        <div className="flex items-center justify-between gap-3">
          <a
            href={externalUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="inline-flex items-center gap-2 px-4 py-2 bg-white hover:bg-zinc-100 text-black text-sm font-medium rounded-md transition-colors duration-200"
          >
            <span>Visit Site</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>

          {tool.featured && (
            <div className="inline-flex items-center gap-1 px-3 py-1 bg-yellow-50 rounded-full text-xs font-semibold text-yellow-700 border border-yellow-100">
              <Sparkles className="w-4 h-4" />
              Featured
            </div>
          )}
        </div>
      </div>
    </article>
  );
}

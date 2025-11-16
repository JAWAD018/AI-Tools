import React, { useEffect, useState } from "react";
import { Search, ExternalLink, Sparkles, Zap, Grid3x3, Layers, Camera, Film, Volume2, Code, PenTool, Rocket, Package } from "lucide-react";

// Icon mapping based on category or tool name
const getToolIcon = (tool) => {
  const category = tool.category?.toLowerCase() || "";
  const name = tool.name?.toLowerCase() || "";
  
  if (category.includes("image") || name.includes("image") || name.includes("midjourney") || name.includes("dalle")) {
    return Camera;
  }
  if (category.includes("video") || name.includes("video") || name.includes("runway")) {
    return Film;
  }
  if (category.includes("audio") || category.includes("music") || name.includes("audio")) {
    return Volume2;
  }
  if (category.includes("writing") || category.includes("text") || name.includes("gpt") || name.includes("gemini")) {
    return PenTool;
  }
  if (category.includes("dev") || category.includes("code") || name.includes("copilot")) {
    return Code;
  }
  if (category.includes("productivity")) {
    return Rocket;
  }
  return Sparkles; // default
};

export default function App() {
  const [tools, setTools] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    fetch("/tools.json")
      .then((res) => res.json())
      .then((data) => {
        setTools(data);
        setTimeout(() => setIsLoaded(true), 100);
      })
      .catch(() => setTools([]));
  }, []);

  // Extract unique categories from tools
  const categories = ["All", ...new Set(tools.map(t => t.category).filter(Boolean))];

  // Filter tools by search and category
  const filtered = tools.filter((t) => {
    const matchesSearch = t.name.toLowerCase().includes(search.toLowerCase()) ||
                          t.description?.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = selectedCategory === "All" || t.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-black">
      {/* Subtle grid pattern */}
      <div className="fixed inset-0 bg-[linear-gradient(to_right,#1a1a1a_1px,transparent_1px),linear-gradient(to_bottom,#1a1a1a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)] pointer-events-none"></div>

      <div className="relative z-10 py-16 px-4">
        {/* Header */}
        <div className="max-w-7xl mx-auto text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-zinc-900 rounded-full border border-zinc-800 mb-6">
            <Sparkles className="w-3.5 h-3.5 text-zinc-400" />
            <span className="text-xs text-zinc-400 font-medium">Discover AI Tools</span>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold mb-4 text-white">
            AI Tools Directory
          </h1>
          <p className="text-base text-zinc-400 max-w-2xl mx-auto">
            Explore cutting-edge AI tools to supercharge your workflow
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-8">
          <div className="relative">
            <div className="relative bg-zinc-950 border border-zinc-800 rounded-lg">
              <div className="flex items-center gap-3 px-4 py-3">
                <Search className="w-4 h-4 text-zinc-500" />
                <input
                  type="text"
                  placeholder="Search for AI tools..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="flex-1 bg-transparent text-white placeholder-zinc-500 outline-none text-sm"
                />
                {search && (
                  <button
                    onClick={() => setSearch("")}
                    className="text-zinc-500 hover:text-zinc-300 transition text-sm"
                  >
                    ✕
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Categories */}
        <div className="max-w-7xl mx-auto mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Layers className="w-4 h-4 text-zinc-500" />
            <span className="text-sm font-medium text-zinc-400">Categories</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => {
              const count = category === "All" 
                ? tools.length 
                : tools.filter(t => t.category === category).length;
              
              return (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                    selectedCategory === category
                      ? "bg-white text-black"
                      : "bg-zinc-950 text-zinc-400 border border-zinc-800 hover:border-zinc-700 hover:text-zinc-300"
                  }`}
                >
                  {category}
                  <span className={`ml-2 text-xs ${
                    selectedCategory === category ? "text-zinc-600" : "text-zinc-600"
                  }`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Tools Grid */}
        <div className="max-w-7xl mx-auto">
          {filtered.length === 0 ? (
            <div className="text-center py-20">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-zinc-900 rounded-lg border border-zinc-800 mb-4">
                <Search className="w-8 h-8 text-zinc-600" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">No tools found</h3>
              <p className="text-zinc-500 text-sm">
                {search || selectedCategory !== "All" 
                  ? "Try adjusting your filters or search terms"
                  : "No tools available"}
              </p>
              {(search || selectedCategory !== "All") && (
                <button
                  onClick={() => {
                    setSearch("");
                    setSelectedCategory("All");
                  }}
                  className="mt-4 px-4 py-2 bg-zinc-900 hover:bg-zinc-800 text-zinc-300 text-sm rounded-md border border-zinc-800 transition"
                >
                  Clear Filters
                </button>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filtered.map((tool, idx) => {
                const ToolIcon = getToolIcon(tool);
                
                return (
                  <div
                    key={tool.id}
                    className={`group relative bg-zinc-950 border border-zinc-800 hover:border-zinc-700 rounded-lg p-5 hover:bg-zinc-900/50 transition-all duration-200 ${
                      isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                    }`}
                    style={{
                      transitionDelay: `${idx * 30}ms`
                    }}
                  >
                    <div className="relative z-10">
                      {/* Logo and Category */}
                      <div className="flex items-start justify-between mb-4">
                        <div className="w-12 h-12 rounded-md flex items-center justify-center bg-zinc-900 border border-zinc-800">
                          <ToolIcon className="w-6 h-6 text-zinc-400" />
                        </div>
                        {tool.category && (
                          <span className="px-2 py-1 bg-zinc-900 rounded text-xs text-zinc-400 border border-zinc-800">
                            {tool.category}
                          </span>
                        )}
                      </div>

                      {/* Content */}
                      <h2 className="text-lg font-semibold text-white mb-2">
                        {tool.name}
                      </h2>
                      <p className="text-zinc-400 text-sm leading-relaxed mb-4 line-clamp-2">
                        {tool.description}
                      </p>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-1.5 mb-4">
                        {(tool.tags || []).slice(0, 3).map((tag) => (
                          <span
                            key={tag}
                            className="px-2 py-1 bg-zinc-900 rounded text-xs text-zinc-400 border border-zinc-800"
                          >
                            {tag}
                          </span>
                        ))}
                        {tool.tags && tool.tags.length > 3 && (
                          <span className="px-2 py-1 bg-zinc-900 rounded text-xs text-zinc-400 border border-zinc-800">
                            +{tool.tags.length - 3}
                          </span>
                        )}
                      </div>

                      {/* CTA Button */}
                      <a
                        href={tool.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2 bg-white hover:bg-zinc-100 text-black text-sm font-medium rounded-md transition-colors duration-200"
                      >
                        <span>Visit Site</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer Badge */}
        {filtered.length > 0 && (
          <div className="max-w-7xl mx-auto mt-12 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-zinc-950 border border-zinc-800 rounded-full">
              <Zap className="w-3.5 h-3.5 text-zinc-500" />
              <span className="text-zinc-400 text-xs">
                Showing {filtered.length} tool{filtered.length !== 1 ? 's' : ''}
                {selectedCategory !== "All" && ` in ${selectedCategory}`}
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
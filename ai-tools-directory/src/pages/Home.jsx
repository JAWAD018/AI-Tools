import React, { useEffect, useState } from "react";
import { Search, Zap, Layers, Sparkles, TrendingUp, ChevronLeft, ChevronRight } from "lucide-react";
import ToolCard from "../components/ToolCard";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function Home() {
  const [tools, setTools] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const toolsPerPage = 10;

  useEffect(() => {
    fetch("/tools.json")
      .then((res) => res.json())
      .then((data) => {
        setTools(data);
        setTimeout(() => setIsLoaded(true), 100);
      })
      .catch(() => setTools([]));
  }, []);

  const categories = ["All", ...new Set(tools.map(t => t.category).filter(Boolean))];

  // Filter tools by search and category
  const filtered = tools.filter((t) => {
    const matchesSearch = t.name.toLowerCase().includes(search.toLowerCase()) ||
                          t.description?.toLowerCase().includes(search.toLowerCase()) ||
                          t.tagline?.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = selectedCategory === "All" || t.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Reset to page 1 when search or category changes
  useEffect(() => {
    setCurrentPage(1);
  }, [search, selectedCategory]);

  // Calculate pagination
  const totalPages = Math.ceil(filtered.length / toolsPerPage);
  const startIndex = (currentPage - 1) * toolsPerPage;
  const endIndex = startIndex + toolsPerPage;
  const currentTools = filtered.slice(startIndex, endIndex);

  const goToPage = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-zinc-900 to-black">
      {/* Enhanced grid pattern with gradient overlay */}
      <div className="fixed inset-0 bg-[linear-gradient(to_right,#1a1a1a_1px,transparent_1px),linear-gradient(to_bottom,#1a1a1a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)] pointer-events-none"></div>
      
      {/* Animated gradient orbs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 -left-4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-40 -right-4 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-pink-600/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="relative z-10 py-12 px-4 sm:py-20">
        <Header />

        {/* Search Bar */}
        <div className="max-w-3xl mx-auto mb-8 sm:mb-12">
          <div className="relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl blur opacity-20 group-hover:opacity-30 transition duration-500"></div>
            <div className="relative bg-zinc-950/90 backdrop-blur-xl border border-zinc-800 rounded-xl shadow-2xl overflow-hidden">
              <div className="flex items-center gap-3 px-5 py-4">
                <Search className="w-5 h-5 text-zinc-500 flex-shrink-0" />
                <input
                  type="text"
                  placeholder="Search for AI tools, features, or categories..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="flex-1 bg-transparent text-white placeholder-zinc-500 outline-none text-base"
                />
                {search && (
                  <button
                    onClick={() => setSearch("")}
                    className="text-zinc-500 hover:text-zinc-300 transition px-2 py-1 hover:bg-zinc-900 rounded"
                  >
                    ✕
                  </button>
                )}
              </div>
              {search && filtered.length > 0 && (
                <div className="px-5 py-3 bg-zinc-900/50 border-t border-zinc-800">
                  <div className="flex items-center gap-2 text-xs text-zinc-400">
                    <TrendingUp className="w-3.5 h-3.5" />
                    <span>Found {filtered.length} result{filtered.length !== 1 ? 's' : ''}</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Categories */}
        <div className="max-w-7xl mx-auto mb-10 sm:mb-14">
          <div className="flex items-center gap-2 mb-5">
            <Layers className="w-5 h-5 text-blue-400" />
            <span className="text-base font-semibold text-white">Browse by Category</span>
          </div>
          <div className="flex flex-wrap gap-2.5">
            {categories.map((category) => {
              const count = category === "All" 
                ? tools.length 
                : tools.filter(t => t.category === category).length;
              
              const isActive = selectedCategory === category;
              
              return (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`group relative px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 ${
                    isActive
                      ? "bg-white text-black shadow-lg shadow-white/20 scale-105"
                      : "bg-zinc-950/80 backdrop-blur-sm text-zinc-300 border border-zinc-800 hover:border-zinc-700 hover:bg-zinc-900 hover:scale-105"
                  }`}
                >
                  <span className="flex items-center gap-2">
                    {category}
                    <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
                      isActive 
                        ? "bg-black/10 text-zinc-600" 
                        : "bg-zinc-800 text-zinc-500 group-hover:bg-zinc-700 group-hover:text-zinc-400"
                    }`}>
                      {count}
                    </span>
                  </span>
                  {isActive && (
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-xl blur-xl -z-10"></div>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Tools Grid */}
        <div className="max-w-7xl mx-auto">
          {filtered.length === 0 ? (
            <div className="text-center py-24 sm:py-32">
              <div className="relative inline-flex items-center justify-center w-20 h-20 mb-6">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-purple-600/20 rounded-2xl blur-xl"></div>
                <div className="relative flex items-center justify-center w-20 h-20 bg-zinc-900/80 backdrop-blur-sm rounded-2xl border border-zinc-800">
                  <Search className="w-10 h-10 text-zinc-600" />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">No tools found</h3>
              <p className="text-zinc-400 text-base max-w-md mx-auto mb-6">
                {search || selectedCategory !== "All" 
                  ? "We couldn't find any tools matching your criteria. Try adjusting your filters or search terms."
                  : "No tools are currently available in the directory."}
              </p>
              {(search || selectedCategory !== "All") && (
                <button
                  onClick={() => {
                    setSearch("");
                    setSelectedCategory("All");
                  }}
                  className="px-6 py-3 bg-white text-black font-semibold rounded-xl hover:bg-zinc-200 transition-all transform hover:scale-105 shadow-lg hover:shadow-xl"
                >
                  Clear All Filters
                </button>
              )}
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {currentTools.map((tool, idx) => (
                  <ToolCard 
                    key={tool.id || tool.slug || idx} 
                    tool={tool} 
                    index={idx} 
                    isLoaded={isLoaded} 
                  />
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="mt-12 flex items-center justify-center gap-2">
                  <button
                    onClick={() => goToPage(currentPage - 1)}
                    disabled={currentPage === 1}
                    className={`p-2 rounded-lg border transition-all ${
                      currentPage === 1
                        ? "border-zinc-800 bg-zinc-950/50 text-zinc-600 cursor-not-allowed"
                        : "border-zinc-800 bg-zinc-950/80 text-zinc-300 hover:bg-zinc-900 hover:border-zinc-700"
                    }`}
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>

                  <div className="flex items-center gap-2">
                    {[...Array(totalPages)].map((_, i) => {
                      const page = i + 1;
                      // Show first, last, current, and adjacent pages
                      if (
                        page === 1 ||
                        page === totalPages ||
                        (page >= currentPage - 1 && page <= currentPage + 1)
                      ) {
                        return (
                          <button
                            key={page}
                            onClick={() => goToPage(page)}
                            className={`min-w-[40px] h-10 rounded-lg border font-medium transition-all ${
                              currentPage === page
                                ? "bg-white text-black border-white shadow-lg shadow-white/20"
                                : "bg-zinc-950/80 text-zinc-300 border-zinc-800 hover:bg-zinc-900 hover:border-zinc-700"
                            }`}
                          >
                            {page}
                          </button>
                        );
                      } else if (
                        page === currentPage - 2 ||
                        page === currentPage + 2
                      ) {
                        return (
                          <span key={page} className="text-zinc-600 px-1">
                            ...
                          </span>
                        );
                      }
                      return null;
                    })}
                  </div>

                  <button
                    onClick={() => goToPage(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className={`p-2 rounded-lg border transition-all ${
                      currentPage === totalPages
                        ? "border-zinc-800 bg-zinc-950/50 text-zinc-600 cursor-not-allowed"
                        : "border-zinc-800 bg-zinc-950/80 text-zinc-300 hover:bg-zinc-900 hover:border-zinc-700"
                    }`}
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              )}

              {/* Results Footer */}
              <div className="mt-12 text-center">
                <div className="inline-flex flex-col items-center gap-4">
                  <div className="flex items-center gap-3 px-6 py-3 bg-zinc-950/80 backdrop-blur-xl border border-zinc-800 rounded-full shadow-xl">
                    <Zap className="w-4 h-4 text-yellow-500" />
                    <span className="text-zinc-300 text-sm font-medium">
                      Showing {startIndex + 1}-{Math.min(endIndex, filtered.length)} of {filtered.length} tool{filtered.length !== 1 ? 's' : ''}
                      {selectedCategory !== "All" && (
                        <span className="text-zinc-500"> in {selectedCategory}</span>
                      )}
                    </span>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
        <Footer />
      </div>
    </div>
  );
}
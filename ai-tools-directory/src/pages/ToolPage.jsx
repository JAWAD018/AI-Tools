// src/pages/ToolPage.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { ExternalLink, ArrowLeft, Star, Users, Zap, Shield, Clock, TrendingUp } from "lucide-react";

export default function ToolPage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [tool, setTool] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    let mounted = true;
    const ac = new AbortController();
    const signal = ac.signal;

    async function load() {
      setLoading(true);
      setErrorMsg("");
      console.log("[ToolPage] requested slug:", slug);
      try {
        const res = await fetch("/tools.json", { signal });
        if (!res.ok) throw new Error(`tools.json fetch failed: ${res.status}`);
        const data = await res.json();

        const normalize = (s = "") =>
          s
            .toString()
            .trim()
            .toLowerCase()
            .replace(/[^\w\s-]/g, "")
            .replace(/\s+/g, "-")
            .replace(/--+/g, "-")
            .replace(/^-+|-+$/g, "");

        const found =
          data.find((t) => t.slug === slug) ||
          data.find((t) => normalize(t.name) === slug);

        console.log("[ToolPage] found tool:", !!found, found?.name);
        if (mounted) {
          setTool(found || null);
          setTimeout(() => setIsVisible(true), 50);
        }
      } catch (err) {
        if (err.name === "AbortError") {
          console.log("[ToolPage] fetch aborted");
        } else {
          console.error("[ToolPage] error loading tools.json:", err);
          if (mounted) setErrorMsg("Failed to load data. Try reloading the page.");
          if (mounted) setTool(null);
        }
      } finally {
        if (mounted) setLoading(false);
      }
    }

    load();

    return () => {
      mounted = false;
      ac.abort();
    };
  }, [slug]);

  useEffect(() => {
    if (tool && tool.name) {
      document.title = `${tool.name} — AI Tools Directory`;
    } else {
      document.title = "Tool — AI Tools Directory";
    }
    window.scrollTo(0, 0);
  }, [tool]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-zinc-900 to-black text-zinc-400 flex items-center justify-center">
        <div className="text-center">
          <div className="mb-4">
            <div className="w-16 h-16 mx-auto border-4 border-zinc-800 border-t-white rounded-full animate-spin"></div>
          </div>
          <div className="text-lg">Loading tool...</div>
        </div>
      </div>
    );
  }

  if (errorMsg) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-zinc-900 to-black text-zinc-300 p-8">
        <div className="max-w-3xl mx-auto text-center">
          <div className="mb-4 text-6xl">⚠️</div>
          <h2 className="text-2xl text-white mb-3 font-bold">Something went wrong</h2>
          <p className="text-zinc-400 mb-6">{errorMsg}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="px-6 py-3 bg-white text-black rounded-lg font-medium hover:bg-zinc-200 transition-all transform hover:scale-105"
          >
            Reload Page
          </button>
        </div>
      </div>
    );
  }

  if (!tool) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-zinc-900 to-black text-zinc-300 p-8">
        <div className="max-w-3xl mx-auto">
          <button 
            onClick={() => navigate(-1)} 
            className="mb-8 px-4 py-2 bg-zinc-900/50 backdrop-blur-sm rounded-lg border border-zinc-800 hover:bg-zinc-800 transition-all flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" /> Back
          </button>
          <div className="text-center py-16">
            <div className="mb-4 text-6xl">🔍</div>
            <h1 className="text-3xl text-white mb-3 font-bold">Tool not found</h1>
            <p className="text-zinc-400 mb-2">No tool matches the address</p>
            <code className="px-3 py-1 bg-zinc-900 rounded text-sm border border-zinc-800">{slug}</code>
            <p className="mt-8">
              <Link to="/" className="text-white underline hover:text-zinc-300 transition-colors">
                Return to directory
              </Link>
            </p>
          </div>
        </div>
      </div>
    );
  }

  const statIcons = {
    users: Users,
    speed: Zap,
    security: Shield,
    uptime: Clock,
    growth: TrendingUp
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-zinc-900 to-black text-zinc-300 py-8 px-4 sm:py-16">
      <div className="max-w-5xl mx-auto">
        {/* Back button */}
        <button 
          onClick={() => navigate(-1)} 
          className="mb-6 px-4 py-2 bg-zinc-900/50 backdrop-blur-sm rounded-lg border border-zinc-800 hover:bg-zinc-800 transition-all flex items-center gap-2 group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Back
        </button>

        {/* Hero section */}
        <div className={`transform transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="bg-gradient-to-br from-zinc-900/80 to-zinc-950/80 backdrop-blur-xl border border-zinc-800 rounded-2xl p-8 sm:p-12 mb-6 relative overflow-hidden">
            {/* Animated gradient background */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 via-purple-600/5 to-pink-600/5 animate-pulse"></div>
            
            <div className="relative z-10">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-6 mb-6">
                <div className="flex-1">
                  {tool.category && (
                    <span className="inline-block px-3 py-1 bg-blue-600/20 text-blue-400 text-xs font-medium rounded-full border border-blue-600/30 mb-4">
                      {tool.category}
                    </span>
                  )}
                  <h1 className="text-4xl sm:text-5xl font-bold text-white mb-3 leading-tight">
                    {tool.name}
                  </h1>
                  {tool.tagline && (
                    <p className="text-lg sm:text-xl text-zinc-400 leading-relaxed">
                      {tool.tagline}
                    </p>
                  )}
                </div>

                <a 
                  href={tool.link || tool.website} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white text-black rounded-xl font-semibold hover:bg-zinc-200 transition-all transform hover:scale-105 hover:shadow-xl hover:shadow-white/20 whitespace-nowrap"
                >
                  Visit Site <ExternalLink className="w-5 h-5" />
                </a>
              </div>

              {/* Stats/badges row */}
              {tool.stats && (
                <div className="flex flex-wrap gap-4 mt-8 pt-6 border-t border-zinc-800">
                  {Object.entries(tool.stats).map(([key, value], i) => {
                    const Icon = statIcons[key] || Star;
                    return (
                      <div 
                        key={i}
                        className="flex items-center gap-2 px-4 py-2 bg-zinc-900/50 rounded-lg border border-zinc-800"
                      >
                        <Icon className="w-4 h-4 text-blue-400" />
                        <span className="text-sm text-zinc-400">{value}</span>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Content sections */}
        <div className={`grid grid-cols-1 lg:grid-cols-3 gap-6 transform transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          {/* Main content */}
          <div className="lg:col-span-2 space-y-6">
            {tool.description && (
              <div className="bg-gradient-to-br from-zinc-900/80 to-zinc-950/80 backdrop-blur-xl border border-zinc-800 rounded-2xl p-6 sm:p-8 hover:border-zinc-700 transition-all">
                <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                  <span className="w-1 h-6 bg-blue-500 rounded-full"></span>
                  About
                </h2>
                <p className="text-zinc-300 leading-relaxed text-lg">
                  {tool.description}
                </p>
              </div>
            )}

            {tool.features && tool.features.length > 0 && (
              <div className="bg-gradient-to-br from-zinc-900/80 to-zinc-950/80 backdrop-blur-xl border border-zinc-800 rounded-2xl p-6 sm:p-8 hover:border-zinc-700 transition-all">
                <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                  <span className="w-1 h-6 bg-purple-500 rounded-full"></span>
                  Key Features
                </h2>
                <div className="grid gap-4">
                  {tool.features.map((feature, i) => (
                    <div 
                      key={i} 
                      className="flex items-start gap-3 p-4 bg-zinc-900/50 rounded-xl border border-zinc-800/50 hover:border-zinc-700 hover:bg-zinc-900 transition-all group"
                    >
                      <div className="w-6 h-6 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform">
                        <Star className="w-3 h-3 text-white" />
                      </div>
                      <p className="text-zinc-300 leading-relaxed">{feature}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {tool.tags && tool.tags.length > 0 && (
              <div className="bg-gradient-to-br from-zinc-900/80 to-zinc-950/80 backdrop-blur-xl border border-zinc-800 rounded-2xl p-6 hover:border-zinc-700 transition-all">
                <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                  <span className="w-1 h-5 bg-pink-500 rounded-full"></span>
                  Tags
                </h3>
                <div className="flex flex-wrap gap-2">
                  {tool.tags.map((tag, i) => (
                    <span 
                      key={i} 
                      className="px-3 py-1.5 bg-zinc-900 text-zinc-300 text-sm rounded-lg border border-zinc-800 hover:border-zinc-700 hover:bg-zinc-800 transition-all cursor-default"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {(tool.pricing || tool.founded || tool.company) && (
              <div className="bg-gradient-to-br from-zinc-900/80 to-zinc-950/80 backdrop-blur-xl border border-zinc-800 rounded-2xl p-6 hover:border-zinc-700 transition-all">
                <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                  <span className="w-1 h-5 bg-green-500 rounded-full"></span>
                  Details
                </h3>
                <div className="space-y-3 text-sm">
                  {tool.pricing && (
                    <div className="flex justify-between items-center py-2 border-b border-zinc-800">
                      <span className="text-zinc-400">Pricing</span>
                      <span className="text-zinc-200 font-medium">{tool.pricing}</span>
                    </div>
                  )}
                  {tool.company && (
                    <div className="flex justify-between items-center py-2 border-b border-zinc-800">
                      <span className="text-zinc-400">Company</span>
                      <span className="text-zinc-200 font-medium">{tool.company}</span>
                    </div>
                  )}
                  {tool.founded && (
                    <div className="flex justify-between items-center py-2">
                      <span className="text-zinc-400">Founded</span>
                      <span className="text-zinc-200 font-medium">{tool.founded}</span>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* CTA card */}
            <div className="bg-linear-to-br from-blue-600/20 to-purple-600/20 backdrop-blur-xl border border-blue-600/30 rounded-2xl p-6 hover:border-blue-600/50 transition-all">
              <h3 className="text-lg font-bold text-white mb-2">Ready to try it?</h3>
              <p className="text-sm text-zinc-300 mb-4">
                Visit {tool.name} and explore what it can do for you.
              </p>
              <a 
                href={tool.link || tool.website} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="block w-full text-center px-4 py-3 bg-white text-black rounded-xl font-semibold hover:bg-zinc-200 transition-all transform hover:scale-105"
              >
                Get Started →
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
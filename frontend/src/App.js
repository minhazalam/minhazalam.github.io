import { useEffect } from "react";
import "@/App.css";
import { HashRouter, Routes, Route, useLocation } from "react-router-dom";
import { Toaster } from "@/components/ui/sonner";
import { ContentProvider, useContent } from "@/context/ContentContext";
import { trackPageview } from "@/lib/analytics";
import ErrorBoundary from "@/components/ErrorBoundary";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import Home from "@/pages/Home";
import Work from "@/pages/Work";
import About from "@/pages/About";
import ContactPage from "@/pages/ContactPage";
import Writing from "@/pages/Writing";
import Recruiter from "@/pages/Recruiter";
import NotFound from "@/pages/NotFound";

function RouteAnalytics() {
  const { pathname } = useLocation();
  useEffect(() => {
    trackPageview(pathname);
  }, [pathname]);
  return null;
}

function LenisSetup() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return undefined;
    let lenis = null;
    let raf = 0;
    let cancelled = false;
    import("lenis")
      .then(({ default: Lenis }) => {
        if (cancelled) return;
        lenis = new Lenis({ lerp: 0.11 });
        const loop = (t) => {
          lenis.raf(t);
          raf = requestAnimationFrame(loop);
        };
        raf = requestAnimationFrame(loop);
      })
      .catch(() => {});
    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
      if (lenis) lenis.destroy();
    };
  }, []);
  return null;
}

function ContentGate({ children }) {
  const { loading, error, content, reload } = useContent();
  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <p className="font-mono text-xs tracking-[0.3em] text-accent" data-testid="content-loading">
          INITIALIZING DATA PLATFORM<span className="dot-pulse">...</span>
        </p>
      </div>
    );
  }
  if (error || !content) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="text-center">
          <p className="mb-4 font-mono text-xs tracking-[0.3em] text-mute" data-testid="content-error">
            CONTENT UNAVAILABLE
          </p>
          <button
            onClick={reload}
            data-testid="content-retry-btn"
            className="rounded-md bg-accent px-5 py-2.5 font-mono text-xs tracking-wider text-[#06121f]"
          >
            RETRY
          </button>
        </div>
      </div>
    );
  }
  return children;
}

function Shell() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <ScrollToTop />
      <RouteAnalytics />
      <LenisSetup />
      {process.env.REACT_APP_DEPLOY_TARGET === "preview" && (
        <div className="fixed right-4 top-20 z-40 rounded-full border border-accent/30 bg-background px-3 py-1 font-mono text-[10px] tracking-wider text-accent">
          DESIGN PREVIEW
        </div>
      )}
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projects" element={<Work />} />
          <Route path="/about" element={<About />} />
          <Route path="/writing" element={<Writing />} />
          <Route path="/recruiter" element={<Recruiter />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
      <Toaster position="bottom-right" theme="dark" />
    </div>
  );
}

export default function App() {
  return (
    <ErrorBoundary>
      <HashRouter>
        <ContentProvider>
          <ContentGate>
            <Shell />
          </ContentGate>
        </ContentProvider>
      </HashRouter>
    </ErrorBoundary>
  );
}

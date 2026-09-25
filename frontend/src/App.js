import "@/App.css";
import { ContentProvider, useContent } from "@/context/ContentContext";
import ErrorBoundary from "@/components/ErrorBoundary";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Home from "@/pages/Home";

function ContentGate({ children }) {
  const { loading, error, content, reload } = useContent();
  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <p className="font-mono text-xs tracking-[0.3em] text-accent" data-testid="content-loading">LOADING PORTFOLIO…</p>
      </div>
    );
  }
  if (error || !content) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="text-center">
          <p className="mb-4 font-mono text-xs tracking-[0.3em] text-mute" data-testid="content-error">PORTFOLIO UNAVAILABLE</p>
          <button onClick={reload} data-testid="content-retry-btn" className="rounded-md bg-accent px-5 py-2.5 font-mono text-xs tracking-wider text-[#08120f]">RETRY</button>
        </div>
      </div>
    );
  }
  return children;
}

function Shell() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {process.env.REACT_APP_DEPLOY_TARGET === "preview" && (
        <div className="fixed right-4 top-20 z-40 rounded-full border border-accent/30 bg-background px-3 py-1 font-mono text-[10px] tracking-wider text-accent">DESIGN PREVIEW</div>
      )}
      <Navbar />
      <Home />
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <ErrorBoundary>
      <ContentProvider>
        <ContentGate><Shell /></ContentGate>
      </ContentProvider>
    </ErrorBoundary>
  );
}

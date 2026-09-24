import { createContext, useContext } from "react";
import staticContent from "@/content";

const ContentCtx = createContext({
  content: staticContent,
  loading: false,
  error: null,
  reload: () => {},
});

export function ContentProvider({ children }) {
  return (
    <ContentCtx.Provider value={{ content: staticContent, loading: false, error: null, reload: () => {} }}>
      {children}
    </ContentCtx.Provider>
  );
}

export function useContent() {
  return useContext(ContentCtx);
}

import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] items-center justify-center px-5 pt-24">
      <div className="text-center">
        <p className="font-mono text-xs tracking-[0.3em] text-accent">404 — RECORD NOT FOUND</p>
        <h1 className="mt-4 font-display text-3xl font-bold text-ink md:text-4xl">
          This query returned nothing
        </h1>
        <p className="mx-auto mt-3 max-w-sm text-sm text-mute">
          The page you're looking for doesn't exist. The dataset is finite — head back to the homepage.
        </p>
        <Link
          to="/"
          data-testid="notfound-home-link"
          className="mt-8 inline-block rounded-md bg-accent px-6 py-3 font-mono text-xs font-medium tracking-wider text-[#06121f] hover:brightness-110"
        >
          BACK TO HOMEPAGE
        </Link>
      </div>
    </div>
  );
}
